import React from "react";
import { useLocation } from "react-router-dom";

import { Drawer } from "../Drawer";
import { AnimatedHamburgerIcon } from "../icons";
import { Button } from "../Button";
import { constructURL } from "../../../utils/url";
import { routeIds } from "../../routes";
import { doesPathMatch } from "../../../utils/route-utils";

interface IProps {
  open: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<IProps> = ({ open, onClose }) => {
  const { pathname } = useLocation();

  const renderHeader = () => {
    return (
      <div className="pb-6 border-b-2 border-solid border-secondaryAlpha">
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
            to={constructURL({ routeId: routeIds.home })}
            focused={doesPathMatch({ routeId: routeIds.home, pathname })}
          >
            Home
          </Button>
        </li>
        <li>
          <Button
            variant="transparent"
            size="large"
            fullWidth
            to={constructURL({
              routeId: routeIds.community,
            })}
            focused={doesPathMatch({
              routeId: routeIds.community,
              pathname,
            })}
          >
            Community playlist
          </Button>
        </li>
      </ul>
    );
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      classes={{ contentContainer: "!bg-secondary" }}
    >
      <div className="p-4 mt-5">
        {renderHeader()}
        {renderBody()}
      </div>
    </Drawer>
  );
};
