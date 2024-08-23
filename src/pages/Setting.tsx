import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import useMessage from "../hooks/useMessage";
import { useEffect, useState } from "react";
import { useModel } from "../hooks/useModel";

const Setting = () => {
  const { getAPIKey, setAPIKey, addModelList, removeModelList, models } = useModel();
  const { setText, setMessages } = useMessage();
  const [apiKey, setApiKey] = useState<string>("");
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [inputAPIKey, setInputAPIKey] = useState<string>("");
  const [inputModel, setInputModel] = useState<string>("");
  const [isOpen, setIsOpen] = useState(true);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);

  const handleModelClick = (modelName: string) => {
    setSelectedModels(
      (prevSelectedModels) =>
        prevSelectedModels.includes(modelName)
          ? prevSelectedModels.filter((model) => model !== modelName) // 選択解除
          : [...prevSelectedModels, modelName] // 選択
    );
    models.includes({ name: modelName, type: "cloud" }) ? removeModelList(modelName) : addModelList(modelName, "cloud");
  };

  const handleHamburgerMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleAPIKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputAPIKey(e.target.value);
  };

  const handleModel = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputModel(e.target.value);
  };

  const handleResetModels = () => {
    localStorage.removeItem("models");
  };

  // APIを登録する
  const registerAPIKey = () => {
    inputAPIKey.trim();
    if (!inputAPIKey) return;
    setApiKey(inputAPIKey.slice(0, 6) + "...");
    setAPIKey(inputAPIKey);
    setInputAPIKey("");
    setIsRegister(true);
  };

  useEffect(() => {
    let apiKey = getAPIKey();
    if (apiKey) {
      setApiKey(apiKey.slice(0, 6) + "...");
      setIsRegister(true);
    }
  }, []);

  return (
    <>
      <SFlex>
        <Sidebar setMessages={setMessages} setText={setText} isOpen={isOpen} />
        <SMainContainer className={isOpen ? "active" : ""}>
          <Header headding="Setting" />
          <SHamburgerMenu onClick={handleHamburgerMenu}>
            <SHamburgerLine
              className={`hamburger__line ${isOpen ? "active" : ""}`}
            ></SHamburgerLine>
          </SHamburgerMenu>
          <SMask
            className={isOpen ? "active" : ""}
            onClick={handleHamburgerMenu}
          />
          <SSettingContainer>
            <h2>GeminiのAPIを登録する</h2>
            <input type="text" value={inputAPIKey} onChange={handleAPIKey} />
            <button onClick={registerAPIKey}>登録</button>
            <p>{apiKey}</p>
            <SCloudModels isRegister={isRegister}>
              <SCloudModel
                isSelect={selectedModels.includes("gemini-1.5-flash")}
                onClick={() => handleModelClick("gemini-1.5-flash")}
              >
                gemini-1.5-flash
              </SCloudModel>
              <SCloudModel
                isSelect={selectedModels.includes("gemini-1.5-pro")}
                onClick={() => handleModelClick("gemini-1.5-pro")}
              >
                gemini-1.5-pro
              </SCloudModel>
              <SCloudModel
                isSelect={selectedModels.includes("gemini-1.0-pro")}
                onClick={() => handleModelClick("gemini-1.0-pro")}
              >
                gemini-1.0-pro
              </SCloudModel>
            </SCloudModels>
            <h2>モデルを追加する</h2>
            <input type="text" onChange={handleModel} />
            <button onClick={() => addModelList(inputModel, "ollama")}>追加</button>
            <button onClick={handleResetModels}>リセット</button>
            {models.map((model, index) => (
              <p key={model.name + index}>{index + model.name}</p>
            ))}
          </SSettingContainer>
        </SMainContainer>
      </SFlex>
    </>
  );
};

const SFlex = styled.div`
  background-color: #edf2f8;
  height: 100vh;
`;

const SMainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  margin-left: 0;
  transition: all 0.2s;
  &.active {
    margin-left: 260px;
  }

  @media (max-width: 768px) {
    &.active {
      margin-left: 0;
    }
  }
`;

const SHamburgerMenu = styled.div`
  position: fixed;
  top: 10px;
  left: 16px;
  width: 40px;
  height: 40px;
  padding: 8px;
  transition: all 0.2s;
  border-radius: 8px;
  z-index: 200;
  cursor: pointer;
  &:hover {
    background-color: #edf2f8;
  }
`;

const SHamburgerLine = styled.span`
  display: block;
  width: 24px;
  height: 2px;
  background-color: #333;
  position: absolute;
  top: 19px;
  &::before,
  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 2px;
    background-color: #333;
    position: absolute;
    transition: all 0.2s;
  }
  &::before {
    top: -6px;
    transform: rotate(0);
  }
  &::after {
    bottom: -6px;
    transform: rotate(0);
  }
  &.active {
    background-color: transparent;
    &::before {
      top: 0;
      transform: rotate(135deg);
    }
    &::after {
      bottom: 0;
      transform: rotate(45deg);
    }
  }
`;

const SMask = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
    visibility: hidden;
    transition: all 0.2s;
    &.active {
      visibility: visible;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.2);
      z-index: 50;
      cursor: pointer;
    }
  }
`;

const SSettingContainer = styled.div`
  height: 100%;
  width: 100%;
  padding: 16px;
  background-color: #edf2f8;
`;

const SCloudModels = styled.div<{ isRegister: boolean }>`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 32px;
  opacity: ${(props) => (props.isRegister ? "1" : "0.5")};
  pointer-events: ${(props) => (props.isRegister ? "auto" : "none")};
`;

const SCloudModel = styled.div<{ isSelect: boolean }>`
  padding: 8px 16px;
  border-radius: 999px;
  border: ${(props) =>
    props.isSelect ? "2px solid #12b8d8" : "2px solid #f5f5f5"};
  color: #333;
  background-color: ${(props) => (props.isSelect ? "#fff" : "#f5f5f5")};
  cursor: pointer;
  user-select: none;
  transition: all 0.2s;
  &:hover {
    background-color: #fff;
  }
`;

export default Setting;
