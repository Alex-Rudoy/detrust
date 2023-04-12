export enum IconsEnum {
  search = '/icons/common/search.svg',
  minus = '/icons/common/minus.svg',
  arrow = '/icons/common/arrow.svg',
  arrowChevron = '/icons/common/arrow-chevron.svg',
  loader = '/icons/common/loader.svg',
  checkboxV = '/icons/common/checkbox-v.svg',
  cross = '/icons/common/cross.svg',
}

export type SvgIconProps = {
  src: IconsEnum;
  onClick?: () => void;
  size?: number;
  rotate?: '0' | '90' | '180' | '270';
  className?: string;
  style?: React.CSSProperties;
};
