interface Props {
  text: string;
  optionalStyles?: React.CSSProperties;
  type?: "button" | "submit" | "reset" | undefined;
}

export default function Button({ text, optionalStyles, type }: Props) {
  return (
    <button className="login-button" style={optionalStyles} type={type}>
      {text}
    </button>
  );
}
