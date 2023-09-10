import React from "react";

import "./index.scss";
import { Button } from "../Button";
import { Link } from "react-router-dom";

interface IProps {
  src: string;
  title: string;
  artist: string;
  link: string;
}

export const Card: React.FC<IProps> = ({ src, title, artist, link }) => {
  return (
    <Link to={link} className="w-full">
      <div className="card__container">
        <div className="relative">
          <img src={src} alt={title} className="cover__image" />

          <div className="overlay">
            <Button
              size="small"
              className="text-white bg-play hover:bg-primary rounded-50 p-2.5"
            >
              P
            </Button>
            <Button
              size="small"
              className="text-white bg-play hover:bg-primary rounded-50 p-2.5"
            >
              Op
            </Button>
          </div>
        </div>
        <div className="mt-1">
          <div className="flex items-center justify-between">
            <p className="text-title text-xs">{title}</p>
            <div>
              <span className="icon"></span>
            </div>
          </div>
          <p className="mt-px text-xs text-artist">{artist}</p>
        </div>
      </div>
    </Link>
  );
};
