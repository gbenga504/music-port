import React from "react";
import classNames from "classnames";

import type { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  className?: string;
}

export const InputRightElement: React.FC<IProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={classNames("absolute right-0 flex justify-center", className)}
    >
      {children}
    </div>
  );
};
