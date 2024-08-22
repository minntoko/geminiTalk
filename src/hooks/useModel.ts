import {useState} from "react";

interface Model {
  name: string;
  type: "chrome" | "cloud" | "ollama";
}

export const useModel = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [API_KEY, setAPI_KEY] = useState("");

  /**
   * モデルにデータを追加
   * @param modelName
   */
  const addModelList = (modelName: string) => {
    const modelList = localStorage.getItem("models");
    const newModel = { name: modelName, type: "ollama" };
    if (modelList) {
      const parsedModels = JSON.parse(modelList);
      localStorage.setItem("models", JSON.stringify([...parsedModels, newModel]));
    } else {
      localStorage.setItem("models", JSON.stringify([newModel]));
    }
  }

  const getModelList = () => {
    const modelList = localStorage.getItem("models");
    if (modelList) {
      const parsedModels = JSON.parse(modelList);
      setModels(parsedModels);
    }
  };

  const setAPIKey = (inputApiKey: string) => {
    inputApiKey.trim();
    if(inputApiKey) {
      localStorage.setItem("apiKey", inputApiKey);
      setAPI_KEY(inputApiKey);
    }
  }

  const getAPIKey = () => {
    const savedApiKey = localStorage.getItem("apiKey");
    if (savedApiKey) {
      setAPI_KEY(savedApiKey);
    }
  };
  return {
    models,
    setModels,
    API_KEY,
    addModelList,
    getModelList,
    setAPIKey,
    getAPIKey,
  }
}