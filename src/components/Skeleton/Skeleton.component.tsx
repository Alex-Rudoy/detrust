import classNames from 'classnames';
import React from 'react';

import { SkeletonProps } from './Skeleton.types';

import styles from './Skeleton.module.scss';

export const SkeletonComponent: React.FC<SkeletonProps> = ({
  className,
  style,
}) => {
  const skeletonClass = classNames(styles.skeleton, className);

  return <div className={skeletonClass} style={style} />;
};

SkeletonComponent.displayName = 'Skeleton';
