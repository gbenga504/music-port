import classNames from "classnames";
import React, { forwardRef, useState } from "react";

import { RedStarIcon } from "../icons";

import type { ChangeEventHandler, ReactNode } from "react";
import "./Input.scss";

interface IProps {
  size?: "medium" | "large";
  variant?: "dashed" | "outlined";
  onChange?: ChangeEventHandler<HTMLInputElement>;
  type?: string;
  value?: string;
  maxLength?: number;
  disabled?: boolean;
  defaultValue?: string;
  placeholder?: string;
  fullWidth?: boolean;
  error?: boolean;
  helperText?: string;
  prefix?: ReactNode;
  label?: string;
  required?: boolean;
  textColor?: "black" | "white";
  className?: string;
  name?: string;
  onBlur?: () => void;
  onFocus?: () => void;
}

export const Input = forwardRef<HTMLInputElement, IProps>(
  (
    {
      size = "medium",
      fullWidth,
      disabled,
      helperText,
      error,
      prefix,
      variant = "outlined",
      label,
      required,
      textColor = "black",
      name,
      className,
      onFocus,
      onBlur,
      ...rest
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div
        className={classNames("relative", {
          "flex-1": fullWidth,
        })}
      >
        {label && (
          <div className={classNames("flex items-start mb-2")}>
            <label htmlFor={name} className="text-primaryGray">
              {label}
            </label>
            {required && (
              <span className="ml-1">
                <RedStarIcon size={10} />
              </span>
            )}
          </div>
        )}
        <div
          className={classNames("input", {
            fullWidth,
            medium: size === "medium",
            large: size === "large",
            outlined: variant === "outlined",
            dashed: variant === "dashed",
            disabled,
            error,
            focused: isFocused,
            [`${className}`]: className,
          })}
        >
          {prefix && <div className="mr-3">{prefix}</div>}
          <input
            ref={ref}
            className={classNames({
              textBlack: textColor === "black",
              textWhite: textColor === "white",
            })}
            onFocus={() => {
              onFocus?.();
              setIsFocused(true);
            }}
            onBlur={() => {
              onBlur?.();
              setIsFocused(false);
            }}
            {...rest}
            disabled={disabled}
            name={name}
          />
        </div>
        {helperText && (
          <p
            className={classNames("mt-2 text-xs absolute", {
              "text-red-600": error === true,
            })}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
