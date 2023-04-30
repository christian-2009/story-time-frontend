import React, { useState } from "react";
interface Props {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: any) => void;
  onKeyUp?: (e: any) => void;
  value: string | undefined;
  placeholder: string;
  onSubmit: () => void;
  optionalClass?: string;
  label?: boolean;
  disabled?: boolean;
}

export default function TextArea({
  onChange,
  onKeyDown,
  value,
  placeholder,
  onSubmit,
  optionalClass,
  label = false,
  disabled = false,
  onKeyUp,
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
        className={`text-area ${optionalClass}`}
        onChange={onChange}
        onSubmit={onSubmit}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        value={value}
        disabled={disabled}
      />
      {label && <label className={value ? "active" : ""}>{placeholder}</label>}
    </div>
  );
}
