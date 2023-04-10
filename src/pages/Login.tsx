import React, {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  KeyboardEventHandler,
  MutableRefObject,
  SyntheticEvent,
  useContext,
  useEffect,
  useRef,
} from "react";
import UserContext from "context/UserContext";
import { socket } from "socket";
import { useNavigate } from "react-router-dom";
import Title from "components/Title";

function Login() {
  const navigate = useNavigate();
  const roomRef = useRef<HTMLInputElement>(null);
  const { username, setUsername, room, setRoom } = useContext(UserContext);

  const setters = {
    username: setUsername,
    room: setRoom,
  };

  useEffect(() => {
    if (setRoom) setRoom(undefined);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;
    const setter = setters[name as keyof typeof setters];
    if (setter) setter(value);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      roomRef?.current?.focus();
    }
  };

  const joinRoom = (e: FormEvent) => {
    e.preventDefault();

    console.log(`[cs] in here`);
    if (room && username) {
      socket.emit("join_room", { username, room });
      navigate("/story-time");
    }
  };

  console.log(`[cs] username`, username);
  console.log(`[cs] room`, room);

  return (
    <div className="app">
      <div className="login-container">
        <Title />
        <div className="input-containers">
          <form onSubmit={joinRoom}>
            <input
              className="login-input"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              value={username}
              type={"text"}
            ></input>
            <input
              className="login-input"
              ref={roomRef}
              placeholder="Room"
              name="room"
              onChange={handleChange}
            ></input>
            <button className="login-button" type="submit">
              Join
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
