import React from 'react';
import classNames from 'classnames';

import { IconsEnum, SvgIcon } from '../SvgIcon';
import { FontWeightEnum, TextSizeEnum, Text } from '../Text';

import { ButtonProps } from './Button.types';

import styles from './Button.module.scss';

const textSizeMap = {
  sm: TextSizeEnum.S14,
  md: TextSizeEnum.S14,
  lg: TextSizeEnum.S16,
} as const;

export const ButtonComponent: React.FC<ButtonProps> = ({
  text,
  id,
  variant = 'primary',
  size = 'md',
  width = 'content',
  icon,
  iconPosition = 'left',
  onClick,
  type = 'button',
  active,
  disabled,
  loading,
  style,
  className,
}) => {
  const buttonClass = classNames(
    styles.button,
    {
      [styles[`button_variant_${variant}`]]: variant,
      [styles[`button_size_${size}`]]: size,
      [styles[`button_width_${width}`]]: width,
      [styles[`button_icon_position_${iconPosition}`]]: iconPosition,
      [styles.disabled]: disabled,
      [styles.active]: active,
      [styles.loading]: loading,
    },
    className,
  );

  const isClickUnavailable = loading || disabled;

  return (
    <button
      className={buttonClass}
      disabled={disabled}
      onClick={isClickUnavailable ? () => null : onClick}
      style={style}
      type={type}
      id={id}
      data-testid="button-as"
    >
      <div
        className={styles.loader}
        data-testid={`button-loader-${loading ? 'active' : 'inactive'}`}
      >
        <SvgIcon src={IconsEnum.loader} size={30} />
      </div>
      {icon && <SvgIcon src={icon} size={20} data-testid="button-icon" />}
      {text && (
        <Text size={textSizeMap[size]} fontWeight={FontWeightEnum.FW500}>
          {text}
        </Text>
      )}
    </button>
  );
};

ButtonComponent.displayName = 'Button';
