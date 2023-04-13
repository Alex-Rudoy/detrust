import React from 'react';
import Link from 'next/link';

import { CustomImage } from '@components/CustomImage';
import { routes } from '@views/routes';
import logoImg from './logo-white-text.png';
import styles from './Header.module.scss';

export const HeaderComponent = () => {
  return (
    <div className={styles.header}>
      <Link href={routes().tokens}>
        <CustomImage src={logoImg} alt="logo" fill className={styles.logo} />
      </Link>
    </div>
  );
};

HeaderComponent.displayName = 'Header';
