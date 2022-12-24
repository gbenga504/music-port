import React, { forwardRef } from "react";
import classNames from "classnames";

import type { ReactNode } from "react";

import { ArrowDownIcon } from "./icons";

interface IProps {
  children: ReactNode;
  size?: "large" | "medium" | "small";
  fullWidth?: boolean;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  className?: string;
  disabled?: boolean;
  value?: string;
}

export const Select = forwardRef<HTMLSelectElement, IProps>(
  (
    {
      children,
      helperText,
      error,
      placeholder,
      className,
      size = "medium",
      disabled,
      fullWidth,
      value,
      ...rest
    },
    ref
  ) => {
    return (
      <div className="w-full">
        <div className="relative">
          <select
            ref={ref}
            className={classNames(
              "rounded-lg border border-solid border-gray-500",
              "outline-none bg-transparent",
              "hover:border-black focus:border-black",
              "text-ellipsis appearance-none relative",
              {
                "text-placeholder": !value,
                "text-black": value,
                "h-16 py-1 px-3": size === "large",
                "h-14 py-1 px-2": size === "medium",
                "h-12 py-1 px-1": size === "small",
                "focus:shadow-[black_0px_0px_0px_1px_inset] hover:shadow-[black_0px_0px_0px_1px_inset]":
                  !disabled,
                "cursor-not-allowed bg-gray-50": disabled === true,
                "w-full": fullWidth === true,
                "focus:shadow-red-600 hover:shadow-red-600 border-red-600":
                  error === true,
                "hover:border-red-600 focus:border-red-600": error === true,
              },
              className
            )}
            value={value}
            {...rest}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {children}
          </select>
          <div className="absolute right-0 top-0 w-8 h-full flex items-center justify-center">
            <ArrowDownIcon color="black" />
          </div>
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
