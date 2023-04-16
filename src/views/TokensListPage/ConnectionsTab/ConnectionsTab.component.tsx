import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import CytoscapeComponent from 'react-cytoscapejs';

import { routes } from '@views/routes';
import { TokensListPageProps } from '../TokensListPage.types';

export const ConnectionsTabComponent = ({
  nodes,
  edges,
}: TokensListPageProps) => {
  const cyRef = useRef<cytoscape.Core>();
  const router = useRouter();

  useEffect(() => {
    if (!cyRef.current) return;
    cyRef.current.on('tap', 'node', (event) => {
      const node = event.target;
      const nodeId = node.id();
      if (!nodeId.startsWith('token_')) return;
      router.push(routes.tokenPage(nodeId.replace('token_', '')));
    });
  }, [cyRef]);

  return (
    <CytoscapeComponent
      cy={(cy) => (cyRef.current = cy)}
      elements={CytoscapeComponent.normalizeElements({
        nodes,
        edges,
      })}
      layout={{
        name: 'breadthfirst',
        directed: true,
        circle: true,
        spacingFactor: 20,
      }}
      style={{
        height: '600px',
        border: '1px solid var(--primary-400)',
        marginTop: '24px',
      }}
    />
  );
};

ConnectionsTabComponent.displayName = 'ConnectionsTab';
