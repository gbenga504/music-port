import React from "react";

interface IProps {
  size?: number;
}

export const AudiomackIcon: React.FC<IProps> = ({ size = 20 }) => {
  return (
    <svg
      style={{ width: size, height: size }}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlSpace="preserve"
      version="1.1"
      viewBox="0 0 72 72"
    >
      <image
        width="72"
        height="72"
        xlinkHref="data:image/png;base64,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"
      />
    </svg>
  );
};
