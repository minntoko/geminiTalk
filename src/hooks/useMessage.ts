import { useState } from "react";
import { Message } from "../types/message";

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


const useMessage = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = async () => {
    const trimedMessage = text.trim();
    if (trimedMessage === "") return;
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: text },
    ]);
    setText("");
    await streamingGemini();
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
        const session = await window.ai.createTextSession();
        const stream = session.promptStreaming(text);
        // +1している理由は、値が更新される前にインデックスを取得しているため
        const lastMessageIndex = messages.length + 1;
        for await (const chunk of stream as AsyncIterable<string>) {
          setMessages((prevMessages) => [
            ...prevMessages.slice(0, lastMessageIndex),
            { role: "assistant", content: chunk },
          ]);
        }
      }
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: "このブラウザでは利用できません",
        },
      ]);
    }
  };

  return {
    text,
    setText,
    messages,
    setMessages,
    sendMessage,
  };
};

export default useMessage;
