import React from 'react';
import classNames from 'classnames';

import { IconsEnum, SvgIcon } from '../SvgIcon';
import { FontWeightEnum, Text, TextSizeEnum } from '../Text';

import { DropdownItemProps } from './DropdownItem.types';

import styles from './DropdownItem.module.scss';

export const DropdownItemComponent: React.FC<DropdownItemProps> = ({
  icon,
  text,
  onClick,
  className,
  selected,
}) => {
  const dropdownItemClass = classNames(styles.dropdownItem, className);

  return (
    <div className={dropdownItemClass} onClick={onClick}>
      {icon && <SvgIcon src={icon} size={16} />}
      <Text size={TextSizeEnum.S14} fontWeight={FontWeightEnum.FW400}>
        {text}
      </Text>
      {selected && (
        <SvgIcon
          src={IconsEnum.checkboxV}
          size={12}
          className={styles.selectedOption}
        />
      )}
    </div>
  );
};

DropdownItemComponent.displayName = 'DropdownItem';
