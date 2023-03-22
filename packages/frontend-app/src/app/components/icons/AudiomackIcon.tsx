import React from "react";

interface IProps {
  size?: number;
}

export const AudiomackIcon: React.FC<IProps> = ({ size = 20 }) => {
  return (
    <svg
      style={{ width: size, height: size }}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <circle cx="12" cy="12" r="12" fill="url(#audiomack)" />
      <defs>
        <pattern
          id="audiomack"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_14_1308" transform="scale(0.00444444)" />
        </pattern>
        <image
          id="image0_14_1308"
          width="225"
          height="225"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};
