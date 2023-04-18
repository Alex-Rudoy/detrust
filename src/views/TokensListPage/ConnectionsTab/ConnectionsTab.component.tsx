import dynamic from 'next/dynamic';

import { TokensListPageProps } from '../TokensListPage.types';

const ForceGraph3D = dynamic(() => import('react-force-graph-3d'), {
  ssr: false,
});

export const ConnectionsTabComponent = ({
  nodes,
  links,
}: TokensListPageProps) => {
  return <ForceGraph3D graphData={{ nodes, links }} />;
};

ConnectionsTabComponent.displayName = 'ConnectionsTab';
