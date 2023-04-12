import React from 'react';
import classNames from 'classnames';

import { SvgIcon } from '../SvgIcon';
import { FontWeightEnum, Text, TextSizeEnum } from '../Text';

import { BadgeProps } from './Badge.types';

import styles from './Badge.module.scss';

export const BadgeComponent: React.FC<BadgeProps> = ({
  className,
  color,
  dots,
  icon,
  iconPosition = 'right',
  id,
  text,
  onClick = () => null,
}) => {
  const badgeClass = classNames(
    styles.badge,
    {
      [styles[`badge_color_${color}`]]: color,
      [styles[`badge_icon_position_${iconPosition}`]]: icon,
      [styles[`badge_dots`]]: dots,
    },
    className,
  );

  return (
    <div className={badgeClass} id={id} onClick={onClick}>
      {icon && <SvgIcon src={icon} size={12} />}
      {text && (
        <Text
          size={TextSizeEnum.S12}
          fontWeight={FontWeightEnum.FW500}
          dots={dots}
        >
          {text}
        </Text>
      )}
    </div>
  );
};

BadgeComponent.displayName = 'Badge';
