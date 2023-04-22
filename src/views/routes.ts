export const routes = {
  tokens: () => '/tokens',
  tokenPage: (symbol: string) => `/tokens/${symbol}`,
  game: () => '/game',
  nft: () => '/nft',
  fund: () => '/fund',
  account: () => '/account',

  groupPage: (id: string) => `/groups/${id}`,
  degenPage: (id: string) => `/degens/${id}`,
};
