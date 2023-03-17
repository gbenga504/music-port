import React from "react";
import classNames from "classnames";

import type { MouseEventHandler } from "react";

interface IProps {
  open?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
}

export const AnimatedHamburgerIcon: React.FC<IProps> = ({
  open = true,
  onClick,
}) => {
  return (
    <button
      className={classNames("appHeader-hamburger", {
        open,
      })}
      onClick={onClick}
    >
      <span />
      <span />
      <span />
    </button>
  );
};
