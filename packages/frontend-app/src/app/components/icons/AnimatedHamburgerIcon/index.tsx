import classNames from "classnames";
import React from "react";

import { Button } from "../../Button/Button";

import type { MouseEventHandler } from "react";

import "./index.scss";

interface IProps {
  open?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
}

export const AnimatedHamburgerIcon: React.FC<IProps> = ({
  open = true,
  onClick,
}) => {
  return (
    <Button variant="transparent" onClick={onClick}>
      <div
        className={classNames("animated-hamburger-icon", {
          open,
        })}
      >
        <span />
        <span />
        <span />
      </div>
    </Button>
  );
};
