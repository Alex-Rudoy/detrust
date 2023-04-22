import { AxiosResponse } from 'axios';

import { PayloadAction } from '@reduxjs/toolkit';

import { requestStatusEnum } from '@typings/requestStatus';

export type TokenPriceReducerType = {
  status: requestStatusEnum;
  tokenPrice: TokenPriceChartItemType[];
};

// actions
export type FetchTokenPriceActionType = PayloadAction<{ symbol: string }>;
export type FetchTokenPriceSuccessActionType = PayloadAction<
  TokenPriceChartItemType[]
>;

// api
export type FetchTokenPriceResponse = AxiosResponse<
  TokenPriceChartItemRawType[]
>;
export type FetchTokenMentionsResponse = AxiosResponse<TokenMentionType[]>;

// utils
export type TokenPriceChartItemRawType = {
  dt: string;
  dt_h: string;
  price: number;
  volume: number;
  project_id: `${number}`;
  symbol: string;
};

export type TokenPriceChartItemType = {
  timestamp: number;
  price: number;
  color?: string;
  stroke?: string;
};

export type TokenMentionType = {
  content_creation_dt: string;
  content_creation_dt_h: string;
  project_id: `${number}`;
  sentiment: number;
  sentiment_score: number;
  user_id: `${number}`;
  username: string;
};
