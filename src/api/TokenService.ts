import { api } from '.';

import { FetchDegensListResponse } from '@store/degens/degensList/degensList.types';
import { FetchTokenConnectionsResponse } from '@store/tokens/tokenConnections/tokenConnections.types';
import {
  FetchTokenMentionsResponse,
  FetchTokenPriceResponse,
} from '@store/tokens/tokenPrice/tokenPrice.types';
import { FetchTokensResponse } from '@store/tokens/tokensList/tokensList.types';

export const TokenService = {
  getTokens(): Promise<FetchTokensResponse> {
    return api.get('/general/getCoinProjectList');
  },

  getTokenConnections(): Promise<FetchTokenConnectionsResponse> {
    return api.get('/general/getTokenConnections');
  },

  getTokenData(symbol: string): Promise<FetchTokensResponse> {
    return api.get(`/general/getCoinProject/${symbol}`); // api returns one item in array
  },

  getTokenInfluencersStat(tokenId: string): Promise<FetchDegensListResponse> {
    return api.get(`/general/getProjectInfluencersStat/${tokenId}`);
  },

  getTokenPrice(tokenId: string): Promise<FetchTokenPriceResponse> {
    return api.get(`/general/getProjectPrice/${tokenId}`);
  },

  getTokenMentions(tokenId: string): Promise<FetchTokenMentionsResponse> {
    return api.get(`/general/getProjectMentions/${tokenId}`);
  },
};
