import React, {
  useState,
  useContext,
  KeyboardEventHandler,
  useRef,
} from "react";
import Button from "components/Button";
import { socket } from "socket";
import UserContext from "context/UserContext";
import Text from "components/Text";
import TextArea from "components/TextArea";

export default function Chat() {
  const { username, room } = useContext(UserContext);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [message, setMessage] = useState<string>();

  const onSubmit = () => {
    if (message !== "") {
      const __createdtime__ = Date.now();
      // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
      socket.emit("send_message", { username, room, message, __createdtime__ });
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
      <TextArea
        onSubmit={onSubmit}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={onKeyDown}
        value={message}
        placeholder={"Type Here"}
      />
      {/* <Text.BodyLarge
        optionalStyles={{ fontFamily: "Roboto Slab", marginBottom: "10px" }}
      >
        Type Here
      </Text.BodyLarge>
      <textarea
        className="text-area"
        style={{
          borderBottomColor: isFocused ? "black" : undefined,
        }}
        onChange={(e) => setMessage(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={onKeyDown}
        value={message}
      /> */}
      {/* <Button
        onClick={onSubmit}
        text={"Send"}
        optionalStyles={{
          width: "15%",
          marginTop: 0,
          marginLeft: "1.5em",
        }}
      /> */}
    </div>
  );
}
