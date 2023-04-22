import { PropsWithChildren, useEffect } from 'react';

import { Scrolling } from '@components/Scrolling';
import { Breadcrumbs } from './Breadcrumbs';
import { Header } from './Header';
import { SideMenu } from './SideMenu';

import { isBrowser } from '@utils/isBrowser';
import { DegensService } from '@api/DegensService';

import { LayoutProps } from './Layout.types';

import styles from './Layout.module.scss';

export const LayoutComponent = ({
  activeMenuLink,
  breadcrumbs,
  children,
}: PropsWithChildren<LayoutProps>) => {
  useEffect(() => {
    (async () => {
      if (!isBrowser(window)) return;
      try {
        const res = await DegensService.getGroups();
        // .then((res) => console.log(res.data));
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <Scrolling horizontal>
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
