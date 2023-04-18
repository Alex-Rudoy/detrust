import {
  TokenInfluencerType,
  TokenPriceChartItemType,
  TokenType,
} from '@typings/tokens';

export type TokenPageProps = {
  token: TokenType;
  tokenPrice: TokenPriceChartItemType[];
  tokenInfluencers: TokenInfluencerType[];
};
