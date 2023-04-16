import classNames from 'classnames';

import { SkeletonProps } from './Skeleton.types';

import styles from './Skeleton.module.scss';

export const SkeletonComponent = ({ className, style }: SkeletonProps) => {
  const skeletonClass = classNames(styles.skeleton, className);

  return <div className={skeletonClass} style={style} />;
};

SkeletonComponent.displayName = 'Skeleton';
