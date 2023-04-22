import { GetStaticProps } from 'next';

import {
  GraphLink,
  GraphNode,
  TokensListPage,
  TokensListPageProps,
} from '@views/TokensListPage';

import { primary_400, success_400 } from '@utils/colors';
import { TokenService } from '@api/TokenService';

import { TokenConnectionType, TokenType } from '@typings/tokens';

export default function Tokens(props: TokensListPageProps) {
  return <TokensListPage {...props} />;
}

export const getStaticProps: GetStaticProps<TokensListPageProps> = async () => {
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
      revalidate: 10, // In seconds
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
): {
  nodes: GraphNode[];
  links: GraphLink[];
} {
  const uniqueTokens = new Set(tokens.map((token) => token.id));
  const tokenConnections = tokenConnectionsRaw.filter((connection) =>
    uniqueTokens.has(connection.target_id),
  );

  const links = tokenConnections.map((connection) => ({
    target: `user_${connection.follower_username}`,
    source: `token_${connection.target_id}`,
  }));

  const tokenNodes: GraphNode[] = tokens.map((token) => ({
    id: `token_${token.id}`,
    type: 'token',
    symbol: token.symbol,
    label: token.project_name,
    color: primary_400,
    neighbors: [],
    links: [],
  }));

  const uniqueUsers = [
    ...new Set(tokenConnections.map((c) => c.follower_username)),
  ];

  const userNodes: GraphNode[] = uniqueUsers.map((username) => ({
    id: `user_${username}`,
    type: 'user',
    label: username,
    color: success_400,
    neighbors: [],
    links: [],
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
