import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

import "./CardLists.scss";
import { ArrowDownIcon } from "../icons";

import type { ReactNode } from "react";

interface IProps {
  title: string;
  to: string;
  children: ReactNode;
}

export const CardLists = ({ title, to, children }: IProps) => {
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
      <Link to={to} className="flex flex-row items-center mb-3">
        <h2 className="text-base font-bold text-white mr-1">{title}</h2>
        {/* Should be arrow right icon */}
        <ArrowDownIcon className="text-secondary50" />
      </Link>
      <ul
        ref={scrollContainerRef}
        className="grid grid-flow-col gap-5 overflow-x-auto scroll-smooth no-scrollbar"
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
