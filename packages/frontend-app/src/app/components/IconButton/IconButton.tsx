import classNames from "classnames";
import React from "react";

import "./IconButton.scss";

import type { ReactNode } from "react";

export interface IProps {
  size?: "small";
  color?: "primary" | "white";
  variant?: "contained" | "transparent";
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export const IconButton: React.FC<IProps> = (props) => {
  const {
    size = "small",
    color = "primary",
    variant = "contained",
    children,
    onClick,
    className,
  } = props;

  const buttonClassName = classNames(className, "iconButton", {
    "button-small": size === "small",
    "button-primary": color === "primary",
    "button-white": color === "white",
    "button-contained": variant === "contained",
    "button-transparent": variant === "transparent",
  });

  return (
    <button className={buttonClassName} onClick={onClick}>
      {children}
    </button>
  );
};
