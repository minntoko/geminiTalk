import styled from "styled-components";
import { Message } from "../types/message";
import { useState } from "react";

interface SidebarProps {
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

const Sidebar = ({ setMessages, setText }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleHamburgerMenu = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };
  const handleNewChat = () => {
    setMessages([]);
    setText("");
  };
  return (
    <SSidebar className={isOpen ? "active" : ""}>
      <SHamburgerMenu onClick={handleHamburgerMenu}>
        <SHamburgerLine className={`hamburger__line ${isOpen ? "active" : ""}`}></SHamburgerLine>
      </SHamburgerMenu>
      <SButton onClick={handleNewChat}>
        <SButtonIcon src="./src/assets/images/plus.svg" alt="plus" />
        チャットを新規作成
      </SButton>
      <SModelInfo>
        <SIcon src="./src/assets/images/icon.png"></SIcon>
        Gemini Nano
      </SModelInfo>
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
  }
  &::after {
    bottom: -6px;
  }
  // ハンバーガーメニューが開いた時のアニメーション
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

const SModelInfo = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
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
