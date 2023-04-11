import { MessagesReceivedType } from "interfaces";
import React, { useEffect, useState, useContext } from "react";
import { socket } from "socket";
import UserContext from "context/UserContext";
import Text from "components/Text";

export default function Story() {
  const { username } = useContext(UserContext);
  const [messagesReceived, setMessagesReceived] = useState<
    MessagesReceivedType[]
  >([]);

  useEffect(() => {
    socket.on("receive_message", (data: MessagesReceivedType) => {
      console.log(data);
      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          currentTime: data.currentTime,
        },
      ]);
    });

    // Remove event listener on component unmount
    return () => {
      socket.off("receive_message");
    };
  }, [socket]);

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

  return (
    <div className="story">
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
                <Text.Body
                  optionalStyles={colorOption.textColor as React.CSSProperties}
                >
                  {message.message}
                </Text.Body>
              </div>
            </div>
            <div className="message-name-time-container">
              <Text.SmallText>{message.username}</Text.SmallText>
              <Text.SmallText>{message.currentTime}</Text.SmallText>
            </div>
          </div>
        );
      })}
    </div>
  );
}
