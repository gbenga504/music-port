import React from "react";

import type { ReactNode } from "react";

import { Footer } from "./Footer";

interface IProps {
  children: ReactNode;
}

export const PageLayout: React.FC<IProps> = ({ children }) => {
  return (
    <div className="mx-4 md:mx-8 xl:max-w-screen-xl xl:mx-auto">
      <div>{children}</div>
      <Footer />
    </div>
  );
};
