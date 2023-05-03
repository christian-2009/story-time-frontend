import * as io from "socket.io-client";

const URL =
  process.env.NODE_ENV === "production"
    ? "https://story-time-backend.vercel.app"
    : "http://localhost:6379";

// const URL = "https://story-time-2swz.onrender.com";

export const socket = io.connect(URL, { transports: ["websocket"] });
