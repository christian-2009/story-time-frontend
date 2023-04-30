import React, { useContext } from "react";
import { UsernameContextType } from "interfaces";

const StoryContext = React.createContext<UsernameContextType>(
  {} as UsernameContextType
  //   username: "",
  //   setUsername: undefined,
  //   room: "",
  //   setRoom: undefined,
);

export default StoryContext;
