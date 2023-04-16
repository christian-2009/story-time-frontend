import React, { useState, useContext, KeyboardEventHandler } from "react";
import Button from "components/Button";
import { socket } from "socket";
import UserContext from "context/UserContext";

export default function Chat() {
  const { username, room } = useContext(UserContext);
  const [message, setMessage] = useState<string>();

  const onSubmit = () => {
    if (message !== "") {
      const currentTime = Date.now();
      // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
      socket.emit("send_message", { username, room, message });
      setMessage("");
    }
  };

  const onKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="chat">
      <textarea
        className="text-area"
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={onKeyDown}
        value={message}
      />
      <Button
        onClick={onSubmit}
        text={"Send"}
        optionalStyles={{
          width: "15%",
          marginTop: 0,
          marginLeft: "1.5em",
        }}
      />
    </div>
  );
}
