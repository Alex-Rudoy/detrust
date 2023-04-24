import { AxiosResponse } from 'axios';

import { PayloadAction } from '@reduxjs/toolkit';

import { requestStatusEnum } from '@typings/requestStatus';

export type DegenReducerType = {
  status: requestStatusEnum;
  degen: DegenType;
};

// actions
export type FetchDegenActionType = PayloadAction<{ username: string }>;
export type FetchDegenSuccessActionType = PayloadAction<DegenType>;

// api
export type FetchDegenResponse = AxiosResponse<DegenType[]>;

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
