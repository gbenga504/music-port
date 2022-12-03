import React from "react";

import type { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

export const InputGroup: React.FC<IProps> = ({ children }) => {
  return <div className="flex items-center relative">{children}</div>;
};
