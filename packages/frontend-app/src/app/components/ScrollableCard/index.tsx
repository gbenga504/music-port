import React, { useState, useRef } from "react";

import { Card } from "../Card";
import "./index.scss";

export const ScrollableCard = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef<HTMLUListElement | null>(null);

  const cardArray = Array.from({ length: 20 }, (_, index) => (
    <Card key={index} link="" src="" title="" artist="" />
  ));

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
    <section className="scrollable__section">
      <div>
        <ul
          ref={scrollContainerRef}
          className="scrollable__container scrollbar"
        >
          {cardArray}
        </ul>
      </div>

      <div className="hidden md:block">
        <ul className="list-none">
          <button
            type="button"
            className="arrowButton rightArrow"
            onClick={navigateRight}
          >
            R
          </button>
          <button
            type="button"
            className="arrowButton leftArrow"
            onClick={navigateLeft}
          >
            L
          </button>
        </ul>
      </div>
    </section>
  );
};
