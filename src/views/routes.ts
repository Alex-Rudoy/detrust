export const routes = (params?: Record<string, string>) => ({
  tokens: '/tokens',
  tokenPage: `/tokens/${params?.name}`,

  game: '/game',
  nft: '/nft',
  fund: '/fund',
  account: '/account',
});
