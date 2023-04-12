import { simpleOption } from '@/typings/simpleOption';

export type TabBarProps<T = string | number> = {
  id?: string;
  className?: string;
  selectedTab: string;
  options: simpleOption<T>[];
  onTabClick: (tab: T) => void;
};
