import { useState } from "react";

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

interface Message {
  role: string;
  content: string;
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
    await gemini();
  };

  const gemini = async () => {
    console.log("Gemini Nano を起動します");
    const canCreate = await window.ai.canCreateTextSession();
    if (canCreate === "no") {
      console.log("Gemini Nano は利用できません");
    } else {
      const session = await window.ai.createTextSession();
      const result = await session.prompt(text);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: result },
      ]);
    }
  };

  return {
    text,
    setText,
    messages,
    sendMessage,
  };
};

export default useMessage;
