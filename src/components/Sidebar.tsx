import styled from "styled-components";
import { Message } from "../types/message";

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
  return (
    <SSidebar className={isOpen ? "active" : ""}>
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
