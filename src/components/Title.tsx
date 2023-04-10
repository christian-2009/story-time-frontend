import React from "react";

interface Props {
  optionalPosition?: "absolute" | "relative";
}

export default function Title({ optionalPosition }: Props) {
  return (
    <div style={{ position: optionalPosition ? optionalPosition : undefined }}>
      <h1 className="title">Story Time</h1>
    </div>
  );
}
