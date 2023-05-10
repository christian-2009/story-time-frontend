import React, {
  ChangeEvent,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { FormInputType } from "interfaces";
import {
  Path,
  UseFormRegister,
  FieldErrors,
  RegisterOptions,
} from "react-hook-form";
import Text from "./Text";

interface Props {
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  hasContent: boolean | undefined;
  placeholder?: string;
  error?: string;
  register: UseFormRegister<FormInputType>;
  label: Path<FormInputType>;
  errorsObject?: RegisterOptions<FormInputType>;
}

const FormInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      onKeyDown,
      hasContent,
      placeholder,
      error,
      register,
      label,
      errorsObject,
    },
    ref
  ) => {
    return (
      <div>
        <div className="input-container form-input">
          <input
            className="login-input"
            onKeyDown={onKeyDown && onKeyDown}
            type={"text"}
            {...register(label, { ...errorsObject })}
          />
          <label className={hasContent ? "active" : ""}>{placeholder}</label>
        </div>
        {error && (
          <Text.ErrorText
            optionalStyles={{ alignSelf: "flex-start", marginTop: 4 }}
          >
            {error}
          </Text.ErrorText>
        )}
      </div>
    );
  }
);

export default FormInput;
