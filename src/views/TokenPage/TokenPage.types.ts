import {
  TokenInfluencerType,
  TokenPriceChartItemType,
  TokenShortType,
} from '@typings/tokens';

export type TokenPageProps = {
  token: TokenShortType;
  tokenPrice: TokenPriceChartItemType[];
  tokenInfluencers: TokenInfluencerType[];
};
