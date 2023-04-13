import React from 'react';
import classNames from 'classnames';

import { Skeleton } from '@components/Skeleton';
import { IconsEnum, SvgIcon } from '@components/SvgIcon';
import { Text, FontWeightEnum, TextSizeEnum } from '@components/Text';
import { TablePagination } from './TablePagination';
import { TableProps } from './Table.types';

import styles from './Table.module.scss';

export const TableComponent = <T,>({
  className,
  columns,
  data,
  sortedBy,
  reverseSort,
  totalRecords,
  startRecord,
  recordsPerPage,
  isLoading,
  emptyState,
  onSortClick,
  onPaginationClick,
  withoutPagination,
}: TableProps<T>) => {
  const handleSortClick = (id: keyof T) => {
    if (!onSortClick) return;

    if (id === sortedBy) {
      onSortClick(id, !reverseSort);
      return;
    }

    onSortClick(id, false);
  };

  if (!isLoading && data.length === 0 && emptyState) return <>{emptyState}</>;

  return (
    <div className={classNames(styles.table, className)}>
      <table>
        <thead>
          <tr className={styles.header_row}>
            {columns.map((column) => (
              <th
                key={column.id}
                className={sortedBy === column.id ? styles.sortedColumn : ''}
              >
                <div className={styles.th_content}>
                  {isLoading ? (
                    <Skeleton />
                  ) : (
                    <>
                      <Text
                        size={TextSizeEnum.S16}
                        fontWeight={FontWeightEnum.FW500}
                      >
                        {column.name}
                      </Text>
                      {column.sortable && (
                        <SvgIcon
                          src={IconsEnum.arrow}
                          rotate={
                            sortedBy === column.id && reverseSort
                              ? '180'
                              : undefined
                          }
                          size={16}
                          onClick={() => handleSortClick(column.id)}
                        />
                      )}
                    </>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? new Array(5).fill('').map((_, i) => (
                <tr key={i}>
                  {columns.map((column) => (
                    <td key={`${i}_${column.id}`}>
                      <Skeleton />
                    </td>
                  ))}
                </tr>
              ))
            : data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((column) => (
                    <td key={`${rowIndex}_${column.id}`}>
                      {column.cellRenderer(row, rowIndex)}
                    </td>
                  ))}
                </tr>
              ))}
        </tbody>
      </table>
      {!withoutPagination &&
        totalRecords &&
        startRecord &&
        recordsPerPage &&
        onPaginationClick && (
          <TablePagination
            totalRecords={totalRecords}
            startRecord={startRecord}
            recordsPerPage={recordsPerPage}
            onPaginationClick={onPaginationClick}
          />
        )}
    </div>
  );
};

TableComponent.displayName = 'Table';
