import React from "react";

import { ProgressBar } from "../ProgressBar/ProgressBar";

interface IProps {
  totalDuration: number;
  currentDuration: number;
  isMobile?: boolean;
  onInput: (duration: number) => void;
  onChange: (duration: number) => void;
}

export const SongDurationSlider: React.FC<IProps> = ({
  totalDuration,
  currentDuration,
  isMobile,
  onInput,
  onChange,
}) => {
  return (
    <ProgressBar
      max={totalDuration}
      value={currentDuration}
      hideThumb={isMobile}
      onInput={onInput}
      onChange={onChange}
    />
  );
};
