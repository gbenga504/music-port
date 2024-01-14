import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";

import "./ProgressBar.scss";
import { usePrevious } from "../../hooks/usePrevious";

interface IProps {
  max?: number;
  granularity?: number;
  value?: number;
  valueText?: string;
  onInput?: (newValue: number) => void;
  onChange?: (newValue: number) => void;
  hideThumb?: boolean;
}

export const ProgressBar: React.FC<IProps> = (props) => {
  const {
    max = 100,
    granularity = 0,
    value = 0,
    valueText,
    onInput,
    onChange,
    hideThumb = false,
  } = props;
  const [canMoveThumb, setCanMoveThumb] = useState(false);
  const thumbRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const previousValue = usePrevious(value);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (canMoveThumb) {
        document.body.style.userSelect = "none";

        return onInput?.(calculteProgressValue(event));
      }
    },
    [onInput, canMoveThumb]
  );

  const handleMouseDown = (event: MouseEvent) => {
    if (event.target === thumbRef.current) {
      setCanMoveThumb(true);
    }
  };

  const handleMouseUp = useCallback(
    (event: MouseEvent) => {
      if (previousValue !== value && canMoveThumb) {
        onChange?.(calculteProgressValue(event));
      }

      document.body.style.userSelect = "auto";
      setCanMoveThumb(false);
    },
    [value, canMoveThumb, onChange]
  );

  useEffect(() => {
    document.body.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mousedown", handleMouseDown);
    document.body.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.body.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mousedown", handleMouseDown);
      document.body.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const calculteProgressValue = (event: MouseEvent): number => {
    if (progressBarRef.current && thumbRef.current) {
      const { x: distannceXFromScreenEdge, width: widthOfProgressBar } =
        progressBarRef.current.getBoundingClientRect();

      const thumbXInParentContainer = event.clientX - distannceXFromScreenEdge;

      const newValue = (thumbXInParentContainer / widthOfProgressBar) * max;

      if (newValue > max) {
        return max;
      }

      if (newValue < 0) {
        return 0;
      }

      return newValue;
    }

    return value;
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
          readOnly
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
        {!hideThumb && (
          <div
            className={classNames(
              "thumb absolute z-50 bg-white border-none rounded-full h-3 w-3 -ml-[6px]",
              { "thumb-visible": canMoveThumb }
            )}
            style={{ left: `${percentageProgress()}%` }}
            ref={thumbRef}
          />
        )}
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
