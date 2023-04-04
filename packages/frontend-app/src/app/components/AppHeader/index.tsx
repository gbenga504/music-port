import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { Button } from "../../components/Button";
import { Space } from "../../components/Space";
import { constructURL } from "../../../utils/url";
import { routeIds } from "../../routes";
import { LogoIcon } from "../icons";
import { doesPathMatch } from "../../../utils/routeUtils";
import { MobileMenu } from "./MobileMenu";
import { AnimatedHamburgerIcon } from "../icons";
import useMediaQuery, { screens } from "../../hooks/useMediaQuery";

interface IProps {}

export const AppHeader: React.FC<IProps> = () => {
  const { pathname } = useLocation();
  const matches = useMediaQuery(`(max-width: ${screens.lg})`);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderMobileMenuHamburger = () => {
    return (
      <Space className="block lg:hidden relative">
        <AnimatedHamburgerIcon
          open={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen(true)}
        />
      </Space>
    );
  };

  return (
    <div className="w-full">
      <nav className="pt-10 lg:pt-14 w-full flex justify-between items-center">
        <Link to={constructURL({ routeId: routeIds.home })}>
          <LogoIcon />
        </Link>
        <Space size="large" className="hidden lg:inline-flex">
          <Button
            variant="text"
            size="medium"
            focused={doesPathMatch({ routeId: routeIds.home, pathname })}
            to={constructURL({ routeId: routeIds.home })}
          >
            Home
          </Button>
          <Button
            variant="text"
            size="medium"
            focused={doesPathMatch({ routeId: routeIds.community, pathname })}
            to={constructURL({ routeId: routeIds.community })}
          >
            Community playlist
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
    </div>
  );
};
