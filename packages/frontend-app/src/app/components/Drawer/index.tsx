import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";

import type { ReactNode, MouseEventHandler } from "react";

import "./index.scss";
import { isDOMLoaded } from "../../../utils/dom";
import { sleep } from "../../../utils/sleep";

interface IProps {
  open: boolean;
  children: ReactNode;
  placement?: "right" | "bottom";
  onClose?: MouseEventHandler<HTMLElement>;
  contentContainerInnerBgColorClassName?: string;
}

export const Drawer: React.FC<IProps> = ({
  children,
  placement = "right",
  open,
  onClose,
  contentContainerInnerBgColorClassName = "bg-white",
}) => {
  const [hasDrawerBeenAppendedToBody, setHasDrawerBeenAppendedToBody] =
    useState(false);
  const [internallyOpen, setInternallyOpen] = useState(false);
  const [isDrawerOnScreen, setIsDrawerOnScreen] = useState(false);
  const portalRef = useRef(
    isDOMLoaded() ? document.createElement("div") : null
  );

  useEffect(() => {
    document.body.appendChild(portalRef.current!);
    setHasDrawerBeenAppendedToBody(true);

    return () => {
      document.getElementsByTagName("body")[0].style.overflow = "";
      document.body.removeChild(portalRef.current!);
    };
  }, []);

  useEffect(() => {
    (async function () {
      if (open) {
        document.getElementsByTagName("body")[0].style.overflow = "hidden";

        setInternallyOpen(true);
        await sleep(100);

        setIsDrawerOnScreen(true);
        return;
      }

      document.getElementsByTagName("body")[0].style.overflow = "";

      setIsDrawerOnScreen(false);
      await sleep(500);
      setInternallyOpen(false);
    })();
  }, [open]);

  const renderDrawer = () => {
    return (
      <div
        className={classNames("drawer", { open: internallyOpen })}
        tabIndex={isDrawerOnScreen ? 0 : -1}
      >
        <div
          className={classNames("drawer-overlay", {
            "drawer-overlay-motion": isDrawerOnScreen,
          })}
          onClick={onClose}
        />
        <div
          className={classNames(`drawer-contentContainer ${placement}`, {
            open: internallyOpen,
            motion: isDrawerOnScreen,
          })}
        >
          <div
            className={`w-full h-full overflow-auto ${contentContainerInnerBgColorClassName} pointer-events-auto`}
          >
            <div className="flex flex-col w-full h-full">{children}</div>
          </div>
        </div>
      </div>
    );
  };

  if (hasDrawerBeenAppendedToBody) {
    return createPortal(renderDrawer(), portalRef.current!);
  }

  return null;
};
