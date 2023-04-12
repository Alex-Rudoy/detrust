import React from 'react';
import classNames from 'classnames';

import { FontWeightEnum, Text, TextSizeEnum } from '../Text';

import { TabBarProps } from './TabBar.types';

import styles from './TabBar.module.scss';

export const TabBarComponent = <T extends string | number>({
  id,
  className,
  selectedTab,
  options,
  onTabClick,
}: TabBarProps<T>) => {
  const tabBarClass = classNames(styles.tabBar, className);

  return (
    <div className={tabBarClass} id={id}>
      {options.map((option) => (
        <div
          key={option.value}
          className={classNames(styles.tab, {
            [styles.tab_active]: Array.isArray(option.value)
              ? option.value.includes(selectedTab)
              : option.value === selectedTab,
          })}
          onClick={() => onTabClick(option.value)}
        >
          <Text size={TextSizeEnum.S16} fontWeight={FontWeightEnum.FW500}>
            {option.label}
          </Text>
          <div className={styles.underline} />
        </div>
      ))}
    </div>
  );
};

TabBarComponent.displayName = 'TabBar';
