import React, { useState } from "react";

import { Button } from "../Button/Button";
import useMediaQuery, { screens } from "../../../hooks/useMediaQuery";
import { AnimatedHamburgerIcon } from "../../icons";
import { MobileMenu } from "./MobileMenu";

interface IProps {}

export const AppHeader: React.FC<IProps> = () => {
  const matches = useMediaQuery(`(max-width: ${screens.lg})`);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderMobileMenuHamburger = () => {
    return (
      <div className="block lg:hidden relative">
        <AnimatedHamburgerIcon
          open={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen(true)}
        />
      </div>
    );
  };

  return (
    <nav className="w-full p-3 bg-secondary200 flex justify-end">
      <div className="hidden lg:block">
        <Button
          variant="contained"
          size="small"
          target="_blank"
          href="https://github.com/gbenga504/music-port"
        >
          Github
        </Button>
      </div>
      {renderMobileMenuHamburger()}
      {matches && (
        <MobileMenu
          open={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
};
