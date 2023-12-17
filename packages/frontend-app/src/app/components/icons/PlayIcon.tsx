import classNames from "classnames";
import React from "react";

interface IProps {
  size?: number;
  className?: string;
  fillColorClassName?: string;
}

export const PlayIcon: React.FC<IProps> = ({
  size = 20,
  className,
  fillColorClassName = "fill-black",
}) => {
  return (
    <svg
      role="img"
      height={size}
      width={size}
      aria-hidden="true"
      viewBox="0 0 16 16"
      data-encore-id="icon"
      className={classNames(fillColorClassName, className)}
    >
      <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z" />
    </svg>
  );
};
