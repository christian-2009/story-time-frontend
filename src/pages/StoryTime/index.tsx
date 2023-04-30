import React from "react";
import Story from "./Story/Story";
import Users from "./Users";
import Text from "components/Text";
import Chat from "./Story/Chat";
import Pages from "./Pages";
import StoryContext from "context/StoryContext";

export default function () {
  return (
    <div className="container">
      <Users />
      <Story />
      <Pages />
    </div>
  );
}
