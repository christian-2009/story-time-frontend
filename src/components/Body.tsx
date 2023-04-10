interface Props {
  children: string;
  color?: string;
}

export default function Body({ children, color }: Props) {
  return (
    <h1 className="body" style={{ color }}>
      {children}
    </h1>
  );
}
