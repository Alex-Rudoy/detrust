import { TokenType } from '@typings/tokens';

export type TokensListPageProps = {
  tokens: TokenType[];
  nodes: GraphNode[];
  links: GraphLink[];
  chartBoundaries: {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  };
};

export type GraphNode = {
  id: string;
  type: 'token' | 'user';
  label: string;
  color: string;
  neighbors: GraphNode[];
  links: GraphLink[];
  x?: number;
  y?: number;
  z?: number;
  fx?: number;
  fy?: number;
  fz?: number;
};

export type GraphLink = { source: string; target: string };
