import React from "react";
import classNames from "classnames";

import type { ReactNode } from "react";

interface IProps {
  size?: "large" | "medium" | "small";
  children: ReactNode;
}

export const Space: React.FC<IProps> = ({ children, size = "medium" }) => {
  return (
    <div
      className={classNames("inline-flex items-center", {
        "gap-6": size === "large",
        "gap-4": size === "medium",
        "gap-2": size === "small",
      })}
    >
      {children}
    </div>
  );
};
