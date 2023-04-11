import React from "react";
import Story from "./Story";
import Users from "./Users";
import Text from "components/Text";

export default function () {
  return (
    <div className="container">
      <Text.Title />
      <div className="story-container">
        <Users />
        <Story />
      </div>
    </div>
  );
}
