import React from "react";

interface Props {
  subtitle: string;
  optionalStyles?: React.CSSProperties;
}

export default function Subtitle({ subtitle, optionalStyles }: Props) {
  return (
    <div>
      <h1 className="subtitle" style={optionalStyles}>
        {subtitle}
      </h1>
    </div>
  );
}
