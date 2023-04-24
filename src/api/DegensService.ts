import { api } from '.';

import { FetchDegenResponse } from '@store/degens/degen/degen.types';
import { FetchDegensListResponse } from '@store/degens/degensList/degensList.types';
import { FetchGroupsResponse } from '@store/degens/groups/groups.types';
import { FetchGroupTokensResponse } from '@store/degens/groupTokens/groupTokens.types';
import { FetchTokenMentionsResponse } from '@store/tokens/tokenPrice/tokenPrice.types';

export const DegensService = {
  getGroups(): Promise<FetchGroupsResponse> {
    return api.get('/general/groupList');
  },

  getGroupTokens(id: number): Promise<FetchGroupTokensResponse> {
    return api.get(`/general/groupProjects/${id}`);
  },

  getGroupDegens(id: number): Promise<FetchDegensListResponse> {
    return api.get(`/general/getProjectInfluencersStatByGroup/${id}`);
  },

  getDegen(username: string): Promise<FetchDegenResponse> {
    return api.get(`/general/degen_stat/${username}`);
  },

  getDegenTags(username: string): Promise<any> {
    return api.get(`/general/degen_tags/${username}`);
  },

  getDegenTokens(username: string): Promise<any> {
    return api.get(`/general/degen_tokens/${username}`);
  },

  getDegenTokenMentions(
    username: string,
    symbol: string,
  ): Promise<FetchTokenMentionsResponse> {
    return api.get(`/general/project_mentions_degen/${username}/${symbol}`);
  },
};
