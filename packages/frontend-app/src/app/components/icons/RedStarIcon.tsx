import React from "react";

interface IProps {
  size?: number;
}

export const RedStarIcon: React.FC<IProps> = ({ size = 20 }) => {
  return (
    <svg
      viewBox="0 0 8 8"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      style={{ width: size, height: size }}
    >
      <path
        d="M4 0L4.89806 2.76393H7.80423L5.45308 4.47214L6.35114 7.23607L4 5.52786L1.64886 7.23607L2.54692 4.47214L0.195774 2.76393H3.10194L4 0Z"
        fill="#FF0000"
      />
    </svg>
  );
};
