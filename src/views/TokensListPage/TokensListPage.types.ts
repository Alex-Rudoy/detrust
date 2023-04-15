import { TokenConnectionType, TokenShortType } from '@typings/tokens';

export type TokensListPageProps = {
  tokens: TokenShortType[];
  tokenConnections: TokenConnectionType[];
  aggregatedData: {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  };
};
