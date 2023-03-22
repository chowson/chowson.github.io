import React from 'react';
import { useSiteMetadata } from '../hooks/useSiteMetadata';

type SeoProps = {
  title?: string | undefined | null;
  pathname?: string;
  description?: string;
} & React.PropsWithChildren;

export const SEO = ({ title, description, pathname, children }: SeoProps) => {
  const { title: defaultTitle, siteUrl, description: defaultDescription } = useSiteMetadata();

  const seo = {
    title: title ? `${title} | ${defaultTitle}` : `${defaultTitle} | ${defaultDescription}`,
    image: `${siteUrl}/images/logo.png`,
    url: `${siteUrl}${pathname || ``}`,
  };

  return (
    <>
      <title>{seo.title}</title>
      <meta name="image" content={seo.image} />
      <meta name="theme-color" content="#2F855A" />
      <link rel="icon" href="/favicon.png" />

      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jost:wght@400;700&display=swap" />
      {children}
    </>
  );
};
