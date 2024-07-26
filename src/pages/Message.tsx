import styled, { keyframes } from "styled-components";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import useMessage from "../hooks/useMessage";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

interface WelcomeCards {
  title: string;
  icon: string;
  prompt: string;
}

const Message = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [welcomeCards, setWelcomeCards] = useState<WelcomeCards[]>([]);
  const handleHamburgerMenu = () => {
    setIsOpen(!isOpen);
  };
  const { text, setText, messages, setMessages, sendMessage } = useMessage();
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

  useEffect(() => {
    randomWelcomeMessage();
    const handleResize = () => {
      if (window.innerWidth <= 900) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call on mount to set initial state based on window size

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const welcomeMessages = [
    {
      title: "長所・短所の説明",
      icon: "/images/light.svg",
      prompt: "スマートウォッチの長所・短所について会話形式でわかりやすく説明して。",
    },
    {
      title: "面接の準備",
      icon: "/images/pen.svg",
      prompt: "IT企業のフロントエンドエンジニアの求人に応募するんだけど、面接で聞かれそうな質問をリストにまとめて。",
    },
    {
      title: "文章の校正",
      icon: "/images/pen.svg",
      prompt: "次の文章に文法ミスや誤字脱字がないかチェックして。",
    },
    {
      title: "プレゼンのアイデア",
      icon: "/images/compass.svg",
      prompt: "面白くてユニークなプログラミングに関連するプレゼンのテーマを10個考えて。",
    },
    {
      title: "文章の要約",
      icon: "/images/pen.svg",
      prompt: "次の文章を200文字程度に要約してください。",
    },
    {
      title: "プログラムを作成",
      icon: "/images/terminal.svg",
      prompt: "React, TypeScriptで次の要件を満たすプログラムを作成してください。",
    },
    {
      title: "モノの比較",
      icon: "/images/light.svg",
      prompt: "こしあんとつぶあんを比較して表でまとめて。",
    }
  ]

  const randomWelcomeMessage = () => {
    // ランダムに要素を4つ取得
    const randomMessages = welcomeMessages
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
    setWelcomeCards(randomMessages);
  }

  const handleWelcomeBox = (prompt: string) => {
    setText(prompt);
  }

  return (
    <>
      <SFlex>
        <Sidebar setMessages={setMessages} setText={setText} isOpen={isOpen} />
        <SMainContainer className={isOpen ? "active" : ""}>
          <Header headding="Gemini Talk" />
          <SHamburgerMenu onClick={handleHamburgerMenu}>
            <SHamburgerLine
              className={`hamburger__line ${isOpen ? "active" : ""}`}
            ></SHamburgerLine>
          </SHamburgerMenu>
          <SMask className={isOpen ? "active" : ""} onClick={handleHamburgerMenu} />
          <SDisplayContainer>
            <SMessageContainer>
              {/* メッセージがない場合は、ウェルカムメッセージを表示 */}
              {messages.length === 0 && (
                <SWelcomeContainer>
                  <div>
                    <SWelcomeMessage><SLine>ようこそ</SLine>Gemini Talkへ</SWelcomeMessage>
                    <SSpan>ご用件をお聞かせください</SSpan>
                  </div>
                  <SWelcomeBoxContainer>
                    {welcomeCards.map((message, index) => (
                      <SWelcomeBox key={message.title + index} onClick={() => handleWelcomeBox(message.prompt)}>
                        <p>{message.title}</p>
                        <img src={message.icon} alt="icon" />
                      </SWelcomeBox>
                    ))}
                  </SWelcomeBoxContainer>
                </SWelcomeContainer>
              )}
              {messages.map((message, index) => (
                <SCard key={message.content + index}>
                  <SIcon
                    role={message.role}
                    src="/images/icon.png"
                  ></SIcon>
                  <SMessageBox role={message.role}>
                    <SMessage role={message.role}>{message.content}</SMessage>
                  </SMessageBox>
                </SCard>
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
        </SMainContainer>
      </SFlex>
    </>
  );
};

const SFlex = styled.div`
  background-color: #edf2f8;
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

const SDisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  width: 100%;
  height: calc(100vh - 60px);
`;

const SMessageContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 12px;
  width: 70%;
  min-width: 640px;
  max-width: 880px;
  padding: 40px 20px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    width: 100%;
    min-width: 300px;
    padding: 40px 0;
  }
`;

const SWelcomeContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 30px;
`;

const slide = keyframes`
  from { background-position: 0% 0%; } 
  to { background-position: 100% 0%; }    /* 右から左へ移動するアニメーション */
`;

const SWelcomeMessage = styled.span`
  display: block;
  font-size: 3rem;
  font-weight: bold;
  line-height: 1.2;
  color: transparent;
  background-clip: text;
  background-image: linear-gradient(45deg, #12a3d8, #a563ed, #fc5d5d, #f9c017, #8ad962, #12a3d8, #a563ed, #fc5d5d);
  background-size: 400%;
  animation: ${slide} 60s infinite linear;
  
  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

const SSpan = styled.span`
  display: block;
  font-size: 3rem;
  line-height: 1.2;
  font-weight: bold;
  color: #bbb;
  
  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

const SLine = styled.span`
  display: inline-block;

  @media (max-width: 768px) {
    display: block;
  }
`;

const SWelcomeBoxContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 100px;
  gap: 8px;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SWelcomeBox = styled.button`
  width: 200px;
  height: 150px;
  padding: 16px;
  border-radius: 16px;
  background-color: #fff;
  position: relative;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
  &:focus {
    background-color: #d3e3fd;
    outline: none;
  }
  img {
    width: 24px;
    height: 24px;
    position: absolute;
    top: 16px;
    left: 16px;
  }

  @media (max-width: 768px) {
    min-width: calc(42% - 4px);
  }
`;

const SCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const SIcon = styled.img<{ role: string }>`
  display: ${(props) => (props.role === "user" ? "none" : "block")};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 8px;
`;

const SMessageBox = styled.div<{ role: string }>`
  display: flex;
  flex-grow: 1;
  justify-content: ${(props) =>
    props.role === "user" ? "flex-end" : "flex-start"};
`;

const SMessage = styled(ReactMarkdown)<{ role: string }>`
  padding: 4px 16px;
  min-width: 48px;
  max-width: 80%;
  min-height: 32px;
  margin: 4px 0;
  color: ${(props) => (props.role === "user" ? "#fff" : "#0d0d0d")};
  background-color: ${(props) => (props.role === "user" ? "#12b8d8" : "#fff")};
  border-radius: 16px;
  white-space: pre-wrap;
  font-size: 1em;
  line-height: 1.5;
`;

const SOperation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  margin: 0 auto 20px;
`;

const SInputArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 70%;
  min-width: 640px;
  max-width: 880px;
  margin: 0 auto;
  padding: 12px 0;
  border-radius: 8px;
  border-radius: 24px;
  background-color: #fff;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
    min-width: 300px;
  }
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
  background-color: transparent;
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
  border-radius: 999px;
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
