import { simpleOption } from '@/typings/simpleOption';

export type DropdownProps<T extends string | number> = {
  className?: string;
  containerClass?: string;
  disabled?: boolean;
  emptyStateText?: string;
  iconOnly?: boolean;
  options: simpleOption<T>[];
  placeholder?: string;
  preFilteredOptions?: simpleOption<T>[];
  setValue: (value: T) => void;
  showSearch?: boolean;
  value: T;
  width?: number;
  includeAll?: boolean;
  allLabel?: string;
};
