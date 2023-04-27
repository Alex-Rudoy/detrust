import { PropsWithChildren } from 'react';
import Head from 'next/head';

import { SeoProps } from './Seo.types';

export const SeoComponent = ({
  title,
  description,
  url,
  image,
}: PropsWithChildren<SeoProps>) => {
  const fallbackUrl = typeof window === 'undefined' ? '' : window.location.href;
  const fallbackImg = 'https://de-trust-front.vercel.app/images/logo-black.png';

  return (
    <Head>
      <title>{title}</title>

      <meta name="description" content={description} />
      <link rel="canonical" href={url || fallbackUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image || fallbackImg} />
      <meta property="og:image:width" content={'2357'} />
      <meta property="og:image:height" content={'2358'} />
      <meta property="og:url" content={url || fallbackUrl} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image || fallbackImg} />
      <meta name="twitter:url" content={url || fallbackUrl} />
    </Head>
  );
};
