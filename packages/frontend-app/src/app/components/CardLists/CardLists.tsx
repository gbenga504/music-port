import React, { useState, useRef } from "react";

import type { ReactNode } from "react";

import "./CardLists.scss";

interface IProps {
  children?: ReactNode;
}

export const CardLists = ({ children }: IProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef<HTMLUListElement | null>(null);

  const navigateRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.offsetWidth;
      const newPosition = scrollPosition + cardWidth;
      scrollContainerRef.current.scrollLeft = newPosition;
      setScrollPosition(newPosition);
    }
  };

  const navigateLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.offsetWidth;
      const newPosition = scrollPosition - cardWidth;
      scrollContainerRef.current.scrollLeft = newPosition;
      setScrollPosition(newPosition);
    }
  };

  return (
    <section className="cardLists">
      <ul
        ref={scrollContainerRef}
        className="grid grid-flow-col gap-5 overflow-hidden scroll-smooth"
      >
        {children}
      </ul>

      {/* TODO: on hover of CardLists, Right Arrow(R) should be visible on hover
        and when scrolling has not started. When scrolling has started, both Arrows
        should be visible.
        Currently Right Arrow(R) is visible even without hovering on CardLists
        */}
      <button className="arrowButton rightArrow" onClick={navigateRight}>
        R
      </button>
      <button className="arrowButton leftArrow" onClick={navigateLeft}>
        L
      </button>
    </section>
  );
};
