import styled from "styled-components";
import { Message } from "../types/message";
import { useState } from "react";
import UserMenu from "./UserMenu";

interface SidebarProps {
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setText: React.Dispatch<React.SetStateAction<string>>;
  isOpen: boolean;
}

const Sidebar = ({ setMessages, setText, isOpen }: SidebarProps) => {
  const handleNewChat = () => {
    setMessages([]);
    setText("");
  };
  
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  const handlePopoverToggle = () => {
    setPopoverOpen((prevState) => !prevState);
  };

  return (
    <SSidebar className={isOpen ? "active" : ""}>
      <SButton onClick={handleNewChat}>
        <SButtonIcon src="/images/plus.svg" alt="plus" />
        チャットを新規作成
      </SButton>
      <SModelContainer>
        {isPopoverOpen && (<UserMenu />)}
        {isPopoverOpen && (<SMask onClick={handlePopoverToggle} />)}
        <SModelInfo onClick={handlePopoverToggle}>
          <SIcon src="/images/icon.png"></SIcon>
          Gemini Nano
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
  padding: 8px 16px;
  border-radius: 8px;
  background-color: #edf2f8;
  user-select: none;
`;

const SIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 16px;
`;

export default Sidebar;
