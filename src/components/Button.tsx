import { ReactEventHandler } from "react";

interface Props {
  text: string;
  optionalStyles?: React.CSSProperties;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => any;
}

export default function Button({ text, optionalStyles, type, onClick }: Props) {
  return (
    <button
      className="login-button"
      style={optionalStyles}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
