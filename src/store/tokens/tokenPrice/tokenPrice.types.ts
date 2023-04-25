import { AxiosResponse } from 'axios';

import { PayloadAction } from '@reduxjs/toolkit';

import { requestStatusEnum } from '@typings/requestStatus';

export type TokenPriceReducerType = {
  status: requestStatusEnum;
  tokenPrice: TokenPriceChartItemType[];
  mentions: TokenMentionType[];
};

// actions
export type FetchTokenPriceActionType = PayloadAction<{ symbol: string }>;
export type FetchTokenPriceForDegenActionType = PayloadAction<{
  symbol: string;
  username: string;
}>;
export type FetchTokenPriceSuccessActionType = PayloadAction<{
  tokenPrice: TokenPriceChartItemType[];
  mentions: TokenMentionType[];
}>;

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
  id: number;
  content_creation_dt: string;
  content_creation_dt_h: string;
  mention: string;
  sentiment: number;
  sentiment_score: number;
  user_id: `${number}`;
  username: string;
  text: string;
};
