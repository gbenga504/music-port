import React from "react";
import classNames from "classnames";

import type { ChangeEventHandler } from "react";

interface IProps {
  size?: "large" | "medium" | "small";
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
}

export const Input: React.FC<IProps> = ({
  size = "medium",
  fullWidth,
  disabled,
  helperText,
  error,
  ...rest
}) => {
  return (
    <div>
      <input
        className={classNames(
          "focus:shadow-[black_0px_0px_0px_1px_inset] hover:shadow-[black_0px_0px_0px_1px_inset]",
          "rounded-lg border border-solid border-gray-500",
          "outline-none text-black bg-transparent",
          "placeholder:text-placeholder",
          "hover:border-black focus:border-black",
          {
            "h-16 py-1 px-3": size === "large",
            "h-14 py-1 px-2": size === "medium",
            "h-12 py-1 px-1": size === "small",
            "cursor-not-allowed bg-gray-50": disabled === true,
            "w-full": fullWidth === true,
            "focus:shadow-red-600 hover:shadow-red-600 border-red-600":
              error === true,
            "hover:border-red-600 focus:border-red-600": error === true,
          }
        )}
        {...rest}
        disabled={disabled}
      />
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
};
