import React from "react";

export interface IProps {
  value?: number;
}

export const ProgressBar: React.FC<IProps> = ({ value = 0 }) => {
  const _value = value > 100 ? 100 : value;

  return (
    <div className="w-full h-1 bg-slate-300">
      <div
        className="bg-black h-1 ease-in-out duration-500"
        style={{ width: `${_value}%` }}
      />
    </div>
  );
};
