import React from "react";
import { IMessageOptions } from "react-chatbot-kit/build/src/interfaces/IMessages";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { addAge, addName } from "../redux/features/messages-slice";

const ActionProvider = ({
  createChatBotMessage,
  setState,
  children,
}: {
  createChatBotMessage: (
    message: string,
    options: IMessageOptions
  ) => {
    loading: boolean;
    widget?: string;
    delay?: number;
    payload?: any;
    message: string;
    type: string;
    id: number;
  };
  setState: any;
  children: any;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleGotIt = () => {
    const botMessage = createChatBotMessage("Enter your Name", {});

    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const handleUserInput = (age?: number) => {
    setState(
      (prev: {
        messages: {
          message: string;
          type: string;
          id: number;
          loading?: boolean;
          widget?: string | undefined;
          delay?: number | undefined;
          payload?: any;
        }[];
      }) => {
        let botMessage;
        if (
          prev.messages[prev.messages.length - 2].message === "Enter your Name"
        ) {
          dispatch(addName(prev.messages[prev.messages.length - 1].message));
          botMessage = createChatBotMessage("Enter your Age", {
            widget: "ageDropdown",
          });
          return {
            ...prev,
            messages: [...prev.messages, botMessage],
          };
        } else if (age) {
          dispatch(addAge(age.toString()));
          botMessage = createChatBotMessage(
            "Thank you. In 5 seconds, bot will exit.",
            {}
          );
          return {
            ...prev,
            messages: [...prev.messages, botMessage],
          };
        } else {
          return prev;
        }
      }
    );
  };
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleGotIt,
            handleUserInput,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
