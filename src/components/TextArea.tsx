import React, { useState } from "react";

interface Props {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: any) => void;
  value: string | undefined;
  placeholder: string;
  onSubmit: () => void;
}

export default function TextArea({
  onChange,
  onKeyDown,
  value,
  placeholder,
  onSubmit,
}: Props) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  return (
    <div
      className="text-area-container"
      style={{
        borderBottomColor: isFocused ? "black" : undefined,
      }}
    >
      <textarea
        className="text-area"
        onChange={onChange}
        onSubmit={onSubmit}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={onKeyDown}
        value={value}
      />
      <label className={value ? "active" : ""}>{placeholder}</label>
    </div>
  );
}
