import React from "react";
import { Helmet } from "react-helmet";

interface IProps {
  title: string;
  description?: string;
  ogTitle?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogUrl?: string;
}

export const HeadMarkup: React.FC<IProps> = ({
  title,
  description,
  ogTitle,
  ogImage,
  ogImageAlt,
  ogUrl,
}) => {
  if (ogImage && !ogImageAlt) {
    throw new Error(
      "The ogImageAlt prop must be passed when the ogImage prop is passed"
    );
  }

  return (
    <Helmet>
      <title>{ogTitle ?? title}</title>
      <meta property="og:title" content={`${ogTitle ?? title} - Musicport`} />
      {description && <meta name="description" content={description} />}
      {description && <meta property="og:description" content={description} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogImageAlt && <meta property="og:image:alt" content={ogImageAlt} />}
      {ogUrl && <meta property="og:url" content={ogUrl} />}
    </Helmet>
  );
};
