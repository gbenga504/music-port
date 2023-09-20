import React from "react";
import { Link } from "react-router-dom";

import "./Card.scss";
import useCopyToClipboard from "../../hooks/useCopyToClipboard";
import { IconButton } from "../IconButton/IconButton";
import { useToast } from "../Toast/ToastContext";
import { CopyIcon, PlayIcon } from "../icons";

interface IProps {
  src: string;
  title: string;
  artist: string;
  link: string;
}

export const Card: React.FC<IProps> = ({ src, title, artist, link }) => {
  const toast = useToast();
  const [_, copy] = useCopyToClipboard();

  return (
    <Link to={link} className="w-full">
      <div className="card">
        <div className="relative">
          <img src={src} alt={title} className="cover__image" />

          <div className="overlay">
            <IconButton>
              <PlayIcon size={13} className="ml-1" />
            </IconButton>
            <IconButton
              onClick={() => {
                copy(link as string);
                toast({
                  title: "Link copied to clipboard",
                  status: "info",
                  position: "top",
                });
              }}
            >
              <CopyIcon size={13} />
            </IconButton>
          </div>
        </div>
        <div className="mt-1">
          <div className="flex items-center justify-between">
            <p className="text-secondary50 text-xs font-light">{title}</p>
          </div>
          <p className="mt-px text-xs text-secondary100">{artist}</p>
        </div>
      </div>
    </Link>
  );
};
