import { AxiosResponse } from 'axios';

import { PayloadAction } from '@reduxjs/toolkit';

import { requestStatusEnum } from '@typings/requestStatus';

export type DegenInfoReducerType = {
  status: requestStatusEnum;
  degenInfo: DegenInfoType;
};

// actions
export type FetchDegenInfoActionType = PayloadAction<{ username: string }>;
export type FetchDegenInfoSuccessActionType = PayloadAction<DegenInfoType>;

// api
export type FetchDegenInfoResponse = AxiosResponse<DegenInfoType[]>;

// utils
export type DegenInfoType = {
  assets: number;
  assets_scaled: number;
  big_followers: number;
  big_followers_scaled: number;
  followers_count: number;
  followers_count_scaled: number;
  general_score: number;
  influence: number;
  influence_scaled: number;
  popularity: number;
  popularity_scaled: number;
  price_change: number;
  price_change_scaled: number;
  user_id: string;
  username: string;
};
