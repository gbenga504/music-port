import React from "react";

import { AppHeader } from "./AppHeader/AppHeader";
import { DesktopSidebar } from "./DesktopSidebar";

import type { ReactNode } from "react";

interface IProps {
  children?: ReactNode;
}

export const PageLayout: React.FC<IProps> = ({ children }) => {
  return (
    <div
      className={
        "mx-0 h-screen grid grid-cols-1 md:grid-cols-[260px_calc(100vw-260px)]"
      }
    >
      <div className="hidden md:block">
        <DesktopSidebar />
      </div>
      <div>
        <AppHeader />
        <div className="pt-3 md:pt-8 px-3 md:px-10 pb-24">{children}</div>
      </div>
    </div>
  );
};
