import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";

import "./ProgressBar.scss";

interface IProps {
  max?: number;
  granularity?: number;
  value?: number;
  valueText?: string;
  onChange?: (newValue: number) => void;
}

export const ProgressBar: React.FC<IProps> = (props) => {
  const { max = 100, granularity = 0, value = 0, valueText, onChange } = props;
  const [canMoveThumb, setCanMoveThumb] = useState(false);
  const thumbRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.addEventListener("mousemove", handleMoveMove);
    document.body.addEventListener("mousedown", handleMouseDown);
    document.body.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.body.removeEventListener("mousemove", handleMoveMove);
      document.body.removeEventListener("mousedown", handleMouseDown);
      document.body.removeEventListener("mouseup", handleMouseUp);
    };
  }, [canMoveThumb]);

  const handleMoveMove = (event: MouseEvent) => {
    if (canMoveThumb && progressBarRef.current && thumbRef.current) {
      const { x: distannceXFromScreenEdge, width: widthOfProgressBar } =
        progressBarRef.current.getBoundingClientRect();

      const thumbXInParentContainer = event.clientX - distannceXFromScreenEdge;
      const newValue = (thumbXInParentContainer / widthOfProgressBar) * max;

      if (newValue > 0 && newValue <= max) {
        return onChange?.(newValue);
      }
    }
  };

  const handleMouseDown = (event: MouseEvent) => {
    if (event.target === thumbRef.current) {
      setCanMoveThumb(true);
    }
  };

  const handleMouseUp = () => {
    setCanMoveThumb(false);
  };

  const percentageProgress = () => {
    return (value / max) * 100;
  };

  const renderVisuallyHiddenLabel = () => {
    return (
      <label className="visually-hidden">
        Change progress
        <input
          type="range"
          min={0}
          max={max}
          step={granularity}
          aria-valuetext={valueText ?? `${value} of ${max}`}
          value={value}
        />
      </label>
    );
  };

  const renderProgressBar = () => {
    return (
      <div
        className="h-full w-full touch-none flex items-center relative main"
        ref={progressBarRef}
      >
        <div className="w-full h-1 rounded-sm bg-secondary100 relative overflow-hidden">
          <div
            className="bg-primary rounded-sm h-1 w-full"
            style={{
              transform: `translateX(calc(-100% + ${percentageProgress()}%))`,
            }}
          />
        </div>
        <div
          className={classNames(
            "thumb absolute z-50 bg-white border-none rounded-full h-3 w-3 -ml-[6px]",
            { "thumb-visible": canMoveThumb }
          )}
          style={{ left: `${percentageProgress()}%` }}
          ref={thumbRef}
        />
      </div>
    );
  };

  return (
    <div className="progressBar h-3">
      {renderVisuallyHiddenLabel()}
      {renderProgressBar()}
    </div>
  );
};
