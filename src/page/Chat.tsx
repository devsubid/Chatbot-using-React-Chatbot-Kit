import { useState, useEffect } from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import { styled } from "styled-components";
import config from "../../bot/config";
import ActionProvider from "../../bot/ActionProvider";
import MessageParser from "../../bot/MessageParser";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { useDispatch } from "react-redux";
import { decrementCount } from "../../redux/features/messages-slice";
import { useNavigate } from "react-router-dom";

const StyledChat = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  & .intro {
    text-align: center;
    & > h1 {
      font-size: 3.5rem;
    }
    & > button {
      margin-top: 1rem;
      padding: 0.75rem 2rem;
      font-size: 2rem;
      border-radius: 5rem;
      border: 1px solid rgb(var(--dark-color));
      transition: 0.15s;
      &:active {
        transform: scale(0.95);
        border-color: rgb(var(--primary-color));
      }
    }
  }
  & > div:not(.intro) {
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 0 1rem 1rem 0;
    & .react-chatbot-kit-chat-inner-container {
      border: 1px solid rgb(var(--dark-color) / 0.25);
      border-radius: 1rem;
      overflow: hidden;
      & .react-chatbot-kit-chat-bot-message {
        border-bottom-left-radius: 0;
        & .react-chatbot-kit-chat-bot-message-arrow {
          border-width: 0;
        }
      }
    }
  }
`;

const Chat = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const navigate = useNavigate();
  const count = useAppSelector((state) => state.messageReducer.count);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const interval = setInterval(() => {
      if (count > 0) {
        dispatch(decrementCount());
      } else if (count === 0) {
        navigate("/success");
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [count, dispatch, navigate]);
  return (
    <StyledChat>
      <div className="intro">
        <h1>Enter into Student Info System</h1>
        <button onClick={() => setIsOpened((prev) => !prev)}>
          Enroll Now!
        </button>
      </div>
      {isOpened && (
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
      )}
    </StyledChat>
  );
};

export default Chat;
