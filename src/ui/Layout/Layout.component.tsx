import { PropsWithChildren } from 'react';

import { Scrolling } from '@components/Scrolling';
import { Breadcrumbs } from './Breadcrumbs';
import { Header } from './Header';
import { Seo } from './Seo';
import { SideMenu } from './SideMenu';

import { LayoutProps } from './Layout.types';

import styles from './Layout.module.scss';

export const LayoutComponent = ({
  activeMenuLink,
  breadcrumbs,
  title,
  description,
  children,
}: PropsWithChildren<LayoutProps>) => {
  return (
    <Scrolling horizontal>
      <Seo title={`Detrust | ${title}`} description={description} />
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
