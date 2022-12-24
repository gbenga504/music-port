import React from "react";

import type { ReactNode } from "react";

interface IProps {
  title: string;
  description: string;
  children: ReactNode;
}

export const PageLayout: React.FC<IProps> = ({
  children,
  title,
  description,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between">
      <div className="w-full md:w-2/5">
        <h4 className="font-medium text-3xl md:text-5xl text-title">{title}</h4>
        <p className="mt-3 md:mt-8 block">{description}</p>
      </div>
      <div className="mt-8 md:mt-0 w-full md:w-2/4">{children}</div>
    </div>
  );
};
