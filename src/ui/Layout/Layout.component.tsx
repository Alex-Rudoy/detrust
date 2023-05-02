import { PropsWithChildren } from 'react';
import { NextSeo } from 'next-seo';

import { Scrolling } from '@components/Scrolling';
import { Breadcrumbs } from './Breadcrumbs';
import { Header } from './Header';
import { SideMenu } from './SideMenu';

import { LayoutProps } from './Layout.types';

import styles from './Layout.module.scss';

export const LayoutComponent = ({
  activeMenuLink,
  breadcrumbs,
  title,
  description,
  url,
  img,
  children,
}: PropsWithChildren<LayoutProps>) => {
  const fallbackUrl = typeof window === 'undefined' ? '' : window.location.href;
  const fallbackImg = 'https://de-trust-front.vercel.app/images/logo-black.png';

  const titleWithPrefix = `Detrust | ${title}`;
  const imageUrl = img || fallbackImg;
  const siteUrl = url || fallbackUrl;

  return (
    <Scrolling horizontal>
      <NextSeo
        title={titleWithPrefix}
        description={description}
        canonical={siteUrl}
        openGraph={{
          url: siteUrl,
          title: titleWithPrefix,
          description: description,
          images: [
            {
              url: imageUrl,
              width: 2357,
              height: 2358,
              type: 'image/png',
            },
          ],
          siteName: 'Detrust',
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />

      <Header />
      <main className={styles.main}>
        <SideMenu activeMenuLink={activeMenuLink} />
        <Scrolling vertical className={styles.pageContainer}>
          {breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
          {children}
        </Scrolling>
      </main>
    </Scrolling>
  );
};

LayoutComponent.displayName = 'Layout';
