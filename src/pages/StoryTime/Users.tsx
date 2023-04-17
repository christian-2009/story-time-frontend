import Text from "components/Text";
import Button from "components/Button";
import { useContext, useEffect, useState } from "react";
import { socket } from "socket";
import UserContext from "context/UserContext";
import { User } from "interfaces";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const { username, room } = useContext(UserContext);
  const navigate = useNavigate();
  const [roomUsers, setRoomUsers] = useState<User[]>([]);

  useEffect(() => {
    socket.on("chatroom_users", (data) => {
      console.log(`[cs] data`, data);
      setRoomUsers(data);
    });
  }, [socket]);

  const leaveRoom = () => {
    const __createdtime__ = Date.now();
    socket.emit("leave_room", { username, room, __createdtime__ });
    navigate("/", { replace: true });
  };

  return (
    <div className="leave">
      <Text.Subtitle optionalStyles={{ marginTop: "0.2em" }}>
        Users
      </Text.Subtitle>
      <div className="users">
        {roomUsers.map((user) => {
          return <Text.Body>{user.username}</Text.Body>;
        })}
      </div>
      <div
        style={{
          display: "flex",
          flex: "1 1 auto",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          text="Leave"
          optionalStyles={{ marginTop: 0 }}
          onClick={leaveRoom}
        />
      </div>
    </div>
  );
}
