export const routes = {
  tokens: () => '/tokens',
  tokenPage: (symbol: string) => `/tokens/${symbol}`,
  game: () => '/game',
  nft: () => '/nft',
  fund: () => '/fund',
  account: () => '/account',

  groupPage: (id: number) => `/groups/${id}`,
  degenPage: (username: string) => `/degens/${username}`,
};
