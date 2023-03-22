import React from "react";

interface IProps {
  size?: number;
  color?: string;
  className?: string;
}

export const ArrowDownIcon: React.FC<IProps> = ({
  size = 20,
  color = "currentColor",
  className,
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      focusable="false"
      style={{ width: size, height: size }}
      className={className}
    >
      <path
        fill={color}
        d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
      ></path>
    </svg>
  );
};
