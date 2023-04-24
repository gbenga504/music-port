import React, { useEffect, useState } from "react";
import classNames from "classnames";

import {
  CircularCheckedIcon,
  CircularInfoIcon,
  CircularWarningIcon,
  CloseIcon,
} from "../icons";
import { sleep } from "../../../utils/sleep";

export interface IToastSettings {
  title?: string;
  description?: string;
  status?: "success" | "error" | "warning" | "info";
  id?: string;
  duration?: number;
  position?:
    | "top"
    | "top-left"
    | "top-right"
    | "bottom"
    | "bottom-left"
    | "bottom-right";
}

interface IToastProps extends IToastSettings {
  onClose: () => void;
}

export const Toast: React.FC<IToastProps> = ({
  title,
  description,
  status = "info",
  duration = 3000,
  id,
  position = "bottom",
  onClose,
}) => {
  const shouldToastBePlacedInTopSection =
    position === "top" || position === "top-left" || position === "top-right";
  const [isToastVisible, setIsToastVisible] = useState(false);

  useEffect(() => {
    setIsToastVisible(true);
  }, []);

  useEffect(() => {
    const durationTimerRef = setTimeout(() => {
      handleCloseToast();
    }, duration);

    return () => {
      clearTimeout(durationTimerRef);
    };
  }, [id]);

  const getToastIcon = () => {
    switch (status) {
      case "success":
        return <CircularCheckedIcon />;
      case "info":
        return <CircularInfoIcon />;
      default:
        return <CircularWarningIcon />;
    }
  };

  const handleCloseToast = async () => {
    setIsToastVisible(false);
    await sleep(500);

    onClose();
  };

  return (
    <div
      className={classNames("absolute w-screen left-0 p-1 flex z-[10000]", {
        "top-0": shouldToastBePlacedInTopSection,
        "bottom-0": !shouldToastBePlacedInTopSection,
        "justify-center": position === "top" || position === "bottom",
        "justify-start": position === "top-left" || position === "bottom-left",
        "justify-end": position === "top-right" || position === "bottom-right",
      })}
    >
      <div className="max-w-[560px] min-w-[300px] m-2 pointer-events-auto">
        <div
          className={classNames(
            "flex relative overflow-hidden w-auto",
            "items-start py-3 pl-4 pr-8 text-white",
            "transition-all duration-500 rounded-md",
            {
              "bg-green-600": status === "success",
              "bg-red-600": status === "error",
              "bg-orange-600": status === "warning",
              "bg-blue-600": status === "info",
            },
            {
              "opacity-100": isToastVisible,
              "opacity-0": !isToastVisible,
            }
          )}
        >
          <span className="flex-shrink-0 w-5 h-6 mr-3">{getToastIcon()}</span>
          <div className="max-w-full">
            {title && <h6 className="font-medium text-base">{title}</h6>}
            {description && (
              <p className="text-base font-light">{description}</p>
            )}
          </div>
          <button
            type="button"
            aria-label="close"
            onClick={handleCloseToast}
            className={classNames(
              "absolute flex items-center justify-center right-1 top-1 w-6 h-6",
              "hover:bg-blackAlpha-100 rounded-md transition-all duration-200"
            )}
          >
            <CloseIcon size={10} />
          </button>
        </div>
      </div>
    </div>
  );
};
