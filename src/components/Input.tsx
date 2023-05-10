import React, { ChangeEvent, forwardRef } from "react";
import Text from "./Text";

interface Props {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  name?: string;
  value: string | undefined;
  placeholder?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ onChange, onKeyDown, name, value, placeholder, error }, ref) => {
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
        {error && (
          <Text.ErrorText
            optionalStyles={{ alignSelf: "flex-start", marginTop: 2 }}
          >
            {error}
          </Text.ErrorText>
        )}
      </div>
    );
  }
);

export default Input;
