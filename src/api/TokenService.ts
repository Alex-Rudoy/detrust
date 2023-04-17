import { api } from '.';

import { ApiPromise } from '@typings/apiPromise';
import {
  TokenConnectionType,
  TokenInfluencerType,
  TokenPriceChartItemType,
  TokenShortType,
} from '@typings/tokens';

export const TokenService = {
  getTokens(): ApiPromise<TokenShortType[]> {
    return api.get('/general/getCoinProjectList');
  },

  getTokenConnections(): ApiPromise<TokenConnectionType[]> {
    return api.get('/general/getTokenConnections');
  },

  getTokenData(tokenId: string): ApiPromise<TokenShortType> {
    return api.get(`/general/getCoinProject/${tokenId}`);
  },

  getTokenInfluencersStat(tokenId: string): ApiPromise<TokenInfluencerType[]> {
    return api.get(`/general/getProjectInfluencersStat/${tokenId}`);
  },

  getTokenPrice(tokenId: string): ApiPromise<TokenPriceChartItemType[]> {
    return api.get(`/general/getProjectPrice/${tokenId}`);
  },
};
