import { createChatBotMessage } from "react-chatbot-kit";
import GotIt from "./widgets/options/GotIt";
import AgeDropdown from "./widgets/options/AgeDropdown";
import IWidget from "react-chatbot-kit/build/src/interfaces/IWidget";
import IConfig from "react-chatbot-kit/build/src/interfaces/IConfig";
import chatGPT from "/chatgpt.svg";

const config: IConfig = {
  botName: "Student Info System Bot",
  initialMessages: [
    createChatBotMessage(`Hello, Welcome to student info system!`, {
      widget: "gotIt",
    }),
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#376B7E",
    },
  },
  customComponents: {
    botAvatar: (props: any) => <img src={chatGPT} alt="bot" {...props} />,
  },
  widgets: [
    {
      widgetName: "gotIt",
      widgetFunc: (props: any) => <GotIt {...props} />,
    },
    {
      widgetName: "ageDropdown",
      widgetFunc: (props: any) => <AgeDropdown {...props} />,
    },
  ] as IWidget[],
};

export default config;
