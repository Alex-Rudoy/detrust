import { IconsEnum } from '../SvgIcon';

export type DropdownItemProps = {
  text: string;
  icon?: IconsEnum;
  onClick?: () => void;
  className?: string;
  selected?: boolean;
};
