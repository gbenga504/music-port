import React, { forwardRef, useState } from "react";
import classNames from "classnames";

import type { ChangeEventHandler, ReactNode } from "react";
import { RedStarIcon } from "../icons";
import "./index.scss";

interface IProps {
  size?: "medium" | "small";
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
  theme?: "dark" | "white";
  className?: string;
  invisibleLabel?: boolean;
  name?: string;
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
      theme = "dark",
      name,
      className,
      invisibleLabel,
      ...rest
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div className="flex-1">
        {(label || invisibleLabel) && (
          <div
            className={classNames(
              "flex items-start mb-2 min-h-[24px] max-h-[24px]",
              {
                invisible: invisibleLabel,
              }
            )}
          >
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
            small: size === "small",
            medium: size === "medium",
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
            required={required}
            className={classNames({
              textBlack: theme === "dark",
              textWhite: theme === "white",
            })}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...rest}
            disabled={disabled}
            placeholder="Paste playlist link"
            name={name}
          />
        </div>
        {helperText && (
          <p
            className={classNames("mt-2 text-xs", {
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
