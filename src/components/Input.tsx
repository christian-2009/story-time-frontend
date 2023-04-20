import React, { ChangeEvent, forwardRef } from "react";

interface Props {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  name: string;
  value: string | undefined;
  placeholder: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ onChange, onKeyDown, name, value, placeholder }, ref) => {
    console.log(`[cs] ref`, ref);
    return (
      <div className="input-container">
        <input
          ref={ref && ref}
          className="login-input"
          name={name}
          onChange={onChange}
          onKeyDown={onKeyDown && onKeyDown}
          value={value}
          type={"text"}
        />
        <label className={value ? "active" : ""}>{placeholder}</label>
      </div>
    );
  }
);

export default Input;
