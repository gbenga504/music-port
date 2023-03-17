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

interface IProps {}

export const AppHeader: React.FC<IProps> = () => {
  const { pathname } = useLocation();
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
            target="blank"
            focused={doesPathMatch({ routeId: routeIds.home, pathname })}
            to="#"
          >
            Home
          </Button>
          <Button variant="text" size="medium" target="blank" to="#">
            Community playlist
          </Button>
          <Button variant="text" size="medium" target="blank" to="#">
            Pricing
          </Button>
        </Space>
        {renderMobileMenuHamburger()}
        <MobileMenu
          open={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      </nav>
    </div>
  );
};
