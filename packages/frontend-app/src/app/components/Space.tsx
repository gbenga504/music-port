import React, { Children, cloneElement, ReactElement } from "react";
import classNames from "classnames";

import type { ReactNode, CSSProperties } from "react";

interface IProps {
  size?: "large" | "medium" | "small";
  children: ReactNode;
  className?: string;
}

const Space: React.FC<IProps> = ({ children, size = "medium", className }) => {
  return (
    <div
      className={classNames(
        "inline-flex items-center",
        {
          "gap-6": size === "large",
          "gap-4": size === "medium",
          "gap-2": size === "small",
        },
        className
      )}
    >
      {children}
    </div>
  );
};

interface ICompactProps {
  style?: CSSProperties;
  className?: string;
  children: ReactElement[];
}

const Compact: React.FC<ICompactProps> = ({ style, className, children }) => {
  const getChildClassName = (index: number): string => {
    if (index === 0) {
      return "!rounded-r-none !border-r-0";
    } else if (index + 1 === Children.count(children)) {
      return "!rounded-l-none !border-l-0";
    }

    return "!rounded-r-none !rounded-r-none !border-r-0 !border-l-0";
  };

  return (
    <div className={classNames("flex", className)} style={style}>
      {Children.map(children, (child, index) =>
        cloneElement(child, {
          className: classNames(
            getChildClassName(index),
            child.props.className
          ),
        })
      )}
    </div>
  );
};

type CompoundComponent = React.FC<IProps> & {
  Compact: typeof Compact;
};

const CompoundSpace = Space as CompoundComponent;
CompoundSpace.Compact = Compact;

export { CompoundSpace as Space };
