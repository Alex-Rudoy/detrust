import { AxiosResponse } from 'axios';

import { PayloadAction } from '@reduxjs/toolkit';

import { requestStatusEnum } from '@typings/requestStatus';

import { TokenType } from '../token/token.types';

export type TokensListReducerType = {
  status: requestStatusEnum;
  tokensList: TokenType[];
  tokenBoundaries: TokenBoundariesType;
};

// actions
export type FetchTokensListSuccessActionType = PayloadAction<{
  tokensList: TokenType[];
  tokenBoundaries: TokenBoundariesType;
}>;

// api
export type FetchTokensResponse = AxiosResponse<TokenType[]>;

// utils
export type TokenBoundariesType = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};
