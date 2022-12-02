import React from "react";
import { Link } from "react-router-dom";
import pick from "lodash/pick";
import classNames from "classnames";

import "./index.scss";
import { SpinnerIcon } from "../icons/SpinnerIcon";

import type { ReactNode, MouseEventHandler } from "react";

interface IProps {
  variant?: "contained" | "text";
  size?: "small" | "medium" | "large" | "x-large";
  htmlType?: "submit" | "button" | "reset";
  href?: string;
  to?: string;
  loading?: boolean;
  target?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
  children?: ReactNode;
  className?: string;
  color?: "primary";
  loadingText?: string;
  fullWidth?: boolean;
}

const NativeButtonProps = (
  props: IProps
): Pick<IProps, "disabled" | "onClick" | "children" | "className"> => {
  return pick(props, ["disabled", "onClick", "children", "className"]);
};

const NativeAnchorProps = (
  props: IProps
): Pick<IProps, "href" | "onClick" | "children" | "className" | "target"> => {
  return pick(props, ["href", "onClick", "children", "className", "target"]);
};

const ClientSideLinkProps = (
  props: IProps
): Pick<IProps, "to" | "onClick" | "children" | "className" | "target"> & {
  to: string;
} => {
  return pick(props, [
    "to",
    "onClick",
    "children",
    "className",
    "target",
  ]) as Pick<IProps, "to" | "onClick" | "children" | "className" | "target"> & {
    to: string;
  };
};

export const Button: React.FC<IProps> = (props) => {
  const {
    href,
    to,
    children,
    className,
    variant = "contained",
    size = "medium",
    color = "primary",
    loading,
    disabled = false,
    htmlType,
    loadingText,
    fullWidth,
  } = props;
  const isButton = !href && !to;

  const buttonClassName = classNames(className, "button", {
    "button-contained": variant === "contained",
    "button-text": variant === "text",
    "button-large": size === "large",
    "button-xlarge": size === "x-large",
    "button-medium": size === "medium",
    "button-small": size === "small",
    "button-primary": color === "primary",
    "button-fullWidth": fullWidth === true,
    "button-disabled": disabled === true && isButton,
    "cursor-not-allowed": disabled === true && isButton,
  });

  if (href) {
    return (
      <a {...NativeAnchorProps(props)} className={buttonClassName}>
        {children}
      </a>
    );
  } else if (to) {
    return (
      <Link {...ClientSideLinkProps(props)} className={buttonClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button
      {...NativeButtonProps(props)}
      className={buttonClassName}
      disabled={loading ? true : disabled}
      type={htmlType}
    >
      {loading ? (
        <>
          <SpinnerIcon />
          <span className="ml-2">{loadingText || "Loading"}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};
