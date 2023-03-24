import React from "react";

interface IProps {
  size?: number;
}

export const TwitterIcon: React.FC<IProps> = ({ size = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlSpace="preserve"
      version="1.1"
      viewBox="0 0 72 60"
      style={{ width: size, height: size }}
    >
      <image
        width="72"
        height="60"
        xlinkHref="data:image/png;base64,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"
      />
    </svg>
  );
};
