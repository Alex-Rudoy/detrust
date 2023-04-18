import classNames from 'classnames';

import { Badge, BadgeColorsEnum } from '@components/Badge';
import { IconsEnum } from '@components/SvgIcon';
import { BadgeDeltaProps } from './BadgeDelta.types';

import styles from './BadgeDelta.module.scss';

export const BadgeDeltaComponent = ({
  value,
  percent = false,
  className,
  onClick = () => null,
}: BadgeDeltaProps) => {
  const color =
    value > 0
      ? BadgeColorsEnum.success
      : value === 0
      ? BadgeColorsEnum.primary
      : BadgeColorsEnum.error;

  const badgeDeltaClass = classNames({ [styles.bigger]: value > 0 }, className);

  return (
    <Badge
      icon={value === 0 ? IconsEnum.minus : IconsEnum.arrow}
      color={color}
      text={`${value}${percent ? '%' : ''}`}
      className={badgeDeltaClass}
      onClick={onClick}
    />
  );
};

BadgeDeltaComponent.displayName = 'BadgeDelta';
