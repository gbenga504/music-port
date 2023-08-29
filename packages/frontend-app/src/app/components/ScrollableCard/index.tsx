import React, { useState, useRef } from "react";

import { Card } from "../Card";
import "./index.scss";

export const ScrollableCard = () => {
  const [hovered, setHovered] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef<HTMLUListElement | null>(null);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setScrollPosition(scrollContainerRef.current.scrollLeft);
    }
  };

  const cardArray = Array.from({ length: 10 }, (_, index) => (
    <Card key={index} src="" title={`Card ${index + 1}`} artist="Burna Boy" />
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
    <section
      className="px-10 relative z-[1]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div>
        <ul
          ref={scrollContainerRef}
          className="list-none p-[15px] grid grid-flow-col gap-5 overflow-x-auto overflow-y-hidden scrollbar"
          onScroll={handleScroll}
        >
          {cardArray}
        </ul>
      </div>
      {/* arrow */}
      <div className="hidden md:block">
        <ul className="list-none">
          <button
            type="button"
            className={`arrowButton pb-8 right-0 top-0 ${
              hovered || scrollPosition > 0 ? "arrowTransition" : "opacity-0"
            } `}
            onClick={navigateRight}
          >
            R
          </button>
          <button
            type="button"
            className={`arrowButton pb-8 left-0 top-0 ${
              hovered && scrollPosition > 0 ? "arrowTransition" : "opacity-0"
            } `}
            onClick={navigateLeft}
          >
            L
          </button>
        </ul>
      </div>
    </section>
  );
};
