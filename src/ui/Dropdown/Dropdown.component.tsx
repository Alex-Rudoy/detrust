import React, { useMemo, useState } from 'react';
import { DropdownBase } from '@components/DropdownBase';
import { DropdownCaller } from '@components/DropdownCaller';
import { DropdownItem } from '@components/DropdownItem';
import { DropdownSearch } from '@components/DropdownSearch';
import { FontWeightEnum, Text, TextSizeEnum } from '@components/Text';
import { DropdownProps } from './Dropdown.types';

import styles from './Dropdown.module.scss';

export const DropdownComponent = <T extends string | number>({
  className,
  containerClass,
  disabled,
  emptyStateText,
  iconOnly,
  options,
  placeholder = '',
  preFilteredOptions,
  setValue,
  showSearch,
  value,
  width = 320,
  includeAll = false,
  allLabel,
}: DropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const handleSelect = (value: T) => {
    setIsOpen(false);
    setValue(value);
  };

  const activeOption = options.find((option) => option.value === value) || {
    icon: null,
    label: '',
  };

  const filteredOptions = useMemo(
    () =>
      (preFilteredOptions || options).filter((item) => {
        return (
          item.label.toLowerCase().includes(search.toLowerCase()) ||
          item.value.toString().toLowerCase().includes(search.toLowerCase())
        );
      }),
    [search, options, preFilteredOptions],
  );

  return (
    <DropdownBase
      caller={
        <DropdownCaller
          className={containerClass}
          text={activeOption?.label || allLabel || ''}
          icon={activeOption?.icon}
          iconOnly={iconOnly}
          placeholder={placeholder}
          style={{ width: `${width}px` }}
          disabled={disabled}
        />
      }
      offsetMain={4}
      customState={[isOpen, setIsOpen]}
      className={className}
      style={{ width: `${width}px` }}
      disabled={disabled}
    >
      {showSearch && (
        <DropdownSearch
          id="dropdownSearch"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      )}

      {filteredOptions.length === 0 && !includeAll && (
        <div className={styles.emptyState}>
          <Text size={TextSizeEnum.S14} fontWeight={FontWeightEnum.FW500}>
            {emptyStateText || 'No values found'}
          </Text>
        </div>
      )}

      {filteredOptions.map((option, index) => (
        <DropdownItem
          key={index}
          text={option.label}
          icon={option.icon}
          onClick={() => handleSelect(option.value)}
          selected={option.value === value}
        />
      ))}
    </DropdownBase>
  );
};

DropdownComponent.displayName = 'Dropdown';
