import { GetServerSideProps } from 'next';

import { TokensListPage, TokensListPageProps } from '@views/TokensListPage';
import { TokenService } from '@api/TokenService';

export default function Tokens(props: TokensListPageProps) {
  return <TokensListPage {...props} />;
}

export const getServerSideProps: GetServerSideProps<
  TokensListPageProps
> = async () => {
  const [tokensResponse, tokenConnectionsResponse] = await Promise.all([
    TokenService.getTokens(),
    TokenService.getTokenConnections(),
  ]);
  const tokens = tokensResponse.data;
  const tokenConnections = tokenConnectionsResponse.data;

  const minX = tokens.reduce(
    (acc, token) => (token.x < acc ? token.x : acc),
    Infinity,
  );
  const maxX = tokens.reduce(
    (acc, token) => (token.x > acc ? token.x : acc),
    0,
  );
  const minY = tokens.reduce(
    (acc, token) => (token.y < acc ? token.y : acc),
    Infinity,
  );
  const maxY = tokens.reduce(
    (acc, token) => (token.y > acc ? token.y : acc),
    0,
  );

  return {
    props: {
      tokens,
      tokenConnections,
      aggregatedData: {
        minX,
        maxX,
        minY,
        maxY,
      },
    },
  };
};
