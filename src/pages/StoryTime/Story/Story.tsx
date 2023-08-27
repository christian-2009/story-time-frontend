import { MessagesReceivedType, MessagesType } from 'interfaces';
import React, { useEffect, useState, useContext, useRef } from 'react';
import { socket } from 'socket';
import UserContext from 'context/UserContext';
import Text from 'components/Text';
import { sortMessages } from 'utils';
import Chat from './Chat';
import { motion, useAnimate } from 'framer-motion';
import { flushSync } from 'react-dom';
import useMessages from 'hooks/useMessages';
import StoryContext from 'context/StoryContext';
import { counterTime } from './config';

export default function Story() {
    const { username, room } = useContext(UserContext);
    const firstRender = useRef(true);
    const messagesColumnRef = useRef<HTMLDivElement>(null);
    const { messagesReceived, timerDetail, setTimerDetail } = useMessages({
        messagesColumnRef,
    });
    const [counter, setCounter] = useState(counterTime);

    const [emitMessage, setEmitMessage] = useState<boolean>(false);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        //todo: boot user out of page on refresh
        window.addEventListener('beforeunload', reinitialiseConnection);
        return () => {
            window.removeEventListener('beforeunload', reinitialiseConnection);
        };
    }, []);

    const reinitialiseConnection = () => {
        socket.emit('join_room', { username, room });
    };

    const lowerCaseUsername = username?.toLowerCase() as string;

    const colorOptions = {
        [lowerCaseUsername]: {
            backgroundColor: 'transparent',
            textColor: 'whitesmoke',
            justifyContent: 'flex-end',
        },
        otherName: {
            backgroundColor: 'transparent',
            textColor: '#BABABA',
            justifyContent: 'flex-start',
        },
    };

    useEffect(() => {
        const { startTimer, delay } = timerDetail;
        if (startTimer) {
            if (delay) {
                setTimeout(() => {
                    setCounter(counterTime);
                }, delay);
                setTimerDetail({ ...timerDetail, delay: undefined });
            } else {
                setCounter(counterTime);
            }
        }
    }, [messagesReceived]);

    useEffect(() => {
        if (setCounter && counter && timerDetail.startTimer) {
            const timer =
                counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
            return () => {
                if (timer) clearInterval(timer);
            };
        }
        if (counter === 0) {
            setCounter(counterTime);
        }
    }, [counter, timerDetail]);

    return (
        <div className="story-container">
            <div className="story">
                <div
                    className="story-messages-container"
                    ref={messagesColumnRef}
                    //(el) => {
                    // if (
                    //   !messagesContainerHeight &&
                    //   el?.getBoundingClientRect()?.height
                    // ) {
                    //   setMessagesContainerHeight(el?.getBoundingClientRect()?.height);
                    // }
                >
                    {messagesReceived.map(message => {
                        const colorOption = colorOptions[
                            message.username as keyof typeof colorOptions
                        ]
                            ? colorOptions[
                                  message.username as keyof typeof colorOptions
                              ]
                            : colorOptions.otherName;

                        return (
                            <div
                                className="message"
                                //FUNCTIONALITY TO MOVE THE PAGE
                                // ref={(el) => {
                                //   const currentMessageTopVal = el?.getBoundingClientRect()
                                //     ?.top as number;
                                //   if (
                                //     messagesContainerHeight &&
                                //     currentMessageTopVal >= messagesContainerHeight
                                //   ) {
                                //     if (firstRender.current) {
                                //     }
                                //     setPages((p) => [...p, pages.length + 1]);
                                //     //getting the entire story
                                //     setStory([
                                //       ...story,
                                //       ...messagesReceived.map((m) => m.message),
                                //     ]);
                                //     setMessagesReceived([]);
                                //   }
                                // }}
                            >
                                <div className="message-outer-container">
                                    <div className="message-container">
                                        <Text.BodyLarge
                                            optionalStyles={{
                                                color: colorOption.textColor,
                                                hyphens: 'auto',
                                            }}>
                                            {message.message}
                                        </Text.BodyLarge>
                                    </div>
                                </div>
                                <div className="message-name-time-container">
                                    <Text.SmallText
                                        optionalStyles={{
                                            color: colorOption.textColor,
                                        }}>
                                        {message.username}
                                    </Text.SmallText>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <Chat
                    messagesReceived={messagesReceived}
                    setCounter={setCounter}
                    counter={counter}
                />
            </div>
            {counter && (
                <Text.SansSerif optionalStyles={{ color: 'white' }}>
                    {counter.toString()}
                </Text.SansSerif>
            )}
        </div>
    );
}
