import React from 'react';
import { Button, ButtonVariantEnum } from '@/components/Button';
import { Dropdown } from '@/components/Dropdown';
import { IconsEnum } from '@/components/SvgIcon';
import generatePagination from './generatePagination';
import { TablePaginationProps } from './TablePagination.types';

import styles from './TablePagination.module.scss';

export const TablePaginationComponent: React.FC<TablePaginationProps> = ({
  totalRecords,
  startRecord,
  recordsPerPage,
  onPaginationClick,
  itemsPerPageOptions = [5, 10, 20, 50],
  immutableRecordPerPage,
}) => {
  const { pages, currentPage } = generatePagination(
    totalRecords,
    startRecord,
    recordsPerPage,
  );

  if (pages.length === 0) return null;

  return (
    <div className={styles.pagination}>
      <Button
        variant={ButtonVariantEnum.secondary}
        text={'Previous'}
        icon={IconsEnum.arrow}
        iconPosition="left"
        onClick={() =>
          onPaginationClick(startRecord - recordsPerPage, recordsPerPage)
        }
        disabled={currentPage === '1'}
        className={styles.previous}
      />
      {pages.map((page, i) => (
        <Button
          variant={ButtonVariantEnum.secondary}
          key={`${page}_${i}`}
          text={page}
          onClick={
            page === '...'
              ? () => null
              : () =>
                  onPaginationClick(
                    (parseInt(page, 10) - 1) * recordsPerPage,
                    recordsPerPage,
                  )
          }
          className={page === currentPage ? styles.currentPage : ''}
        />
      ))}
      <Button
        variant={ButtonVariantEnum.secondary}
        text={'Next'}
        icon={IconsEnum.arrow}
        iconPosition="right"
        onClick={() =>
          onPaginationClick(startRecord + recordsPerPage, recordsPerPage)
        }
        disabled={currentPage === pages[pages.length - 1]}
        className={styles.next}
      />
      {!immutableRecordPerPage && (
        <Dropdown
          options={itemsPerPageOptions.map((value) => ({
            value,
            label: `${value}/page`,
          }))}
          value={recordsPerPage}
          setValue={(value) => onPaginationClick(startRecord, value)}
          className={styles.recordsPerPage}
          width={120}
        />
      )}
    </div>
  );
};

TablePaginationComponent.displayName = 'TablePagination';
