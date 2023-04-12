import { PropsWithChildren } from 'react';
import { Scrolling } from '@/components/Scrolling';
import { Header } from './Header';
import { SideMenu } from './SideMenu';
import { LayoutProps } from './Layout.types';

import styles from './Layout.module.scss';

export const LayoutComponent = ({
  activeMenuLink,
  children,
}: PropsWithChildren<LayoutProps>) => {
  return (
    <Scrolling horizontal>
      <Header />
      <main className={styles.main}>
        <SideMenu activeMenuLink={activeMenuLink} />
        <Scrolling vertical className={styles.pageContainer}>
          {children}
        </Scrolling>
      </main>
    </Scrolling>
  );
};

LayoutComponent.displayName = 'Layout';
