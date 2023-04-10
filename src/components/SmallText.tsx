interface Props {
  children: string | number;
  color?: string;
}

export default function SmallText({ children, color }: Props) {
  return (
    <h1 className="small" style={{ color }}>
      {children}
    </h1>
  );
}
