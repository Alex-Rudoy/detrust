import classNames from 'classnames';

import { IconsEnum, SvgIcon } from '@components/SvgIcon';
import { Text, TextSizeEnum } from '@components/Text';

import { DropdownCallerProps } from './DropdownCaller.types';

import styles from './DropdownCaller.module.scss';

export const DropdownCallerComponent = ({
  icon,
  iconOnly,
  text,
  className,
  style,
  placeholder,
  disabled,
}: DropdownCallerProps) => {
  const dropdownCallerClass = classNames(
    styles.dropdownCaller,
    { [styles.disabled]: disabled },
    className,
  );

  return (
    <div className={dropdownCallerClass} style={style}>
      {icon && <SvgIcon src={icon} size={16} />}

      {!iconOnly && text && <Text size={TextSizeEnum.S14}>{text}</Text>}

      {!text && <Text size={TextSizeEnum.S14}>{placeholder}</Text>}

      <SvgIcon src={IconsEnum.arrowChevron} size={20} />
    </div>
  );
};
