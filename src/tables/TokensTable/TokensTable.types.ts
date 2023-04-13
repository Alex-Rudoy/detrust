import React from 'react';
import { TokenShortType } from '@typings/tokens';
import { TableProps } from '@ui/Table';

export type TokensTableProps = Omit<TableProps<TokenShortType>, 'columns'>;
