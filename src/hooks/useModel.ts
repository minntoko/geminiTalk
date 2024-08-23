import {useState} from "react";

interface Model {
  name: string;
  type: "chrome" | "cloud" | "ollama";
}

export const useModel = () => {
  const [models, setModels] = useState<Model[]>([]);

  /**
   * モデルにデータを追加
   * @param modelName
   */
  const addModelList = (modelName: string, modelType: string) => {
    const modelList = localStorage.getItem("models");
    const newModel = { name: modelName, type: modelType };
    if (modelList) {
      const parsedModels = JSON.parse(modelList);
      localStorage.setItem("models", JSON.stringify([...parsedModels, newModel]));
    } else {
      localStorage.setItem("models", JSON.stringify([newModel]));
    }
  }

  /**
   *　モデルを削除
    */
  const removeModelList = (modelName: string) => {
    const modelList = localStorage.getItem("models");
    if (modelList) {
      const parsedModels = JSON.parse(modelList);
      const newModels = parsedModels.filter((model: Model) => model.name !== modelName);
      localStorage.setItem("models", JSON.stringify(newModels));
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
    }
  }

  const getAPIKey = () => {
    const savedApiKey = localStorage.getItem("apiKey");
    if (savedApiKey) {
      return savedApiKey;
    }
  };
  return {
    models,
    setModels,
    addModelList,
    getModelList,
    setAPIKey,
    getAPIKey,
    removeModelList
  }
}