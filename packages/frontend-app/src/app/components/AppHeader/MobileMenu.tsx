import React from "react";

import { constructURL } from "../../../utils/url";
import { routeIds } from "../../routes";
import { Button } from "../Button/Button";
import { Drawer } from "../Drawer/Drawer";
import { AnimatedHamburgerIcon, ConvertIcon, DiscoverIcon } from "../icons";

interface IProps {
  open: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<IProps> = ({ open, onClose }) => {
  const renderHeader = () => {
    return (
      <div className="pb-2 mb-2 border-b-2 border-solid border-secondary100">
        <AnimatedHamburgerIcon open={open} onClick={onClose} />
      </div>
    );
  };

  const renderBody = () => {
    return (
      <ul>
        <li>
          <Button
            variant="transparent"
            size="large"
            fullWidth
            to={constructURL({ routeId: routeIds.discoverPage })}
            focused
          >
            <span className="flex gap-2 items-center">
              <DiscoverIcon size={20} /> Discover
            </span>
          </Button>
        </li>
        <li>
          <Button
            variant="transparent"
            size="large"
            fullWidth
            to={constructURL({
              routeId: routeIds.discoverPage,
            })}
          >
            <span className="flex gap-2 items-center">
              <ConvertIcon size={20} /> Convert
            </span>
          </Button>
        </li>
      </ul>
    );
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      classes={{ contentContainer: "!bg-secondary400" }}
    >
      <div className="p-4 mt-5">
        {renderHeader()}
        {renderBody()}
      </div>
    </Drawer>
  );
};
