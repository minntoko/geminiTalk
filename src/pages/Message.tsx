import styled from "styled-components";
import { useEffect, useRef } from "react";
import useMessage from "../hooks/useMessage";
import Header from "../components/Header";

const Message = () => {
  const { text, setText, messages, sendMessage } = useMessage();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);


  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      event.key === "Enter" &&
      event.metaKey &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault();
      sendMessage();
    }
  };

  // テキストエリアの高さを調整する
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "24px"; // 最小の高さを設定
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  return (
    <>
      <Header headding="Gemini Nano" />
      <SDisplayContainer>
        <SMessageContainer>
          {messages.map((message, index) => (
            <SMessageBox role={message.role} key={message.content + index}>
              <SMessage role={message.role}>{message.content}</SMessage>
            </SMessageBox>
          ))}
        </SMessageContainer>
        <SOperation>
          <SInputArea className="inputBox">
            <SInput
              value={text}
              ref={textareaRef}
              onChange={(event) => setText(event.target.value)}
              onKeyDown={(event) => handleKeyDown(event)}
              placeholder="メッセージを入力してください"
            />
            <SButton onClick={sendMessage}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={"24px"}
                height={"24px"}
              >
                <path
                  d="M1.94631 9.31555C1.42377 9.14137 1.41965 8.86034 1.95706 8.6812L21.0433 2.31913C21.5717 2.14297 21.8748 2.43878 21.7268 2.95706L16.2736 22.0433C16.1226 22.5718 15.8179 22.5901 15.5946 22.0877L12.0002 14.0002L18.0002 6.00017L10.0002 12.0002L1.94631 9.31555Z"
                  fill="#ffffff"
                ></path>
              </svg>
            </SButton>
          </SInputArea>
        </SOperation>
      </SDisplayContainer>
    </>
  );
};

const SDisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: calc(100vh - 60px);
`;

const SMessageContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 12px;
  width: 640px;
  padding: 40px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SMessageBox = styled.div<{role: string}>`
  display: flex;
  justify-content: ${(props) => (props.role === "user" ? "flex-end" : "flex-start")};
`;

const SMessage = styled.div<{role: string}>`
  padding: 4px 16px;
  min-width: 48px;
  max-width: 80%;
  min-height: 32px;
  color: ${(props) => (props.role === "user" ? "#fff" : "#0d0d0d")};
  background-color: ${(props) => (props.role === "user" ? "#12b8d8" : "#efefef")};
  border-radius: 16px;
  white-space: pre-wrap;
  font-size: 1em;
`;

const SOperation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 640px;
  margin: 0 auto 20px;
`;

const SInputArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto;
  padding: 12px 0;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
`;

const SInput = styled.textarea`
  width: 100%;
  height: 24px;
  max-height: 50vh;
  vertical-align: bottom;
  border: none;
  resize: vertical;
  padding: 0 16px;
  margin-right: 48px;
  font-size: 1rem;
  &::-webkit-resizer {
    display: none;
  }
  &:focus {
    outline: none;
  }
`;

const SButton = styled.button`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  padding: 8px;
  margin: 4px;
  border: none;
  color: #fff;
  background-color: #12b8d8;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  &:focus {
    outline: 2px solid #ddd;
  }
`;

export default Message;
