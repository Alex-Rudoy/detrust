import { AxiosResponse } from 'axios';

import { PayloadAction } from '@reduxjs/toolkit';

import { requestStatusEnum } from '@typings/requestStatus';

export type GroupTokensReducerType = {
  status: requestStatusEnum;
  groupTokens: GroupTokenType[];
};

// actions
export type FetchGroupTokensActionType = PayloadAction<{ id: number }>;
export type FetchGroupTokensSuccessActionType = PayloadAction<GroupTokenType>;

// api
export type FetchGroupTokensResponse = AxiosResponse<GroupTokenType[]>;

// utils
export type GroupTokenType = {
  id: number;
};
