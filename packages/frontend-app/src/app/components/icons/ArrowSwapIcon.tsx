import React from "react";

interface IProps {
  size?: number;
  color?: string;
  className?: string;
}

export const ArrowSwapIcon: React.FC<IProps> = ({
  size = 20,
  color = "#ABA6A6",
  className,
}) => {
  return (
    <svg
      viewBox="0 0 18 20"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: size, height: size }}
      className={className}
    >
      <path
        d="M17 15H1M1 15L5 11M1 15L5 19M1 5H17M17 5L13 1M17 5L13 9"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
