import React, { useContext } from "react";
import { UsernameContextType } from "interfaces";

const UserContext = React.createContext<UsernameContextType>(
  {} as UsernameContextType
  //   username: "",
  //   setUsername: undefined,
  //   room: "",
  //   setRoom: undefined,
);

export default UserContext;
