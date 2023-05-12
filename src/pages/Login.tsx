import React, {
    ChangeEvent,
    FormEvent,
    KeyboardEvent,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import UserContext from 'context/UserContext';
import { socket, URL } from 'socket';
import { useNavigate } from 'react-router-dom';
import Text from 'components/Text';
import Input from 'components/Input';
import { Errors, FormInputType } from 'interfaces';
import { useForm } from 'react-hook-form';
import FormInput from 'components/FormInput';
import axios from 'axios';
import Button from 'components/Button';

function Login() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        getValues,
        setError,
        formState: { dirtyFields, errors },
    } = useForm<FormInputType>({
        defaultValues: { username: '', password: '', room: '' },
    });
    const passwordRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { username, setUsername, room, setRoom } = useContext(UserContext);

    useEffect(() => {
        if (setRoom) setRoom('');
    }, []);

    const joinRoom = async (data: any) => {
        setLoading(true);
        const { username, room, password } = data;
        if (setUsername) setUsername(username);
        if (setRoom) setRoom(room);

        const errorArray = Object.keys(errors);

        if (errorArray?.length === 0 && room && username && password) {
            try {
                await axios.get(`${URL}/${room}/${password}`);
            } catch (e) {
                setError('password', {
                    type: 'custom',
                    message: 'Password incorrect',
                });
                throw e;
            }

            try {
                socket.emit('join_room', { username, room, password });
            } catch (e) {
                throw e;
            }

            if (errorArray?.length === 0) {
                navigate('/story-time');
            }
            setLoading(false);
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
                            color: 'black',
                            whiteSpace: 'pre-wrap',
                        }}>
                        {loginIntroText}
                    </Text.Body>
                    <form
                        style={{ width: '100%' }}
                        onSubmit={handleSubmit(joinRoom)}>
                        <FormInput
                            hasContent={dirtyFields.username}
                            placeholder="Username"
                            errorsObject={{
                                required: 'Username is required.',
                            }}
                            error={errors.username?.message}
                            register={register}
                            label="username"
                        />
                        <FormInput
                            hasContent={dirtyFields.room}
                            placeholder="Room"
                            register={register}
                            label="room"
                            errorsObject={{
                                required: 'Room code is required.',
                                pattern: {
                                    value: /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/,
                                    message:
                                        'Room must contain letters and numbers',
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
                                required: 'Password is required.',
                            }}
                            error={errors.password?.message}
                        />

                        <Button text="Join" type="submit" disabled={loading} />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
