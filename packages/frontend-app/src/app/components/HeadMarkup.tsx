import React from "react";
import { Helmet } from "react-helmet";

interface IProps {
  title: string;
  description?: string;
}

export const HeadMarkup: React.FC<IProps> = ({ title, description }) => {
  return (
    <Helmet>
      <title>{title ?? `Music Port`}</title>
      {description && <meta name="description" content={description} />}
    </Helmet>
  );
};
