import dynamic from 'next/dynamic';

import { TokensListPageProps } from '../TokensListPage.types';

const ForceGraph3D = dynamic(() => import('react-force-graph-3d'), {
  ssr: false,
});

export const ConnectionsTab2Component = ({
  nodes2,
  edges2,
}: TokensListPageProps) => {
  return <ForceGraph3D graphData={{ nodes: nodes2, links: edges2 }} />;
};

ConnectionsTab2Component.displayName = 'ConnectionsTab2';
