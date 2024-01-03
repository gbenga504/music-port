import React from "react";
import { useLocation } from "react-router-dom";

import { doesPathMatch } from "../../../utils/route-utils";
import { constructURL } from "../../../utils/url";
import { ROUTE_IDS } from "../../routes";
import { Button } from "../Button/Button";
import { Drawer } from "../Drawer/Drawer";
import {
  AnimatedHamburgerIcon,
  ArrowSwapIcon,
  DiscoverIcon,
  LinkIcon,
} from "../icons";

interface IProps {
  open: boolean;
  onClose: () => void;
  onClickOpenCreatePlaylistButton: () => void;
}

export const MobileMenu: React.FC<IProps> = ({
  open,
  onClose,
  onClickOpenCreatePlaylistButton,
}) => {
  const { pathname } = useLocation();

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
            to={constructURL({ routeId: ROUTE_IDS.discoverPage })}
            focused={doesPathMatch({
              routeId: ROUTE_IDS.discoverPage,
              pathname,
            })}
            icon={<DiscoverIcon />}
          >
            Discover
          </Button>
        </li>
        <li>
          <Button
            variant="transparent"
            size="large"
            fullWidth
            icon={<ArrowSwapIcon color="#0bb4b5" />}
            onClick={onClickOpenCreatePlaylistButton}
          >
            <span className="flex gap-2 items-center">Create Playlist</span>
          </Button>
        </li>
        <li>
          <Button
            variant="transparent"
            size="large"
            fullWidth
            target="_blank"
            href="https://github.com/gbenga504/music-port"
            icon={<LinkIcon color="#0bb4b5" />}
            onClick={onClose}
          >
            <span className="flex gap-2 items-center">Github</span>
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
      <div className="p-4">
        {renderHeader()}
        {renderBody()}
      </div>
    </Drawer>
  );
};
