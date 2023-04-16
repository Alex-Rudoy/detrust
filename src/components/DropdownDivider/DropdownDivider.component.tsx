import classNames from 'classnames';

import { DropdownDividerProps } from './DropdownDivider.types';

import styles from './DropdownDivider.module.scss';

export const DropdownDividerComponent = ({
  className,
  style,
}: DropdownDividerProps) => {
  return <hr className={classNames(styles.divider, className)} style={style} />;
};

DropdownDividerComponent.displayName = 'DropdownDivider';
