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
import Text from "components/Text";
import Input from "components/Input";

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

    if (room && username) {
      try {
        socket.emit("join_room", { username, room });
      } catch (e) {
        console.log(`[cs] e`, e);
      }
      navigate("/story-time");
    }
  };

  const loginIntroText = `This is a simple web app that will allow you to make cool stories with a friend.\n\n\Simply create a simple username and join or create a room. Then you will each take it in turn to write sentences to a short story. \n\n\The only limitation is your own imagination. Go wild!`;

  return (
    <div className="app">
      <div className="login-container">
        <Text.Title />
        <div className="input-containers">
          <Text.Body
            optionalStyles={{
              color: "black",
              whiteSpace: "pre-wrap",
            }}
          >
            {loginIntroText}
          </Text.Body>
          <form style={{ width: "100%" }} onSubmit={joinRoom}>
            <Input
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              value={username}
              name="username"
              placeholder="Username"
            />
            <Input
              onChange={handleChange}
              ref={roomRef}
              name="room"
              placeholder="Room"
              value={room}
            />

            {/* <div className="input-container">
              <input
                className="login-input"
                ref={roomRef}
                name="room"
                onChange={handleChange}
              ></input>
              <label className={username !== "" ? "active" : ""}>Room</label>
            </div> */}
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
