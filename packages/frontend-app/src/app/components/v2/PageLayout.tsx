import React from "react";

import { HeadMarkup } from "../HeadMarkup";
import { DesktopSidebar } from "./DesktopSidebar";

interface IProps {
  title: string;
  description?: string;
}

export const PageLayout: React.FC<IProps> = ({ title, description }) => {
  return (
    <div className="mx-0 h-screen grid grid-cols-[260px_4fr]">
      <HeadMarkup title={title} description={description} />
      <div>
        <DesktopSidebar />
      </div>
    </div>
  );
};
