import classNames from "classnames";
import React from "react";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

import { sleep } from "../../../utils/sleep";
import "./Modal.scss";
import useMediaQuery, { screens } from "../../hooks/useMediaQuery";
import useSsr from "../../hooks/useSsr";
import { Button } from "../Button/Button";
import { Drawer } from "../Drawer/Drawer";
import { IconButton } from "../IconButton/IconButton";
import { CancelIcon } from "../icons";

import type { IProps as IButtonProps } from "../Button/Button";
import type { ReactNode } from "react";

interface IProps {
  title?: string;
  okButton?: IButtonProps;
  onClose?: () => void;
  open?: boolean;
  closable?: boolean;
  width?: "md" | "lg";
  children: ReactNode;
}

export const Modal: React.FC<IProps> = ({
  title,
  okButton,
  onClose,
  open = false,
  closable = true,
  width = "md",
  children,
}) => {
  const matches = useMediaQuery(`(max-width: ${screens.lg})`);
  const [hasModalBeenAppendedToBody, setHasModalBeenAppendedToBody] =
    useState(false);
  const [internallyOpen, setInternallyOpen] = useState(false);
  const [isModalOnScreen, setIsModalOnScreen] = useState(false);
  const { isBrowser } = useSsr();
  const portalRef = useRef(isBrowser ? document.createElement("div") : null);

  useEffect(() => {
    document.body.append(portalRef.current!);
    setHasModalBeenAppendedToBody(true);

    return () => {
      document.getElementsByTagName("body")[0].style.overflowY = "";
      portalRef.current!.remove();
    };
  }, []);

  useEffect(() => {
    (async function () {
      if (open) {
        document.getElementsByTagName("body")[0].style.overflowY = "hidden";

        setInternallyOpen(true);
        await sleep(100);

        setIsModalOnScreen(true);

        return;
      }

      document.getElementsByTagName("body")[0].style.overflowY = "";

      setIsModalOnScreen(false);
      await sleep(500);
      setInternallyOpen(false);
    })();
  }, [open]);

  const renderHeader = () => {
    return (
      <div className="grid grid-cols-autoRepeat2 justify-between">
        <h3 className="text-2xl text-black font-bold">{title ?? title}</h3>
        {closable && (
          <IconButton color="brandAlpha" onClick={onClose}>
            <CancelIcon size={12} />
          </IconButton>
        )}
      </div>
    );
  };

  const renderFooter = () => {
    if (!okButton) return null;

    return (
      <div className="w-full">
        <Button {...okButton} />
      </div>
    );
  };

  const renderModal = () => {
    return (
      <div
        className={classNames("modal", { open: internallyOpen })}
        tabIndex={isModalOnScreen ? 0 : -1}
      >
        <div
          className={classNames("modal-overlay", {
            "modal-overlay-motion": isModalOnScreen,
          })}
          onClick={onClose}
        />
        <div
          className={classNames("modal-contentContainer", {
            open: internallyOpen,
            motion: isModalOnScreen,
            "lg:w-6/12 xl:w-4/12": width === "md",
            "lg:w-7/12 xl:w-5/12": width === "lg",
          })}
        >
          {renderHeader()}
          {children}
          {renderFooter()}
        </div>
      </div>
    );
  };

  if (matches) {
    return (
      <Drawer
        open={open}
        placement="bottom"
        classes={{ contentContainer: "!bg-white rounded-t-md p-4" }}
        onClose={onClose}
      >
        {renderHeader()}
        {children}
        {renderFooter()}
      </Drawer>
    );
  }

  if (hasModalBeenAppendedToBody) {
    return createPortal(renderModal(), portalRef.current!);
  }

  return null;
};
