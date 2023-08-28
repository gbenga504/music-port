import React, { useState } from "react";

import "./index.scss";

interface IProps {
  src: string;
  title: string;
  artist: string;
}

export const Card: React.FC<IProps> = ({
  src,
  title = "I told them...",
  artist = "Burna Boy",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="flex flex-col cursor-pointer w-[214px]"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <div className="relative">
        <img
          src={src || "public/images/burna.jpeg"}
          alt={title}
          width={214}
          height={214}
        />
        {isHovered && (
          <div className="overlay">
            <div className="overlay-content">
              <button className="text-white text-sm">play</button>
              <button className="text-white text-sm">options</button>
            </div>
          </div>
        )}
      </div>
      <div className="mt-1">
        <div className="flex items-center justify-between">
          <p className="text-[#ffffffeb] text-xs">{title}</p>
          <div>
            <span role="img">
              <svg
                className="fill-white"
                viewBox="0 0 9 9"
                width={9}
                height={9}
                aria-hidden="true"
              >
                <path d="M3.9 7h1.9c.4 0 .7-.2.7-.5s-.3-.4-.7-.4H4.1V4.9h1.5c.4 0 .7-.1.7-.4 0-.3-.3-.5-.7-.5H4.1V2.9h1.7c.4 0 .7-.2.7-.5 0-.2-.3-.4-.7-.4H3.9c-.6 0-.9.3-.9.7v3.7c0 .3.3.6.9.6zM1.6 0h5.8C8.5 0 9 .5 9 1.6v5.9C9 8.5 8.5 9 7.4 9H1.6C.5 9 0 8.5 0 7.4V1.6C0 .5.5 0 1.6 0z"></path>
              </svg>
            </span>
          </div>
        </div>
        <p className="mt-px text-xs text-[#ffffffa3]">{artist}</p>
      </div>
    </div>
  );
};
