import React, { useState, useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import ReactDOM from "react-dom/client";
import Login from "pages/Login";
import StoryTime from "pages/StoryTime";
import "styles/index.scss";
import "styles/components.scss";
import UserContext from "context/UserContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/story-time",
    element: <StoryTime />,
    errorElement: <ErrorPage />,
  },
]);

export default function App() {
  const [username, setUsername] = useState<string>();
  const [room, setRoom] = useState<string>();

  const contextValue = {
    username,
    setUsername,
    room,
    setRoom,
  };

  return (
    <UserContext.Provider value={contextValue}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}
