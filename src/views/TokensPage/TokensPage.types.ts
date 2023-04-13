import { TokenConnectionType, TokenShortType } from '@typings/tokens';

export type TokensPageProps = {
  tokens: TokenShortType[];
  tokenConnections: TokenConnectionType[];
};
