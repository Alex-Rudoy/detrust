import { AxiosResponse } from 'axios';

import { PayloadAction } from '@reduxjs/toolkit';

import { requestStatusEnum } from '@typings/requestStatus';

export type DegenTokensReducerType = {
  status: requestStatusEnum;
  degenTokens: DegenTokenType[];
};

// actions
export type FetchDegenTokensActionType = PayloadAction<{ username: string }>;
export type FetchDegenTokensSuccessActionType = PayloadAction<DegenTokenType[]>;

// api
export type FetchDegenTokensResponse = AxiosResponse<DegenTokenType[]>;

// utils
export type DegenTokenType = {
  mention: string;
};
