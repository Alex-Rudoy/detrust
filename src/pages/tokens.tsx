import { GetServerSideProps } from 'next';

import { TokensListPage, TokensListPageProps } from '@views/TokensListPage';
import { TokenService } from '@api/TokenService';
import { TokenConnectionType, TokenShortType } from '@typings/tokens';

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

  return {
    props: {
      tokens: tokensResponse.data,
      chartBoundaries: getBoundaries(tokensResponse.data),
      ...prepareGraph(tokensResponse.data, tokenConnectionsResponse.data),
      ...prepareGraph2(tokensResponse.data, tokenConnectionsResponse.data),
    },
  };
};

function prepareGraph(
  tokens: TokenShortType[],
  tokenConnectionsRaw: TokenConnectionType[],
) {
  const uniqueTokens = new Set(tokens.map((token) => token.id));
  const tokenConnections = tokenConnectionsRaw.filter((connection) =>
    uniqueTokens.has(connection.target_id),
  );

  const edges = tokenConnections.map((connection) => ({
    data: {
      target: `user_${connection.follower_username}`,
      source: `token_${connection.target_id}`,
    },
  }));

  const tokenNodes: cytoscape.ElementDefinition[] = tokens.map((token) => ({
    data: {
      id: `token_${token.id}`,
      label: token.project_name,
    },
    ...generateNodeStyles('#5c98f1'),
  }));

  const uniqueUsers = [
    ...new Set(tokenConnections.map((c) => c.follower_username)),
  ];

  const userNodes: cytoscape.ElementDefinition[] = uniqueUsers.map(
    (username) => ({
      data: { id: `user_${username}`, label: username },
      ...generateNodeStyles('#32d583'),
    }),
  );

  const nodes = [...tokenNodes, ...userNodes];

  return { nodes, edges };
}

function prepareGraph2(
  tokens: TokenShortType[],
  tokenConnectionsRaw: TokenConnectionType[],
) {
  const uniqueTokens = new Set(tokens.map((token) => token.id));
  const tokenConnections = tokenConnectionsRaw.filter((connection) =>
    uniqueTokens.has(connection.target_id),
  );

  const edges2 = tokenConnections.map((connection) => ({
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

  const nodes2 = [...tokenNodes, ...userNodes];

  return { nodes2, edges2 };
}

function generateNodeStyles(color: string) {
  return {
    grabbable: false,
    style: {
      width: 75,
      height: 75,
      backgroundColor: color,
      label: 'data(name)',
      'text-valign': 'center',
      color: 'white',
      'text-outline-color': color,
      'text-outline-width': 2,
    },
  };
}

function getBoundaries(tokens: TokenShortType[]) {
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
