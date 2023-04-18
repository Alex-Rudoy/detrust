import { IconsEnum } from '@components/SvgIcon';

export type DropdownItemProps = {
  text: string;
  icon?: IconsEnum;
  onClick?: () => void;
  className?: string;
  selected?: boolean;
};
