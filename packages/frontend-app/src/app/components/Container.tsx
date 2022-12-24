import React from "react";
import classNames from "classnames";

import type { ReactNode } from "react";

interface IProps {
  className?: string;
  children: ReactNode;
}

export const Container: React.FC<IProps> = ({ children, className }) => {
  return (
    <div className={classNames("w-11/12 md:w-3/4 m-auto", className)}>
      {children}
    </div>
  );
};
