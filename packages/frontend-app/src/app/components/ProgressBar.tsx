import React from "react";

export interface IProps {
  value?: number;
  variant?: "determinate" | "indeterminate";
}

export const ProgressBar: React.FC<IProps> = ({
  value = 0,
  variant = "determinate",
}) => {
  const _value = value > 100 ? 100 : value;

  return (
    <div className="w-full h-1 bg-slate-300 relative">
      {variant === "determinate" && (
        <div
          className="bg-black h-1 ease-in-out duration-500"
          style={{ width: `${_value}%` }}
        />
      )}
      {variant === "indeterminate" && (
        <div className="absolute bg-black w-1/2 h-1 animate-linearXMovement" />
      )}
    </div>
  );
};
