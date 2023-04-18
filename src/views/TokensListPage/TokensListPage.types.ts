import { TokenType } from '@typings/tokens';

export type TokensListPageProps = {
  tokens: TokenType[];
  nodes: cytoscape.NodeDefinition[];
  edges: cytoscape.EdgeDefinition[];
  nodes2: { id: string; label: string }[];
  edges2: { source: string; target: string }[];
  chartBoundaries: {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  };
};
