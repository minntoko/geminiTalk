import { useContext, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Message } from "../types/message";
import { useModel } from "./useModel";
import { ModelContext } from "../context/ModelContext";

declare global {
  interface Window {
    ai: {
      canCreateTextSession: () => Promise<string>;
      createTextSession: () => Promise<{
        promptStreaming(arg0: string): unknown;
        prompt: (question: string) => Promise<string>;
      }>;
    };
  }
}

interface DecodedObject {
  model: string;
  created_at: string;
  message: Message;
  done: boolean;
}

const useMessage = () => {
  const {getAPIKey} = useModel();
  const {selectedModel} = useContext(ModelContext);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [isGenerate, setIsGenerate] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = async () => {
    const trimedMessage = text.trim();
    if (trimedMessage === "") return;
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: text },
    ]);
    setText("");
    console.log(selectedModel);
    switch (selectedModel.type) {
      case "chrome":
        await streamingGemini();
        break;
      case "cloud":
        await sendMessageCloud();
        break;
      case "ollama":
        await sendMessageLocal();
        break;
      default:
        break;
    }
  };

  const streamingGemini = async () => {
    try {
      const canCreate = await window.ai.canCreateTextSession();
      if (canCreate === "no") {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            role: "assistant",
            content: "Gemini Nano は利用できません",
          },
        ]);
      } else {
        setIsLoading(true);
        const session = await window.ai.createTextSession();
        const stream = session.promptStreaming(text);
        // +1している理由は、値が更新される前にインデックスを取得しているため
        const lastMessageIndex = messages.length + 1;
        for await (const chunk of stream as AsyncIterable<string>) {
          setIsLoading(false);
          setMessages((prevMessages) => [
            ...prevMessages.slice(0, lastMessageIndex),
            { role: "assistant", content: chunk },
          ]);
        }
      }
    } catch (error) {
	    setIsLoading(false);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: `このブラウザでは利用できません。使い方はこちらの記事を参考にしてください。
          https://zenn.dev/minntoko/articles/294ac7c7d27e97`,
        },
      ]);
    }
  };

  // APIを使ってクラウド上で対話を行う

  const sendMessageCloud = async () => {
    try {
      setIsLoading(true);
      const genAI = new GoogleGenerativeAI(getAPIKey()!);
      const session = genAI.getGenerativeModel({ model: selectedModel.name });
      const stream = (await session.generateContentStream(text)).stream;
      let message = "";
      const lastMessageIndex = messages.length + 1;
      for await (const chunk of stream) {
        const chunkText = chunk.text();
        message += chunkText;
        setIsLoading(false);
        setMessages((prevMessages) => [
          ...prevMessages.slice(0, lastMessageIndex),
          { role: "assistant", content: message },
        ]);
      }
    }
    catch (error) {
	    setIsLoading(false);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: `エラーが発生しました。使い方はこちらの記事を参考にしてください。
          https://zenn.dev/minntoko/articles/294ac7c7d27e97`,
        },
      ]);
    }
  };

const sendMessageLocal = async () => {
    const url = "http://localhost:11434/api/chat";
    const data = {
      model: selectedModel.name,
      messages: [
        {
          role: "user",
          content: text
        }
      ]
    };

    setIsLoading(true);
    let success = false;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(data)
      });

      const reader = response.body?.getReader();

      if (reader) {
        setIsLoading(false);
        let message = "";
        const lastMessageIndex = messages.length + 1;
        while (true) {
          const { done, value } = await reader.read();
          const decoder = new TextDecoder('utf-8');
          const utf8String = decoder.decode(value);
          const decodedObject: DecodedObject = JSON.parse(utf8String);
          console.log(utf8String);
          message += decodedObject.message.content;
          setMessages((prevMessages) => [
            ...prevMessages.slice(0, lastMessageIndex),
            { role: "assistant", content: message },
          ]);
          if (done) break;
          success = true;
        }
      }
      return response;
    } catch (error) {
      if (!success) {
        setIsLoading(false);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            role: "assistant",
            content: `モデル名が間違っているか、サーバーが起動していません。使い方はこちらの記事を参考にしてください。
            https://zenn.dev/minntoko/articles/294ac7c7d27e97`,
          },
        ]);
      }
    }
  }

  return {
    text,
    setText,
    messages,
    setMessages,
    sendMessage,
    isLoading,
  };
};

export default useMessage;