import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface Model {
  name: string;
  type: "chrome" | "cloud" | "ollama";
}

interface Props {
  models: Model[];
  setPopoverOpen: (popoverOpen: boolean) => void;
  setSelectedModel: (model: Model) => void;
}

const UserMenu = ({ models, setPopoverOpen, setSelectedModel }: Props) => {
  const reversedModels = [...models].reverse();
  useEffect(() => {
    const modelContainer = document.getElementById("modelContainer");
    if (modelContainer) {
      modelContainer.scrollTop = modelContainer.scrollHeight;
    }
  }
  , [models]);

  const handleSelectModel = (model: Model) => {
    setSelectedModel(model);
    setPopoverOpen(false);
  }
  return (
    <SUserMenu>
      <SUserMenuUl>
        <SModelContainer id="modelContainer">
          {reversedModels.map((model, index) => (
            <SUserMenuItem key={index} onClick={() => handleSelectModel({name: model.name, type: model.type})}>
              <SSvg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
                width="20px"
                height="20px"
              >
                <path d="M320 0c17.7 0 32 14.3 32 32l0 64 120 0c39.8 0 72 32.2 72 72l0 272c0 39.8-32.2 72-72 72l-304 0c-39.8 0-72-32.2-72-72l0-272c0-39.8 32.2-72 72-72l120 0 0-64c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-32 0zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-32 0zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-32 0zM264 256a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm152 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80zM48 224l16 0 0 192-16 0c-26.5 0-48-21.5-48-48l0-96c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-16 0 0-192 16 0z" />
              </SSvg>
              <SSpan>{model.name}</SSpan>
            </SUserMenuItem>
          ))}
        </SModelContainer>
        <SLink to="/setting">
          <SUserMenuItem>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20px"
              height="20px"
            >
              <path
                d="M9.95401 2.2106C11.2876 1.93144 12.6807 1.92263 14.0449 2.20785C14.2219 3.3674 14.9048 4.43892 15.9997 5.07103C17.0945 5.70313 18.364 5.75884 19.4566 5.3323C20.3858 6.37118 21.0747 7.58203 21.4997 8.87652C20.5852 9.60958 19.9997 10.736 19.9997 11.9992C19.9997 13.2632 20.5859 14.3902 21.5013 15.1232C21.29 15.7636 21.0104 16.3922 20.6599 16.9992C20.3094 17.6063 19.9049 18.1627 19.4559 18.6659C18.3634 18.2396 17.0943 18.2955 15.9997 18.9274C14.9057 19.559 14.223 20.6294 14.0453 21.7879C12.7118 22.067 11.3187 22.0758 9.95443 21.7906C9.77748 20.6311 9.09451 19.5595 7.99967 18.9274C6.90484 18.2953 5.63539 18.2396 4.54272 18.6662C3.61357 17.6273 2.92466 16.4164 2.49964 15.1219C3.41412 14.3889 3.99968 13.2624 3.99968 11.9992C3.99968 10.7353 3.41344 9.60827 2.49805 8.87524C2.70933 8.23482 2.98894 7.60629 3.33942 6.99923C3.68991 6.39217 4.09443 5.83576 4.54341 5.33257C5.63593 5.75881 6.90507 5.703 7.99967 5.07103C9.09364 4.43942 9.7764 3.3691 9.95401 2.2106ZM11.9997 14.9992C13.6565 14.9992 14.9997 13.6561 14.9997 11.9992C14.9997 10.3424 13.6565 8.99923 11.9997 8.99923C10.3428 8.99923 8.99967 10.3424 8.99967 11.9992C8.99967 13.6561 10.3428 14.9992 11.9997 14.9992Z"
                fill="#333"
              ></path>
            </svg>
            <SSpan>設定</SSpan>
          </SUserMenuItem>
        </SLink>
      </SUserMenuUl>
    </SUserMenu>
  );
};

const SUserMenu = styled.div`
  position: absolute;
  bottom: 100%;
  transform: translateY(-16px);
  width: 100%;
  z-index: 20;
  background-color: #edf2f8;
  border-radius: 8px;
  padding: 12px;
`;

const SUserMenuUl = styled.ul`
  list-style: none;
  padding: 0;
`;

const SModelContainer = styled.div`
  scrollbar-width: none;
  margin-bottom: 12px;
  max-height: 50vh;
  overflow-y: scroll;
`;

const SLink = styled(Link)`
  text-decoration: none;
`;

const SUserMenuItem = styled.li`
  display: flex;
  align-items: center;
  padding: 12px;
  margin-bottom: 12px;
  border-radius: 8px;
  list-style: none;
  transition: all 0.3s;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
  &:hover {
    background-color: #fff;
  }
  &::before {
    display: none;
  }
  &:last-child {
    margin-bottom: 0;
  }
`;

const SSvg = styled.svg`
  min-width: 20px;
`;

const SSpan = styled.span`
  margin-left: 0.5rem;
  color: #333;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export default UserMenu;
