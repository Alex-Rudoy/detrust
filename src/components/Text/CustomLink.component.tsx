import React, { PropsWithChildren } from 'react';
import classNames from 'classnames';
import Link from 'next/link';

import { CustomLinkProps } from './Text.types';

import styles from './Text.module.scss';

export const CustomLinkComponent = ({
  id,
  children,
  className,
  dots,
  fontWeight,
  style,
  textTransform,
  size,
  onClick,
  disabled,
  ...rest
}: PropsWithChildren<CustomLinkProps>) => {
  const textClass = classNames(
    styles.text,
    {
      [styles.customLink]: typeof children === 'string',
      [styles[`text_size_${size}`]]: size,
      [styles[`text_fontWeight_${fontWeight}`]]: fontWeight,
      [styles[`text_textTransform_${textTransform}`]]: textTransform,
      [styles[`text_dots`]]: dots,
      [styles.disabledLink]: disabled,
    },
    className,
  );

  return (
    <Link
      className={textClass}
      onClick={onClick}
      style={{ ...style }}
      id={id}
      {...rest}
      onClickCapture={(e) => e.preventDefault()}
    >
      {children}
    </Link>
  );
};

CustomLinkComponent.displayName = 'Text';
