import { AxiosResponse } from 'axios';

import { PayloadAction } from '@reduxjs/toolkit';

import { requestStatusEnum } from '@typings/requestStatus';

export type TokenConnectionsReducerType = {
  status: requestStatusEnum;
  nodes: GraphNode[];
  links: GraphLink[];
};

// actions
export type FetchTokenConnectionsSuccessActionType = PayloadAction<{
  nodes: GraphNode[];
  links: GraphLink[];
}>;

// api
export type FetchTokenConnectionsResponse = AxiosResponse<
  TokenConnectionType[]
>;

// utils
export type TokenConnectionType = {
  username: string;
  target_id: number;
  name: string;
  symbol: string;
  follower_username: string;
};

export type GraphNode = {
  id: string;
  type: 'tokens' | 'degens';
  link: string;
  label: string;
  color: string;
  neighbors: GraphNode[];
  links: GraphLink[];
  x?: number;
  y?: number;
  z?: number;
  fx?: number;
  fy?: number;
  fz?: number;
};

export type GraphLink = { source: string; target: string };
