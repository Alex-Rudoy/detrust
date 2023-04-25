import { AxiosResponse } from 'axios';

import { PayloadAction } from '@reduxjs/toolkit';

import { requestStatusEnum } from '@typings/requestStatus';

export type DegensListReducerType = {
  status: requestStatusEnum;
  degensList: DegenType[];
};

// actions
export type FetchDegensListForTokenActionType = PayloadAction<{
  symbol: string;
}>;
export type FetchDegensListForGroupActionType = PayloadAction<{ id: number }>;
export type FetchDegensListSuccessActionType = PayloadAction<DegenType[]>;

// api
export type FetchDegensListResponse = AxiosResponse<DegenType[]>;

// utils
export type DegenType = {
  id: `${number}` | '';
  mentions_count: number;
  username: string;
  project_id: `${number}` | '';
  price_change: number;
  positive_mentions_count: number;
  positive_price_change: number;
  negative_mentions_count: number;
  negative_price_change: number;
  reputation: number;
  won: number;
};
