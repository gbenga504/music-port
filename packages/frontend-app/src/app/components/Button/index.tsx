import React from "react";
import { Link } from "react-router-dom";
import pick from "lodash/pick";
import classNames from "classnames";

import "./index.scss";
import { SpinnerIcon } from "../icons";

import type { ReactNode, MouseEventHandler } from "react";

export interface IProps {
  variant?: "contained" | "text" | "transparent";
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
  focused?: boolean;
  tabIndex?: number;
  rel?: string;
}

const NativeButtonProps = (
  props: IProps
): Pick<
  IProps,
  "disabled" | "onClick" | "children" | "className" | "tabIndex"
> => {
  return pick(props, [
    "disabled",
    "onClick",
    "children",
    "className",
    "tabIndex",
  ]);
};

const NativeAnchorProps = (
  props: IProps
): Pick<
  IProps,
  "href" | "onClick" | "children" | "className" | "target" | "tabIndex" | "rel"
> => {
  return pick(props, [
    "href",
    "onClick",
    "children",
    "className",
    "target",
    "tabIndex",
    "rel",
  ]);
};

const ClientSideLinkProps = (
  props: IProps
): Pick<
  IProps,
  "to" | "onClick" | "children" | "className" | "target" | "tabIndex" | "rel"
> & {
  to: string;
} => {
  return pick(props, [
    "to",
    "onClick",
    "children",
    "className",
    "target",
    "tabIndex",
    "rel",
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
    focused,
  } = props;
  const isButton = !href && !to;

  const buttonClassName = classNames(className, "button", {
    "button-contained": variant === "contained",
    "button-text": variant === "text",
    "button-transparent": variant === "transparent",
    "button-large": size === "large",
    "button-xlarge": size === "x-large",
    "button-medium": size === "medium",
    "button-small": size === "small",
    "button-primary": color === "primary",
    "button-fullWidth": fullWidth === true,
    "button-disabled": disabled === true && isButton,
    "cursor-not-allowed": disabled === true && isButton,
    "button-focused": focused === true,
  });

  if (href) {
    return (
      <a className={classNames(buttonClassName)} {...NativeAnchorProps(props)}>
        <span>{children}</span>
        {variant === "text" && <span className="button-text-decorator" />}
      </a>
    );
  } else if (to) {
    return (
      <Link
        className={classNames(buttonClassName)}
        {...ClientSideLinkProps(props)}
      >
        <span>{children}</span>
        {variant === "text" && <span className="button-text-decorator" />}
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
      {variant === "text" && <span className="button-text-decorator" />}
    </button>
  );
};
