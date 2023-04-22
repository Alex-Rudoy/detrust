export type GroupShortType = {
  category: string;
  category_id: number;
};

export type DegenType = {
  id: `${number}`;
  mentions_count: number;
  username: string;
  project_id: `${number}`;
  price_change: number;
  positive_mentions_count: number;
  positive_price_change: number;
  negative_mentions_count: number;
  negative_price_change: number;
  reputation: number;
  won: number;
};
