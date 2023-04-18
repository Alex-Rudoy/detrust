import { GetServerSideProps } from 'next';

import { TokensListPage, TokensListPageProps } from '@views/TokensListPage';

import { TokenService } from '@api/TokenService';

import { TokenConnectionType, TokenType } from '@typings/tokens';

export default function Tokens(props: TokensListPageProps) {
  return <TokensListPage {...props} />;
}

export const getServerSideProps: GetServerSideProps<
  TokensListPageProps
> = async () => {
  try {
    const [tokensResponse, tokenConnectionsResponse] = await Promise.all([
      TokenService.getTokens(),
      TokenService.getTokenConnections(),
    ]);

    return {
      props: {
        tokens: tokensResponse.data,
        chartBoundaries: getBoundaries(tokensResponse.data),
        ...prepareGraph(tokensResponse.data, tokenConnectionsResponse.data),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

function prepareGraph(
  tokens: TokenType[],
  tokenConnectionsRaw: TokenConnectionType[],
) {
  const uniqueTokens = new Set(tokens.map((token) => token.id));
  const tokenConnections = tokenConnectionsRaw.filter((connection) =>
    uniqueTokens.has(connection.target_id),
  );

  const links = tokenConnections.map((connection) => ({
    target: `user_${connection.follower_username}`,
    source: `token_${connection.target_id}`,
  }));

  const tokenNodes = tokens.map((token) => ({
    id: `token_${token.id}`,
    label: token.project_name,
  }));

  const uniqueUsers = [
    ...new Set(tokenConnections.map((c) => c.follower_username)),
  ];

  const userNodes = uniqueUsers.map((username) => ({
    id: `user_${username}`,
    label: username,
  }));

  const nodes = [...tokenNodes, ...userNodes];

  return { nodes, links };
}

function getBoundaries(tokens: TokenType[]) {
  let minX = tokens.reduce(
    (acc, token) => (token.x < acc ? token.x : acc),
    Infinity,
  );
  let maxX = tokens.reduce((acc, token) => (token.x > acc ? token.x : acc), 0);
  let minY = tokens.reduce(
    (acc, token) => (token.y < acc ? token.y : acc),
    Infinity,
  );
  let maxY = tokens.reduce((acc, token) => (token.y > acc ? token.y : acc), 0);

  const deltaX = (maxX - minX) * 0.05;
  const deltaY = (maxY - minY) * 0.05;

  minX -= deltaX;
  maxX += deltaX;
  minY -= deltaY;
  maxY += deltaY;

  return { minX, maxX, minY, maxY };
}
