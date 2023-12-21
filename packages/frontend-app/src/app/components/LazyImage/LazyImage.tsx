import classNames from "classnames";
import React, { useState, useRef, useEffect } from "react";

type IProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  className?: string;
  src: string;
};

export const LazyImage = ({ className, src: srcFromProp, ...rest }: IProps) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [hasImageLoaded, setHasImageLoaded] = useState(false);

  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.addEventListener("load", function () {
        setHasImageLoaded(true);
      });

      imageRef.current.src = srcFromProp;
    }
  }, []);

  return (
    <img
      {...rest}
      ref={imageRef}
      loading="lazy"
      className={classNames(className, {
        "opacity-0": !hasImageLoaded,
      })}
    />
  );
};
