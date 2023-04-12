import classNames from 'classnames';
import React from 'react';

import { DropdownDividerProps } from './DropdownDivider.types';

import styles from './DropdownDivider.module.scss';

export const DropdownDividerComponent: React.FC<DropdownDividerProps> = ({
  className,
  style,
}) => {
  return <hr className={classNames(styles.divider, className)} style={style} />;
};

DropdownDividerComponent.displayName = 'DropdownDivider';
