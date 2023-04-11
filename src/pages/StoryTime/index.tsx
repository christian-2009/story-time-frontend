import React from "react";
import Story from "./Story";
import Users from "./Users";
import Text from "components/Text";

import Text from "components/Text";
import Chat from "./Chat";

export default function () {
  return (
    <div className="container">
      <Text.Title />
      <div className="story-container">
        <Users />
        <div className="story-container-story-chat">
          <Story />
          <Chat />
        </div>
      </div>
    </div>
  );
}
