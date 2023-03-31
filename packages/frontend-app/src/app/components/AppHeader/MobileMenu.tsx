import React from "react";

import { Drawer } from "../Drawer";
import { AnimatedHamburgerIcon } from "../icons";
import { Button } from "../Button";

interface IProps {
  open: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<IProps> = ({ open, onClose }) => {
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
          <Button variant="transparent" size="large" fullWidth to="#">
            Community playlist
          </Button>
        </li>
        <li>
          <Button variant="transparent" size="large" fullWidth to="#">
            Pricing
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
