import classNames from "classnames";
import React from "react";

import { IconButton } from "../../IconButton/IconButton";

import type { MouseEventHandler } from "react";

import "./AnimatedHamburgerIcon.scss";

interface IProps {
  open?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
}

export const AnimatedHamburgerIcon: React.FC<IProps> = ({
  open = true,
  onClick,
}) => {
  return (
    <IconButton variant="transparent" size="medium" onClick={onClick}>
      <div
        className={classNames("animated-hamburger-icon", {
          open,
        })}
      >
        <span />
        <span />
        <span />
      </div>
    </IconButton>
  );
};
