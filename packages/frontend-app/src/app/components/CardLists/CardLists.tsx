import React, { useState, useRef } from "react";

import "./CardLists.scss";

interface IProps {
  children?: React.ReactNode;
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
    <section className="cardlists__section">
      <div>
        <ul ref={scrollContainerRef} className="cardlists__container scrollbar">
          {children}
        </ul>
      </div>

      <div className="hidden md:block">
        {/* TODO: on hover of CardLists, Right Arrow(R) should be visible on hover
        and when scrolling has not started. When scrolling has started, both Arrows
        should be visible.
        Currently Right Arrow(R) is visible even without hovering on CardLists
        */}
        <ul className="list-none">
          {/* I'm stilling using <button> because on hover of the icon we don't
            want a primary background(IconButton is not an option)
            Button Component is forcing bg-primary and height is not good with our
            CardLists component.
            */}
          <button
            className="arrowButton hover:bg-transparent rightArrow"
            onClick={navigateRight}
          >
            {/* I'm still not so comfortable with the style for Icon,
            The only good thing I see now is we don't need to install
            an extra package, but I thought downloading an SVG for this 
            is cool.
            */}
            R
          </button>
          <button className="arrowButton leftArrow" onClick={navigateLeft}>
            L
          </button>
        </ul>
      </div>
    </section>
  );
};
