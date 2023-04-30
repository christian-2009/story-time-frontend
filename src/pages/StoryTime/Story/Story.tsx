import { MessagesReceivedType, MessagesType } from "interfaces";
import React, { useEffect, useState, useContext, useRef } from "react";
import { socket } from "socket";
import UserContext from "context/UserContext";
import Text from "components/Text";
import { sortMessages } from "utils";
import Chat from "./Chat";
import { motion, useAnimate } from "framer-motion";
import { flushSync } from "react-dom";

export default function Story() {
  const { username, room } = useContext(UserContext);
  const [messagesReceived, setMessagesReceived] = useState<MessagesType[]>([]);
  const [messagesContainerHeight, setMessagesContainerHeight] =
    useState<number>();
  const [pages, setPages] = useState<number[]>([1]);
  const [story, setStory] = useState<string[]>([]);
  const [scope, animate] = useAnimate();
  const firstRender = useRef(true);
  const messagesColumnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on("receive_message", (data: MessagesReceivedType) => {
      flushSync(() => {
        setMessagesReceived((state) => [
          ...state,
          {
            message: data.message,
            username: data.username,
            __createdtime__: data.__createdtime__,
          },
        ]);
      });
      messagesColumnRef.current?.lastElementChild?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    });

    return () => {
      socket.off("receive_message");
    };
  }, [socket]);

  useEffect(() => {
    socket.on("last_100_messages", (data: any) => {
      const last100Messages = JSON.parse(data);
      const sortedData = sortMessages(last100Messages);
      setMessagesReceived([...sortedData, ...messagesReceived]);
    });

    // Remove event listener on component unmount
    return () => {
      socket.off("last_100_messages");
    };
  }, [socket]);

  // useEffect(() => {
  //   messagesColumnRef.current?.scrollTo({ top: 100 });
  // }, [messagesReceived]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    //todo: boot user out of page on refresh
    window.addEventListener("beforeunload", reinitialiseConnection);
    return () => {
      window.removeEventListener("beforeunload", reinitialiseConnection);
    };
  }, []);

  const reinitialiseConnection = () => {
    socket.emit("join_room", { username, room });
  };

  const lowerCaseUsername = username?.toLowerCase() as string;

  const colorOptions = {
    [lowerCaseUsername]: {
      backgroundColor: "transparent",
      textColor: "black",
      justifyContent: "flex-end",
    },
    otherName: {
      backgroundColor: "transparent",
      textColor: "#6176a0",
      justifyContent: "flex-start",
    },
  };

  // useEffect(() => {
  //   if (pages.length > 1) {
  //     //TODO: figure out how to make this animation flexible
  //     animate(
  //       scope.current,
  //       {
  //         // x: 700,
  //         y: -100,
  //         left: "60%",
  //         rotate: [0, Math.random() * 360],
  //         scale: 0.3,
  //         zIndex: 1,
  //       },
  //       { duration: 1 }
  //     );
  //   }
  // }, [pages]);

  return (
    <>
      <div className="story">
        <div
          className="story-messages-container"
          ref={messagesColumnRef}
          //(el) => {
          // if (
          //   !messagesContainerHeight &&
          //   el?.getBoundingClientRect()?.height
          // ) {
          //   setMessagesContainerHeight(el?.getBoundingClientRect()?.height);
          // }
        >
          {messagesReceived.map((message) => {
            const colorOption = colorOptions[
              message.username as keyof typeof colorOptions
            ]
              ? colorOptions[message.username as keyof typeof colorOptions]
              : colorOptions.otherName;

            return (
              <div
                className="message"
                //FUNCTIONALITY TO MOVE THE PAGE
                // ref={(el) => {
                //   const currentMessageTopVal = el?.getBoundingClientRect()
                //     ?.top as number;
                //   if (
                //     messagesContainerHeight &&
                //     currentMessageTopVal >= messagesContainerHeight
                //   ) {
                //     if (firstRender.current) {
                //     }
                //     setPages((p) => [...p, pages.length + 1]);
                //     //getting the entire story
                //     setStory([
                //       ...story,
                //       ...messagesReceived.map((m) => m.message),
                //     ]);
                //     setMessagesReceived([]);
                //   }
                // }}
              >
                <div className="message-outer-container">
                  <div className="message-container">
                    <Text.BodyLarge
                      optionalStyles={{
                        color: colorOption.textColor,
                        hyphens: "auto",
                      }}
                    >
                      {message.message}
                    </Text.BodyLarge>
                  </div>
                </div>
                <div className="message-name-time-container">
                  <Text.SmallText
                    optionalStyles={{ color: colorOption.textColor }}
                  >
                    {message.username}
                  </Text.SmallText>
                  {/* <Text.SmallText
                  optionalStyles={{ color: colorOption.textColor }}
                >
                  {formatDateFromTimestamp(message.__createdtime__)}
                </Text.SmallText> */}
                </div>
              </div>
            );
          })}
        </div>
        {/* <button
          onClick={() =>
           
          }
        >
          click
        </button> */}

        <Chat messagesReceived={messagesReceived} />
      </div>

      {/* {pages.map(() => (
        <div ref={scope} className="story-animation" />
      ))} */}
    </>
  );
}
