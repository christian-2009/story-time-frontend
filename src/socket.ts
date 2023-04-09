import * as io from "socket.io-client";

// const URL =
//   process.env.NODE_ENV === "production" ? undefined : "http://localhost:4000";

export const socket = io.connect("http://localhost:4000");
