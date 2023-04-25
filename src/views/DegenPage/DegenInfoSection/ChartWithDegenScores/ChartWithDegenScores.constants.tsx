import { DegenInfoType } from '@store/degens/degenInfo/degenInfo.types';

export const generateChartWithDegenScoresData = (degenInfo: DegenInfoType) => [
  {
    quality: 'popularity_scaled',
    percent: degenInfo.popularity_scaled,
    fullMark: 1,
    domain: [0, 1],
  },
  {
    quality: 'big_followers_scaled',
    percent: degenInfo.big_followers_scaled,
    fullMark: 1,
    domain: [0, 1],
  },
  {
    quality: 'followers_count_scaled',
    percent: degenInfo.followers_count_scaled,
    fullMark: 1,
    domain: [0, 1],
  },
  {
    quality: 'influence_scaled',
    percent: degenInfo.influence_scaled,
    fullMark: 1,
    domain: [0, 1],
  },
  {
    quality: 'price_change_scaled',
    percent: degenInfo.price_change_scaled,
    fullMark: 1,
    domain: [0, 1],
  },
  {
    quality: 'assets_scaled',
    percent: degenInfo.assets_scaled,
    fullMark: 1,
    domain: [0, 1],
  },
];

export const tickLabels = {
  popularity_scaled: {
    title: 'Popularity',
    description: 'Daily average content views',
    key: 'popularity',
    isPercent: false,
    dy: '-2.5em',
  },
  big_followers_scaled: {
    title: 'Big Followers',
    description: 'Amount of big followers',
    key: 'big_followers',
    isPercent: false,
    dy: '-0.5em',
  },
  followers_count_scaled: {
    title: 'Followers',
    description: 'Count of followers',
    key: 'followers_count',
    isPercent: false,
    dy: '-0.5em',
  },
  influence_scaled: {
    title: 'Influence',
    description: 'Amount of influencers from top 10K list in current domain',
    key: 'influence',
    isPercent: false,
    dy: '0.5em',
  },
  price_change_scaled: {
    title: 'Predictive score',
    description: 'Price change after the mention',
    key: 'price_change',
    isPercent: true,
    dy: '-0.5em',
  },
  assets_scaled: {
    title: 'Assets',
    description: 'How much users assets costs',
    key: 'assets',
    isPercent: false,
    dy: '-0.5em',
  },
};
