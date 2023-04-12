import React from 'react';
import classNames from 'classnames';
import Image from 'next/image';

import { CustomImageProps } from './CustomImage.types';

import styles from './CustomImage.module.scss';

export const CustomImageComponent: React.FC<CustomImageProps> = ({
  alt,
  className,
  ...props
}) => {
  return (
    <div className={classNames(styles.container, className)}>
      <Image alt={alt} {...props} className={styles.customImage} />
    </div>
  );
};

CustomImageComponent.displayName = 'CustomImage';
