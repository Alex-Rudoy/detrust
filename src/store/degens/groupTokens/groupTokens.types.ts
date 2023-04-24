import { AxiosResponse } from 'axios';

import { PayloadAction } from '@reduxjs/toolkit';

import { requestStatusEnum } from '@typings/requestStatus';

export type GroupTokensReducerType = {
  status: requestStatusEnum;
  groupTokens: GroupTokenType[];
};

// actions
export type FetchGroupTokensActionType = PayloadAction<{ id: number }>;
export type FetchGroupTokensSuccessActionType = PayloadAction<GroupTokenType[]>;

// api
export type FetchGroupTokensResponse = AxiosResponse<GroupTokenType[]>;

// utils
export type GroupTokenType = {
  dt: null; // ???
  project_name: string;
  symbol: string;
  impression_count: number;
  impression_1d_diff: number;
  impression_7d_diff: number;
  mention_count: number;
  mention_count_1d_diff: number;
  mention_count_7d_diff: number;
  price: number;
  price_1d_diff: number;
  price_7d_diff: number;
  user_count: number;
  user_count_1d_diff: number;
  user_count_7d_diff: number;
  volume: number;
  volume_1d_diff: number;
  volume_7d_diff: number;
};
