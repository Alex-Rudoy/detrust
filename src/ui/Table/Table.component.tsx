import classNames from 'classnames';

import { Skeleton } from '@components/Skeleton';
import { IconsEnum, SvgIcon } from '@components/SvgIcon';
import { Text, TextSizeEnum } from '@components/Text';
import { TablePagination } from './TablePagination';

import { hasValue } from '@utils/hasValue';

import { TableProps } from './Table.types';

import styles from './Table.module.scss';
import { Scrolling } from '@components/Scrolling';

export const TableComponent = <T extends { id: number | string }>({
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

  return (
    <Scrolling
      vertical
      horizontal
      className={classNames(styles.table, className, 'magic-inner-shadows')}
    >
      <table>
        <thead>
          <tr className={styles.header_row}>
            {columns.map((column) => (
              <th
                key={column.id}
                className={sortedBy === column.id ? styles.sortedColumn : ''}
              >
                <div className={styles.th_content}>
                  <Text
                    size={TextSizeEnum.S16}
                    tooltip={
                      column.tooltip
                        ? { id: column.id, text: column.tooltip }
                        : undefined
                    }
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
            : data.map((row) => (
                <tr key={row.id}>
                  {columns.map((column) => (
                    <td key={`${row.id}_${column.id}`}>
                      {column.cellRenderer(row)}
                    </td>
                  ))}
                </tr>
              ))}
        </tbody>
      </table>

      {!isLoading && data.length === 0 && emptyState ? <>{emptyState}</> : null}

      {!withoutPagination &&
      totalRecords &&
      hasValue(startRecord) &&
      recordsPerPage &&
      onPaginationClick ? (
        <TablePagination
          totalRecords={totalRecords}
          startRecord={startRecord}
          recordsPerPage={recordsPerPage}
          onPaginationClick={onPaginationClick}
        />
      ) : null}
    </Scrolling>
  );
};

TableComponent.displayName = 'Table';
