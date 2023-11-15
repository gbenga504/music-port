import React from "react";

type IProps = React.ImgHTMLAttributes<HTMLImageElement>;

export const LazyImage = (props: IProps) => {
  return <img {...props} loading="lazy" />;
};
