import classNames from "classnames";
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

import "./CardList.scss";
import { ArrowLeftIcon, ArrowRightIcon } from "../icons";

import type { ReactNode } from "react";

interface IProps {
  title: string;
  to: string;
  children: ReactNode;
}

interface IScrollInfo {
  direction: "Left" | "Right";
  scrollEnd: "Left" | "Right" | null;
  scrollPosition: number;
}

export const CardList = ({ title, to, children }: IProps) => {
  const [scrollInfo, setScrollInfo] = useState<IScrollInfo>({
    direction: "Left",
    scrollEnd: "Left",
    scrollPosition: 0,
  });
  const scrollContainerRef = useRef<HTMLUListElement | null>(null);

  const navigateRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.offsetWidth;
      const cardScrollWidth = scrollContainerRef.current.scrollWidth;
      const newPosition = scrollInfo.scrollPosition + cardWidth;
      const hasReachedRightEnd = newPosition + cardWidth >= cardScrollWidth;

      scrollContainerRef.current.scrollLeft = newPosition;

      setScrollInfo({
        scrollPosition: newPosition,
        direction: "Right",
        scrollEnd: hasReachedRightEnd ? "Right" : null,
      });
    }
  };

  const navigateLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.offsetWidth;
      const newPosition = scrollInfo.scrollPosition - cardWidth;

      scrollContainerRef.current.scrollLeft = newPosition;

      setScrollInfo({
        scrollPosition: newPosition,
        direction: "Left",
        scrollEnd: newPosition <= 0 ? "Left" : null,
      });
    }
  };

  return (
    <section className="cardList">
      <Link to={to} className="flex flex-row items-center mb-3">
        <h2 className="text-base font-bold text-white mr-1">{title}</h2>
        <ArrowRightIcon size={10} color="#EDEDED" />
      </Link>
      <ul
        ref={scrollContainerRef}
        className="grid grid-flow-col gap-5 overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory"
      >
        {children}
      </ul>

      <button
        className={classNames("arrowButton leftArrow", {
          "arrow-hover-visible": scrollInfo.direction === "Right",
          "arrow-visible":
            scrollInfo.scrollEnd === "Right" ||
            (scrollInfo.scrollEnd === null && scrollInfo.direction === "Left"),
        })}
        onClick={navigateLeft}
      >
        <ArrowLeftIcon />
      </button>
      <button
        className={classNames("arrowButton rightArrow", {
          "arrow-hover-visible": scrollInfo.direction === "Left",
          "arrow-visible":
            scrollInfo.scrollEnd === "Left" ||
            (scrollInfo.scrollEnd === null && scrollInfo.direction === "Right"),
        })}
        onClick={navigateRight}
      >
        <ArrowRightIcon />
      </button>
    </section>
  );
};
