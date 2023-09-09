import React from "react";

import { DiscoverIcon, LogoIcon, ConvertIcon } from "../icons";
import { Button } from "../Button";
import { routeIds } from "../../routes";
import { constructURL } from "../../../utils/url";

export const DesktopSidebar: React.FC = () => {
  return (
    <aside className="px-6 py-4 bg-secondary300 w-full h-full relative border-r-secondary100 border-r">
      <LogoIcon />
      <ul className="mt-5">
        <li>
          <Button
            variant="transparent"
            to={constructURL({ routeId: routeIds.discover })}
            fullWidth
          >
            <span className="flex gap-2 items-center">
              <DiscoverIcon size={20} /> Discover
            </span>
          </Button>
        </li>
        <li>
          <Button
            variant="transparent"
            to={constructURL({ routeId: routeIds.discover })}
            fullWidth
          >
            <span className="flex gap-2 items-center">
              <ConvertIcon size={20} /> Convert
            </span>
          </Button>
        </li>
      </ul>
    </aside>
  );
};
