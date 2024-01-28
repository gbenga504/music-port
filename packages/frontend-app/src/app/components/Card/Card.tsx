import React from "react";
import { Link } from "react-router-dom";

import "./Card.scss";
import { globals } from "../../../utils/globals";
import useCopyToClipboard from "../../hooks/useCopyToClipboard";
import { IconButton } from "../IconButton/IconButton";
import { LazyImage } from "../LazyImage/LazyImage";
import { useToast } from "../Toast/ToastContext";
import { CopyIcon, PlayIcon } from "../icons";

import type { MouseEventHandler } from "react";

interface IProps {
  src: string;
  title: string;
  owner: string;
  link: string;
  onClickPlay?: MouseEventHandler<HTMLElement>;
}

export const Card: React.FC<IProps> = ({
  src,
  title,
  owner,
  link,
  onClickPlay,
}) => {
  const toast = useToast();
  const [_, copy] = useCopyToClipboard();

  return (
    <Link to={link} className="w-full h-full">
      <div className="card h-full">
        <div className="relative flex-1 h-full">
          <div className="h-full cover__image min-h-[144px] lg:min-h-[204px] bg-secondary100">
            <LazyImage src={src} alt={title} className="cover__image h-full" />
          </div>

          <div className="overlay">
            <IconButton
              onClick={(ev) => {
                ev.preventDefault();
                onClickPlay?.(ev);
              }}
            >
              <PlayIcon size={13} fillColorClassName="fill-white" />
            </IconButton>
            <IconButton
              onClick={(ev) => {
                ev.preventDefault();

                copy(`${globals.getSiteOrigin()}${link}`);
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
            <p className="text-secondary50 text-xs font-light hover:underline">
              {title}
            </p>
          </div>
          <p className="mt-px text-xs text-secondary100 hover:underline">
            {owner}
          </p>
        </div>
      </div>
    </Link>
  );
};
