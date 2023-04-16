import { TokenShortType } from '@typings/tokens';

export type TokensListPageProps = {
  tokens: TokenShortType[];
  nodes: cytoscape.NodeDefinition[];
  edges: cytoscape.EdgeDefinition[];
  chartBoundaries: {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  };
};
