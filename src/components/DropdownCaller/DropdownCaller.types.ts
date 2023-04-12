import React from 'react';
import { IconsEnum } from '../SvgIcon';

export type DropdownCallerProps = {
  text: string;
  icon?: IconsEnum | null;
  iconOnly?: boolean;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  disabled?: boolean;
};
