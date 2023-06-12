import { MessagesReceivedType, MessagesType } from 'interfaces';
import React, { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { socket } from 'socket';
import { TimerDetailType, UseMessagesProps } from 'types/StoryTypes';
import { sortMessages } from 'utils';

export default function useMessages({ messagesColumnRef }: UseMessagesProps) {
    const [messagesReceived, setMessagesReceived] = useState<MessagesType[]>(
        [],
    );
    const [timerDetail, setTimerDetail] = useState<TimerDetailType>({
        startTimer: false,
    });

    useEffect(() => {
        socket.on('receive_message', (data: MessagesReceivedType) => {
            flushSync(() => {
                setMessagesReceived(state => [
                    ...state,
                    {
                        message: data.message,
                        username: data.username,
                        __createdtime__: data.__createdtime__,
                    },
                ]);
            });
            messagesColumnRef.current?.lastElementChild?.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
            });
        });

        return () => {
            socket.off('receive_message');
        };
    }, [socket]);

    useEffect(() => {
        socket.on('timer', (data: TimerDetailType) => {
            console.log('data', data);
            setTimerDetail({ ...timerDetail, ...data });
        });

        return () => {
            socket.off('timer');
        };
    }, [socket]);

    useEffect(() => {
        socket.on('last_100_messages', (data: string) => {
            const last100Messages = JSON.parse(data);
            const sortedData = sortMessages(last100Messages);
            setMessagesReceived([...sortedData, ...messagesReceived]);
        });

        // Remove event listener on component unmount
        return () => {
            socket.off('last_100_messages');
        };
    }, [socket]);

    return {
        messagesReceived,
        timerDetail,
        setTimerDetail,
    };
}
