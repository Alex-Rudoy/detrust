export type TokenShortType = {
  id: number;
  project_name: string;
  contract_address: string;
  categories: string;
  description: string;
  twitter_screen_name: string;
  buying_power: number;
  project_count_followers_10k: number;
  project_count_followers_10k_scaled: number;
  x: number;
  y: number;
  project_token_ranked_followers_10k: number;
  project_token_ranked_followers_10k_scaled: number;
  holders_value: number;
  holders_value_scaled: number;
  holders_count: number;
  holders_count_scaled: number;
  volume_to_mc: number;
  volume_to_mc_scaled: number;
  general_score: number;
};

export type TokenConnectionType = {
  username: string;
  target_id: number;
  name: string;
  follower_username: string;
};
