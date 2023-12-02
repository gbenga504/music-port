import classNames from "classnames";
import React from "react";

import "./IconButton.scss";

import type { ReactNode, MouseEventHandler } from "react";

export interface IProps {
  size?: "small" | "medium";
  color?: "primary" | "white" | "brandAlpha";
  variant?: "contained" | "transparent";
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLElement>;
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
    "button-medium": size === "medium",
    "button-primary": color === "primary",
    "button-white": color === "white",
    "button-brandAlpha": color === "brandAlpha",
    "button-contained": variant === "contained",
    "button-transparent": variant === "transparent",
  });

  return (
    <button className={buttonClassName} onClick={onClick}>
      {children}
    </button>
  );
};
