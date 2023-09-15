import React from "react";
import { Link } from "react-router-dom";

import "./Card.scss";
import { Button } from "../Button/Button";

interface IProps {
  src: string;
  title: string;
  artist: string;
  link: string;
}

export const Card: React.FC<IProps> = ({ src, title, artist, link }) => {
  return (
    <Link to={link} className="w-full">
      <div className="card">
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
            <p className="text-secondary50 text-xs">{title}</p>
          </div>
          <p className="mt-px text-xs text-secondary100">{artist}</p>
        </div>
      </div>
    </Link>
  );
};
