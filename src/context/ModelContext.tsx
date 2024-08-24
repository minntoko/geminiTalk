import { useState, createContext, ReactNode } from 'react';

interface Model {
  name: string;
  type: "chrome" | "cloud" | "ollama";
}

interface ModelContextType {
  selectedModel: Model;
  setSelectedModel: React.Dispatch<React.SetStateAction<Model>>;
}

export const ModelContext = createContext({} as ModelContextType);

export const ModelProvider = ({ children }: {children: ReactNode}) => {
  const [selectedModel, setSelectedModel] = useState<Model>({name: "Gemini Nano", type: "chrome"});
  return (
    <ModelContext.Provider value={{selectedModel, setSelectedModel}}>
      {children}
    </ModelContext.Provider>
  );
};