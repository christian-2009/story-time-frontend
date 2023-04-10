import React, {
  ChangeEvent,
  FormEvent,
  SyntheticEvent,
  useContext,
  useEffect,
} from "react";
import UserContext from "context/UserContext";
import { socket } from "socket";

function Login() {
  const { username, setUsername, room, setRoom } = useContext(UserContext);

  const setters = {
    username: setUsername,
    room: setRoom,
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;
    const setter = setters[name as keyof typeof setters];

    if (setter) setter(value);
  };

  const joinRoom = () => {
    if (room !== "" && username !== "") {
      socket.emit("join_room", { username, room });
    }
  };

  return (
    <div className="app">
      <div className="login-container">
        <h1 className="title">Story Time</h1>
        <div className="input-containers">
          <form>
            <input
              className="login-input"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            ></input>
            <input
              className="login-input"
              placeholder="Room"
              name="room"
              onChange={handleChange}
            ></input>
            <button className="login-button" onClick={joinRoom}>
              Join
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
