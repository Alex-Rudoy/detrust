import { api } from '.';

import { ApiPromise } from '@typings/apiPromise';
import {
  TokenConnectionType,
  TokenInfluencerType,
  TokenMentionType,
  TokenPriceChartItemType,
  TokenType,
} from '@typings/tokens';

export const TokenService = {
  getTokens(): ApiPromise<TokenType[]> {
    return api.get('/general/getCoinProjectList');
  },

  getTokenConnections(): ApiPromise<TokenConnectionType[]> {
    return api.get('/general/getTokenConnections');
  },

  getTokenData(tokenId: string): ApiPromise<TokenType[]> {
    return api.get(`/general/getCoinProject/${tokenId}`); // api returns one item in array
  },

  getTokenInfluencersStat(tokenId: string): ApiPromise<TokenInfluencerType[]> {
    return api.get(`/general/getProjectInfluencersStat/${tokenId}`);
  },

  getTokenPrice(tokenId: string): ApiPromise<TokenPriceChartItemType[]> {
    return api.get(`/general/getProjectPrice/${tokenId}`);
  },

  getTokenMentions(tokenId: string): ApiPromise<TokenMentionType[]> {
    return api.get(`/general/getProjectMentions/${tokenId}`);
  },
};
