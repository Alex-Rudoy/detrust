import { PropsWithChildren } from 'react';
import { Scrolling } from '@/components/Scrolling';
import { SideMenu } from './SideMenu';
import styles from './Layout.module.scss';

export const LayoutComponent = ({ children }: PropsWithChildren) => {
  return (
    <Scrolling horizontal>
      <main className={styles.main}>
        <SideMenu />
        <Scrolling vertical className={styles.pageContainer}>
          {children}
        </Scrolling>
      </main>
    </Scrolling>
  );
};

LayoutComponent.displayName = 'Layout';
