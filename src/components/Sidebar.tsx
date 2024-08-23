import styled from "styled-components";
import { Message } from "../types/message";
import { useContext, useEffect, useState } from "react";
import UserMenu from "./UserMenu";
import { Link } from "react-router-dom";
import { ModelContext } from "../context/ModelContext";

interface SidebarProps {
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setText: React.Dispatch<React.SetStateAction<string>>;
  isOpen: boolean;
}

interface Model {
  name: string;
  type: "chrome" | "cloud" | "ollama";
}

const Sidebar = ({ setMessages, setText, isOpen }: SidebarProps) => {
  const {selectedModel, setSelectedModel} = useContext(ModelContext);
  const [models, setModels] = useState<Model[]>([selectedModel]);

  const handleNewChat = () => {
    setMessages([]);
    setText("");
  };
  
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  
  const handlePopoverToggle = () => {
    const modelList = localStorage.getItem("models");
    if (modelList) {
      const parsedModels = JSON.parse(modelList);
      setModels([{name: "Gemini Nano", type: "chrome"}, ...parsedModels]);
    } else {
      setModels([{ name: "Gemini Nano", type: "chrome" }]);
    }
    setPopoverOpen((prevState) => !prevState);
  };

  return (
    <SSidebar className={isOpen ? "active" : ""}>
      <SLink to="/">
        <SButton onClick={handleNewChat}>
          <SButtonIcon src="/images/plus.svg" alt="plus" />
          チャットを新規作成
        </SButton>
      </SLink>
      <SModelContainer>
        {isPopoverOpen && (<UserMenu models={models} setPopoverOpen={setPopoverOpen} setSelectedModel={setSelectedModel} />)}
        {isPopoverOpen && (<SMask onClick={handlePopoverToggle} />)}
        <SModelInfo onClick={handlePopoverToggle}>
          <SIcon src="/images/icon.png"></SIcon>
          <SText>{selectedModel.name}</SText>
        </SModelInfo>
      </SModelContainer>
    </SSidebar>
  );
};

const SSidebar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  min-width: 260px;
  height: 100%;
  padding: 16px;
  border-right: 1px solid #eee;
  background-color: #fff;
  transform: translateX(-100%);
  transition: all 0.2s;
  position: fixed;
  z-index: 100;
  &.active {
    transform: translateX(0);
  }
`;

const SLink = styled(Link)`
  text-decoration: none;
`;

const SButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 100px;
  padding: 16px;
  border: none;
  border-radius: 8px;
  color: #333;
  background-color: #edf2f8;
  font-size: 1rem;
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  &:focus {
    outline: 2px solid #ddd;
  }
`;

const SButtonIcon = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 8px;
`;

const SModelContainer = styled.div`
  width: 100%;
  position: relative;
`;

const SMask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  z-index: 10;
`;

const SModelInfo = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  max-width: 227px;
  padding: 8px 16px;
  border-radius: 8px;
  background-color: #edf2f8;
  user-select: none;
`;

const SText = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const SIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 16px;
`;

export default Sidebar;
