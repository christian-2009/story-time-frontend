import * as io from "socket.io-client";

const URL =
  process.env.NODE_ENV === "production"
    ? "https://story-time-2swz.onrender.com"
    : "http://localhost:4001";

export const socket = io.connect(URL);
