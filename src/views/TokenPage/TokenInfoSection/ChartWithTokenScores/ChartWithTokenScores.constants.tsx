import { TokenType } from '@store/tokens/token/token.types';

export const generateChartWithTokenScoresData = (token: TokenType) => [
  {
    quality: 'project_count_followers_10k_scaled',
    percent: token.project_count_followers_10k_scaled,
    fullMark: 1,
  },
  {
    quality: 'buying_power',
    percent: token.buying_power,
    fullMark: 1,
  },
  {
    quality: 'holders_count_scaled',
    percent: token.holders_count_scaled,
    fullMark: 1,
  },
  {
    quality: 'project_token_ranked_followers_10k_scaled',
    percent: token.project_token_ranked_followers_10k_scaled,
    fullMark: 1,
  },
  {
    quality: 'holders_value_scaled',
    percent: token.holders_value_scaled,
    fullMark: 1,
  },
  {
    quality: 'volume_to_mc',
    percent: token.volume_to_mc,
    fullMark: 1,
  },
];

export const tickLabels = {
  project_count_followers_10k_scaled: {
    title: 'Big followers',
    description: 'Amount of followers with more than 10K Followers',
    key: 'project_count_followers_10k',
    isPercent: false,
    dy: '-2.5em',
  },
  buying_power: {
    title: 'Buying power',
    description: 'Buying Power of subject community',
    key: 'buying_power',
    isPercent: true,
    dy: '-0.5em',
  },
  holders_count_scaled: {
    title: 'Holders count',
    description: 'Count of unique token holders',
    key: 'holders_count',
    isPercent: false,
    dy: '-0.5em',
  },
  project_token_ranked_followers_10k_scaled: {
    title: 'Influence',
    description: 'Amount of influencers from top 10K list in current domain',
    key: 'project_token_ranked_followers_10k',
    isPercent: false,
    dy: '0.5em',
  },
  holders_value_scaled: {
    title: 'Holders value',
    description: 'Amount of top 1000 holders capital',
    key: 'holders_value',
    isPercent: false,
    dy: '-0.5em',
  },
  volume_to_mc: {
    title: 'Volume to MC',
    description: 'AVG daily volume to MC',
    key: 'volume_to_mc',
    isPercent: true,
    dy: '-0.5em',
  },
};
