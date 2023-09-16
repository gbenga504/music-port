import React from "react";

interface IProps {
  size?: number;
  className?: string;
}

export const ShareIcon: React.FC<IProps> = ({ size = 20, className }) => {
  return (
    <svg
      width={size}
      height={size}
      version="1.1"
      viewBox="0 0 24 24"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={className}
    >
      <g id="info"></g>
      <g id="icons">
        <path
          d="M21.7,10.2l-6.6-6C14.6,3.7,14,4.2,14,5v3c-4.7,0-8.7,2.9-10.6,6.8c-0.7,1.3-1.1,2.7-1.4,4.1   c-0.2,1,1.3,1.5,1.9,0.6C6.1,16,9.8,13.7,14,13.7V17c0,0.8,0.6,1.3,1.1,0.8l6.6-6C22.1,11.4,22.1,10.6,21.7,10.2z"
          id="share"
          style={{ fill: "rgb(255, 255, 255" }}
        />
      </g>
    </svg>
  );
};
