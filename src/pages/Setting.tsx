import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import useMessage from "../hooks/useMessage";
import { useEffect, useState } from "react";
import { useModel } from "../hooks/useModel";

const Setting = () => {
  const { getAPIKey, setAPIKey, addModelList, removeModelList, getModelList } = useModel();
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
    selectedModels?.includes(modelName) ? removeModelList(modelName) : addModelList(modelName, "cloud");
  };

  const handleRemoveModel = (modelName: string) => {
    setSelectedModels(
      (prevSelectedModels) =>
        prevSelectedModels.filter((model) => model !== modelName)
    );
    removeModelList(modelName);
  }

  const handleAddModel = (modelName: string) => {
    setSelectedModels(
      (prevSelectedModels) =>
        prevSelectedModels.includes(modelName)
          ? prevSelectedModels
          : [...prevSelectedModels, modelName]
    );

    setInputModel("");
    selectedModels.includes(modelName) ? null : addModelList(modelName, "ollama");
  }

  const handleHamburgerMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleAPIKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputAPIKey(e.target.value);
  };

  const handleModel = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputModel(e.target.value);
  };

  // APIを登録する
  const registerAPIKey = () => {
    inputAPIKey.trim();
    if (!inputAPIKey) return;
    setApiKey(inputAPIKey.slice(0, 6) + inputAPIKey.slice(6).replace(/./g, "."));
    setAPIKey(inputAPIKey);
    setInputAPIKey("");
    setIsRegister(true);
  };

  useEffect(() => {
    let apiKey = getAPIKey();
    if (apiKey) {
      setApiKey(apiKey.slice(0, 6) + apiKey.slice(6).replace(/./g, "."));
      setIsRegister(true);
    }
  }, [apiKey]);

  const getAddModelList = () => getModelList()?.filter((model) => model.name !== "gemini-1.5-flash" && model.name !== "gemini-1.5-pro" && model.name !== "gemini-1.0-pro");

  useEffect(() => {
    setSelectedModels(getModelList()?.map((model) => model.name) || []);
  }
  , [selectedModels]);
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
            <SHedding>GeminiのAPIを登録する</SHedding>
            <SInput type="text" value={inputAPIKey} onChange={handleAPIKey} />
            <SButton onClick={registerAPIKey}>登録</SButton>
            <SApiBox>
              <SSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={20}><path d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17l0 80c0 13.3 10.7 24 24 24l80 0c13.3 0 24-10.7 24-24l0-40 40 0c13.3 0 24-10.7 24-24l0-40 40 0c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z"/></SSvg>
              <p>{isRegister ? apiKey : "APIキーが登録されていません"}</p>
            </SApiBox>
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
            <SHedding>モデルを追加する</SHedding>
            <SInput type="text" value={inputModel} onChange={handleModel} />
            <SButton onClick={() => handleAddModel(inputModel)}>追加</SButton>
            {getAddModelList()?.map((model, index) => (
              <SModelContainer>
                <SModel key={model.name + index}>
                <SSvg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                  width="20px"
                  height="20px"
                >
                  <path d="M320 0c17.7 0 32 14.3 32 32l0 64 120 0c39.8 0 72 32.2 72 72l0 272c0 39.8-32.2 72-72 72l-304 0c-39.8 0-72-32.2-72-72l0-272c0-39.8 32.2-72 72-72l120 0 0-64c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-32 0zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-32 0zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-32 0zM264 256a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm152 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80zM48 224l16 0 0 192-16 0c-26.5 0-48-21.5-48-48l0-96c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-16 0 0-192 16 0z" />
                </SSvg>
                <p>{model.name}</p>
              </SModel>
                <SRemoveButton onClick={() => handleRemoveModel(model.name)}>削除</SRemoveButton>
              </SModelContainer>

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

const SApiBox = styled.div`
  display: flex;
  align-items: center;
  height: 24px;
  padding-left: 8px;
  margin-top: 8px;
  font-size: 1rem;
`;

const SSettingContainer = styled.div`
  height: 100%;
  width: 100%;
  max-width: 750px;
  padding: 16px;
  margin: 0 auto;
  background-color: #edf2f8;
`;

const SHedding = styled.h2`
  font-size: 1.3rem;
  margin: 24px 0;
`;

const SInput = styled.input`
  width: calc(100% - 67px);
  border: none;
  padding: 8px 16px;
  font-size: 1rem;
  border-radius: 8px;
  background-color: #fefefe;
  &::-webkit-resizer {
    display: none;
  }
  &:focus {
    outline: none;
  }
`;

const SButton = styled.button`
  padding: 8px 16px;
  margin-left: 8px;
  border: none;
  border-radius: 8px;
  background-color: #12b8d8;
  color: #fff;
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const SModelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 24px;
`;

const SModel = styled.div`
  display: flex;
  align-items: center;
  width: calc( 100% - 67px );
  padding: 0 12px;
  border-radius: 8px;
  list-style: none;
  transition: all 0.3s;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
  &:hover {
    background-color: #fefefe;
  }
`;

const SSvg = styled.svg`
  min-width: 20px;
  margin-right: 8px;
`;

const SRemoveButton = styled.button`
  padding: 8px 16px;
  margin-left: 8px;
  border: none;
  border-radius: 8px;
  background-color: #ef2b48;
  color: #fff;
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
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
