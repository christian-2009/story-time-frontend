import Button from "components/Button";
import Subtitle from "components/Subtitle";
import Title from "components/Title";
import React from "react";

export default function StoryTime() {
  return (
    <div className="container">
      <Title />
      <div className="story-container">
        <div className="leave">
          <Subtitle subtitle="Users" optionalStyles={{ marginTop: "0.2em" }} />
          <div className="users"></div>
          <Button text="Leave" />
        </div>

        <div className="story"></div>
      </div>
    </div>
  );
}
