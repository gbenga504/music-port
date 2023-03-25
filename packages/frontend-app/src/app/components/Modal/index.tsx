import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";

import type { ReactNode } from "react";
import type { IProps as IButtonProps } from "../Button";

import { Button } from "../Button";
import { isDOMLoaded } from "../../../utils/dom";
import { sleep } from "../../../utils/sleep";
import { CancelIcon } from "../icons";

import "./index.scss";

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
  const [hasModalBeenAppendedToBody, setHasModalBeenAppendedToBody] =
    useState(false);
  const [internallyOpen, setInternallyOpen] = useState(false);
  const [isModalOnScreen, setIsModalOnScreen] = useState(false);
  const portalRef = useRef(
    isDOMLoaded() ? document.createElement("div") : null
  );

  useEffect(() => {
    document.body.appendChild(portalRef.current!);
    setHasModalBeenAppendedToBody(true);

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

        setIsModalOnScreen(true);
        return;
      }

      document.getElementsByTagName("body")[0].style.overflow = "";

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
          <Button variant="transparent" onClick={onClose}>
            <div
              className="h-8 w-8 rounded-full flex items-center justify-center bg-primaryAlpha"
              onClick={onClose}
            >
              <CancelIcon size={12} />
            </div>
          </Button>
        )}
      </div>
    );
  };

  const renderFooter = () => {
    if (!okButton) return null;

    return <Button {...okButton} />;
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
            "w-4/12": width === "md",
            "w-5/12": width === "lg",
          })}
        >
          {renderHeader()}
          {children}
          {renderFooter()}
        </div>
      </div>
    );
  };

  if (hasModalBeenAppendedToBody) {
    return createPortal(renderModal(), portalRef.current!);
  }

  return null;
};
