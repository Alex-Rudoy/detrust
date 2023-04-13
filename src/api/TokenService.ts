import { api } from '.';

import { ApiPromise } from '@typings/apiPromise';
import { TokenConnectionType, TokenShortType } from '@typings/tokens';

export const TokenService = {
  getTokens(): ApiPromise<TokenShortType[]> {
    return api.get('/general/getCoinProjectList');
  },
  getTokenConnections(): ApiPromise<TokenConnectionType[]> {
    return api.get('/general/getTokenConnections');
  },
};
