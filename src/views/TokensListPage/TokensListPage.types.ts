import { TokenType } from '@typings/tokens';

export type TokensListPageProps = {
  tokens: TokenType[];
  nodes: { id: string; label: string }[];
  links: { source: string; target: string }[];
  chartBoundaries: {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  };
};
