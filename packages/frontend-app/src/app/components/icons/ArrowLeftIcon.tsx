import React from "react";

interface IProps {
  size?: number;
  color?: string;
}

export const ArrowLeftIcon: React.FC<IProps> = ({
  size = 20,
  color = "white",
}) => {
  return (
    <svg
      role="img"
      height="16"
      width="16"
      aria-hidden="true"
      viewBox="0 0 16 16"
      style={{ width: size, height: size, color, fill: "currentcolor" }}
    >
      <path d="M11.03.47a.75.75 0 0 1 0 1.06L4.56 8l6.47 6.47a.75.75 0 1 1-1.06 1.06L2.44 8 9.97.47a.75.75 0 0 1 1.06 0z"></path>
    </svg>
  );
};
