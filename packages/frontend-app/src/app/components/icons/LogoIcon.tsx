import React from "react";

interface IProps {}

export const LogoIcon: React.FC<IProps> = () => {
  return (
    <div className="flex items-center gap-1">
      <img src="/public/images/white-logo.png" className="w-7" />
      <span className="font-normal text-xl text-secondary50">Port</span>
    </div>
  );
};
