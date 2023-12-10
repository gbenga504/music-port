import { useState } from "react";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { MobileMenu } from "./MobileMenu";

import useMediaQuery, { screens } from "../../hooks/useMediaQuery";
import { Button } from "../Button/Button";
import { Space } from "../Space";
import { AnimatedHamburgerIcon } from "../icons";

interface IProps {}

export const AppHeader: React.FC<IProps> = () => {
  const matches = useMediaQuery(`(max-width: ${screens.lg})`);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

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
      <Space size="small" className="hidden lg:inline-flex">
        <Button
          variant="contained"
          size="small"
          onClick={() => navigate(`${pathname}?createPlaylist=true`)}
        >
          Create playlist
        </Button>

        <Button
          variant="contained"
          size="small"
          target="_blank"
          href="https://github.com/gbenga504/music-port"
        >
          Github
        </Button>
      </Space>
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
