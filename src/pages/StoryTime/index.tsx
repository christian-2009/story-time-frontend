import Button from "components/Button";
import Subtitle from "components/Subtitle";
import Title from "components/Title";
import React from "react";
import Story from "./Story";
import Users from "./Users";

export default function () {
  return (
    <div className="container">
      <Title />
      <div className="story-container">
        <Users />
        <Story />
      </div>
    </div>
  );
}
