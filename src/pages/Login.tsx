import React, {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import UserContext from "context/UserContext";
import { socket } from "socket";
import { useNavigate } from "react-router-dom";
import Text from "components/Text";
import Input from "components/Input";
import { Errors, FormInputType } from "interfaces";
import { useForm } from "react-hook-form";
import FormInput from "components/FormInput";

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { dirtyFields, errors },
  } = useForm<FormInputType>({
    defaultValues: { username: "", password: "", room: "" },
  });
  const roomRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { username, setUsername, room, setRoom } = useContext(UserContext);
  const [password, setPassword] = useState<string>();

  const state = [username, room, password];

  const setters = {
    username: setUsername,
    room: setRoom,
    password: setPassword,
  };

  useEffect(() => {
    if (setRoom) setRoom("");
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;
    const setter = setters[name as keyof typeof setters];
    if (setter) setter(value);
  };

  const handleKeyDown = (
    e: KeyboardEvent,
    ref: React.RefObject<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      ref.current?.focus();
    }
  };

  const handleErrors = () => {
    for (const field of state) {
      console.log(`[cs] [field]`, field);
      if (!field) {
        // const errorForField = errorMessage(field);
        // setErrors({ ...errors, [field]: errorForField });
      }
    }
  };

  const errorMessage = (field: string) => {
    return `Must provide a valid ${field}`;
  };

  const joinRoom = (data: any) => {
    // e.preventDefault();
    console.log(`[cs] data`, data);
    handleErrors();
    const errorArray = Object.keys(errors);

    if (errorArray?.length === 0 && room && username && password) {
      try {
        socket.emit("join_room", { username, room });
      } catch (e) {
        throw e;
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
          <form style={{ width: "100%" }} onSubmit={handleSubmit(joinRoom)}>
            <FormInput
              hasContent={dirtyFields.username}
              onKeyDown={(e) => handleKeyDown(e, roomRef)}
              placeholder="Username"
              errorsObject={{
                required: "Username is required.",
              }}
              error={errors.username?.message}
              register={register}
              label="username"
            />
            <FormInput
              hasContent={dirtyFields.room}
              onKeyDown={(e) => handleKeyDown(e, passwordRef)}
              placeholder="Room"
              register={register}
              label="room"
              errorsObject={{
                required: "Room code is required.",
                pattern: {
                  value: /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/,
                  message: "Room must contain letters and numbers",
                },
              }}
              error={errors.room?.message}
            />
            <FormInput
              hasContent={dirtyFields.password}
              ref={passwordRef}
              placeholder="Password"
              register={register}
              label="password"
              errorsObject={{
                required: "Password is required.",
              }}
              error={errors.password?.message}
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
