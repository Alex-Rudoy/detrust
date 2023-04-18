import { CSSProperties } from 'react';

import { IconsEnum } from '@components/SvgIcon';

export type DropdownCallerProps = {
  text: string;
  icon?: IconsEnum | null;
  iconOnly?: boolean;
  className?: string;
  style?: CSSProperties;
  placeholder?: string;
  disabled?: boolean;
};
