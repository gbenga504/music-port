import classNames from "classnames";
import React from "react";

interface IProps {
  size?: number;
  className?: string;
}

export const VolumeIcon: React.FC<IProps> = ({ size = 20, className }) => {
  return (
    <svg
      role="presentation"
      height={size}
      width={size}
      aria-hidden="true"
      aria-label="Volume medium"
      id="volume-icon"
      viewBox="0 0 16 16"
      data-encore-id="icon"
      className={classNames("fill-current", className)}
    >
      <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 6.087a4.502 4.502 0 0 0 0-8.474v1.65a2.999 2.999 0 0 1 0 5.175v1.649z" />
    </svg>
  );
};
