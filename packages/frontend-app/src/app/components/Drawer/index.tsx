import classNames from "classnames";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useSwipeable } from "react-swipeable";

import "./index.scss";
import { sleep } from "../../../utils/sleep";
import useSsr from "../../hooks/useSsr";

import type { TouchEvent, ReactNode } from "react";

interface IProps {
  open: boolean;
  children: ReactNode;
  placement?: "right" | "bottom";
  onClose?: () => void;
  classes?: { contentContainer?: string };
}

const retrieveScrollableNode = (node: HTMLElement): HTMLElement | null => {
  // We want to retrieve the scrollable node in the DOM tree
  // The idea is to run through the dom tree, get the scrollable node and default to the
  // Document node if no scrollable parent nodes are found in time
  // See comment on where this function is used to understand why we need it
  if (node == undefined) {
    return null;
  }

  if ((node as unknown as Document) === document) {
    return node;
  }

  const nodeStyle = window.getComputedStyle(node);

  if (
    node.scrollHeight > node.clientHeight &&
    (nodeStyle.overflow === "auto" ||
      nodeStyle.overflow === "scroll" ||
      nodeStyle.overflowY === "auto" ||
      nodeStyle.overflowY === "scroll")
  ) {
    return node;
  }

  return retrieveScrollableNode(node.parentNode as HTMLElement);
};

export const Drawer: React.FC<IProps> = ({
  children,
  placement = "right",
  open,
  onClose,
  classes = {},
}) => {
  const [hasDrawerBeenAppendedToBody, setHasDrawerBeenAppendedToBody] =
    useState(false);
  const [internallyOpen, setInternallyOpen] = useState(false);
  const [isDrawerOnScreen, setIsDrawerOnScreen] = useState(false);

  const { isBrowser } = useSsr();
  const isSwipeableRef = useRef(true);
  const drawerSwipeableContainerRef = useRef<HTMLDivElement>();
  const portalRef = useRef(isBrowser ? document.createElement("div") : null);

  const handlers = useSwipeable({
    onSwiped: (eventData) => {
      const { deltaY, deltaX, dir } = eventData;
      // We unset the transition property set in style tag here so that
      // the transition set in our scss file can kick in and we can have a smooth
      // drawer movement after swiping
      drawerSwipeableContainerRef.current!.style.transition = "";

      // After swiping, if the drawer placement is bottom,
      // we want to hide the drawer if you scrolled too close to the bottom i.e (deltaY >= window.innerHeight / 2)
      // else we want to show the drawer and translate it to its full length
      if ((dir === "Up" || dir === "Down") && placement === "bottom") {
        if (isSwipeableRef.current && deltaY >= window.innerHeight / 2) {
          onClose?.();
          drawerSwipeableContainerRef.current!.style.transform = `translateY(100%)`;
          // We unset the transform in style here as its used for only swiping
          drawerSwipeableContainerRef.current!.style.transform = "";
        } else {
          drawerSwipeableContainerRef.current!.style.transform = `translateY(0%)`;
        }
      }

      // After swiping, if the drawer placement is right,
      // we want to hide the drawer if you scrolled too close to the right i.e (deltaX >= drawerWidth / 2)
      // else we want to show the drawer and translate it to its full length
      if ((dir === "Left" || dir === "Right") && placement === "right") {
        const { width: drawerWidth } =
          drawerSwipeableContainerRef.current!.getBoundingClientRect();

        if (isSwipeableRef.current && deltaX >= drawerWidth / 2) {
          onClose?.();
          drawerSwipeableContainerRef.current!.style.transform = `translateX(100%)`;
          // We unset the transform in style here as its used for only swiping
          drawerSwipeableContainerRef.current!.style.transform = "";
        } else {
          drawerSwipeableContainerRef.current!.style.transform = `translateX(0%)`;
        }
      }
    },
    onSwiping: (eventData) => {
      const { deltaY, deltaX, dir } = eventData;

      // When swiping, we want to see the visual effect of swipes immediately, hence
      // we set transition to none so we don't have any delayed animation
      drawerSwipeableContainerRef.current!.style.transition = "none";

      // When swiping, if the drawer placement is bottom,
      // and you have not scrolled past the maximum height of the drawer, then
      // we swipe the drawer along with your finger else we do nothing
      if ((dir === "Up" || dir === "Down") && placement === "bottom") {
        if (isSwipeableRef.current && deltaY > 0) {
          drawerSwipeableContainerRef.current!.style.transform = `translateY(${deltaY}px)`;
        } else if (deltaY < 0) {
          // If you are attempting to swipe past the max height then we need to set isSwipeable to false
          // as well as prevent you
          isSwipeableRef.current = false;
          drawerSwipeableContainerRef.current!.style.transform = `translateY(0%)`;
        } else {
          drawerSwipeableContainerRef.current!.style.transform = `translateY(0%)`;
        }
      }

      // When swiping, if the drawer placement is right,
      // and you have not scrolled past the maximum width of the drawer, then
      // we swipe the drawer along with your finger else we do nothing
      if ((dir === "Left" || dir === "Right") && placement === "right") {
        if (isSwipeableRef.current && deltaX > 0) {
          drawerSwipeableContainerRef.current!.style.transform = `translateX(${deltaX}px)`;
        } else if (deltaX < 0) {
          // If you are attempting to swipe past the max width then we need to set isSwipeable to false
          // as well as prevent you
          isSwipeableRef.current = false;
          drawerSwipeableContainerRef.current!.style.transform = `translateX(0%)`;
        } else {
          drawerSwipeableContainerRef.current!.style.transform = `translateX(0%)`;
        }
      }
    },
  });

  useEffect(() => {
    document.body.append(portalRef.current!);
    setHasDrawerBeenAppendedToBody(true);

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

        setIsDrawerOnScreen(true);

        return;
      }

      document.getElementsByTagName("body")[0].style.overflowY = "";

      setIsDrawerOnScreen(false);
      await sleep(500);
      setInternallyOpen(false);
    })();
  }, [open]);

  const refPassthrough = (element: HTMLDivElement) => {
    handlers.ref(element);
    drawerSwipeableContainerRef.current = element;
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    // On touch start, we want to retrieve the scroll parent node in the DOM tree
    // If this node is also a child of the swipeable container and its scroll from the top is
    // not 0, then we assume the user is scrolling and does not want to swipe
    // in every other case, we assume the user is at the very top of the swipeable container
    // and wants to swipe
    isSwipeableRef.current = true;
    const scrollNode = retrieveScrollableNode(e.target as HTMLElement);

    const scrollable =
      !!scrollNode && drawerSwipeableContainerRef.current!.contains(scrollNode);

    isSwipeableRef.current =
      scrollable && scrollNode.scrollTop !== 0 ? false : true;
  };

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
          {...handlers}
          ref={refPassthrough}
          className={classNames(`drawer-contentContainer ${placement}`, {
            open: internallyOpen,
            motion: isDrawerOnScreen,
          })}
        >
          <div
            className={classNames(
              "w-full h-full overflow-auto bg-white pointer-events-auto pb-24 md:pb-0",
              {
                [`${classes.contentContainer}`]: !!classes.contentContainer,
              }
            )}
            onTouchStart={handleTouchStart}
          >
            <div className="flex flex-col w-full h-auto">{children}</div>
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
