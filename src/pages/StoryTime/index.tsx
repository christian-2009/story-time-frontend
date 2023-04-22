import React from "react";
import Story from "./Story";
import Users from "./Users";
import Text from "components/Text";
import Chat from "./Chat";
import Pages from "./Pages";

export default function () {
  return (
    <div className="container">
      {/* <Text.Title /> */}

      {/* <div className="story-container-flex"> */}

      <Users />

      {/* <div className="story-container-story-chat"> */}
      <Story />
      {/* <Chat /> */}
      {/* </div> */}
      <Pages />
    </div>
    // </div>
  );
}
