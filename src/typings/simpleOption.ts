import { IconsEnum } from '@components/SvgIcon';

export type simpleOption<T = string | number> = {
  value: T;
  label: string;
  icon?: IconsEnum;
};
