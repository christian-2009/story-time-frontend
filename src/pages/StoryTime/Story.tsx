import { MessagesReceivedType, MessagesType } from "interfaces";
import React, { useEffect, useState, useContext, useRef } from "react";
import { socket } from "socket";
import UserContext from "context/UserContext";
import Text from "components/Text";
import { formatDateFromTimestamp, sortMessages } from "utils";

export default function Story() {
  const { username, room } = useContext(UserContext);
  const [messagesReceived, setMessagesReceived] = useState<MessagesType[]>([]);
  const messagesColumnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on("receive_message", (data: MessagesReceivedType) => {
      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          __createdtime__: data.__createdtime__,
        },
      ]);
    });
    return () => {
      socket.off("receive_message");
    };
  }, [socket]);

  useEffect(() => {
    socket.on("last_100_messages", (data: any) => {
      console.log(`[cs] data`, data);
      const last100Messages = JSON.parse(data);
      const sortedData = sortMessages(last100Messages);
      setMessagesReceived([...sortedData, ...messagesReceived]);
    });

    // Remove event listener on component unmount
    return () => {
      socket.off("last_100_messages");
    };
  }, [socket]);

  useEffect(() => {
    if (messagesColumnRef.current)
      messagesColumnRef.current.scrollTop =
        messagesColumnRef?.current?.scrollHeight;
  }, [messagesReceived]);

  useEffect(() => {
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
      backgroundColor: "#014D4E",
      textColor: "white",
      justifyContent: "flex-end",
    },
    otherName: {
      backgroundColor: undefined,
      textColor: "#341948",
      justifyContent: "flex-start",
    },
  };

  console.log(`[cs] messagesReceived`, messagesReceived);

  return (
    <div className="story" ref={messagesColumnRef}>
      {messagesReceived.map((message) => {
        const colorOption = colorOptions[
          message.username as keyof typeof colorOptions
        ]
          ? colorOptions[message.username as keyof typeof colorOptions]
          : colorOptions.otherName;

        return (
          <div className="message">
            <div
              className="message-outer-container"
              style={{
                justifyContent: colorOption.justifyContent,
              }}
            >
              <div
                className="message-container"
                style={{
                  backgroundColor: colorOption.backgroundColor,
                }}
              >
                <Text.Body optionalStyles={{ color: colorOption.textColor }}>
                  {message.message}
                </Text.Body>
              </div>
            </div>
            <div className="message-name-time-container">
              <Text.SmallText>{message.username}</Text.SmallText>
              <Text.SmallText>
                {formatDateFromTimestamp(message.__createdtime__)}
              </Text.SmallText>
            </div>
          </div>
        );
      })}
    </div>
  );
}
