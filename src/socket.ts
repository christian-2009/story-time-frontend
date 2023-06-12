import * as io from 'socket.io-client';

export const URL =
    process.env.NODE_ENV === 'production'
        ? 'https://story-time-2swz.onrender.com'
        : 'http://localhost:8000';

// const URL = "https://story-time-2swz.onrender.com";

export const socket = io.connect(URL, { transports: ['websocket'] });
