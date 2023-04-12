import { PropsWithChildren } from 'react';
import Head from 'next/head';

import { SeoProps } from './Seo.props';

export const SeoComponent = ({
  title,
  description,
  url,
  image,
}: PropsWithChildren<SeoProps>) => {
  // todo: example image content="https://elementies.art/img/og_img.png"

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={title} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
};
