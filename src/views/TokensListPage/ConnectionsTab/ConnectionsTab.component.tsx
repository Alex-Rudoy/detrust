import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import ForceGraph, { ForceGraphMethods } from 'react-force-graph-3d';
import {
  CSS2DRenderer,
  CSS2DObject,
} from 'three/examples/jsm/renderers/CSS2DRenderer.js';

import { Text, TextSizeEnum } from '@components/Text';

import { primary_dark_900 } from '@utils/colors';
import { isBrowser } from '@utils/isBrowser';

import {
  GraphLink,
  GraphNode,
  TokensListPageProps,
} from '../TokensListPage.types';

import styles from './ConnectionsTab.module.scss';

export const ConnectionsTabComponent = ({
  nodes,
  links,
}: TokensListPageProps) => {
  const router = useRouter();
  const fgRef = useRef<ForceGraphMethods | undefined>();
  const [hoverNode, setHoverNode] = useState<GraphNode | null>(null);
  const [highlightedNodes, setHighlightedNodes] = useState<Set<GraphNode>>(
    new Set(),
  );
  const [highlightedLinks, setHighlightedLinks] = useState<Set<GraphLink>>(
    new Set(),
  );
  const [iterationStopped, setIterationStopped] = useState<boolean>(false);

  const handleNodeHover = (node: GraphNode) => {
    if (node === hoverNode) return;

    highlightedNodes.clear();
    highlightedLinks.clear();

    if (node) {
      highlightedNodes.add(node);
      node.neighbors.forEach((neighbor) => highlightedNodes.add(neighbor));
      node.links.forEach((link) => highlightedLinks.add(link));
    }

    setHoverNode(node || null);
    setHighlightedNodes(new Set(highlightedNodes));
    setHighlightedLinks(new Set(highlightedLinks));

    if (iterationStopped) return;
    setIterationStopped(true);

    nodes.forEach((node) => {
      node.fx = node.x;
      node.fy = node.y;
      node.fz = node.z;
    });
  };

  useEffect(() => {
    if (!isBrowser(window)) return;
    if (!fgRef.current) return;

    links.forEach((link) => {
      const userNode = nodes.find((node) => node.id === link.target);
      const tokenNode = nodes.find((node) => node.id === link.source);
      if (!userNode || !tokenNode) return;
      userNode.neighbors.push(tokenNode);
      userNode.links.push(link);
      tokenNode.neighbors.push(userNode);
      tokenNode.links.push(link);
    });

    fgRef.current?.d3Force('link')?.distance(() => 800);
  }, [fgRef.current, isBrowser(window)]);

  const handleNodeClick = (node: GraphNode) => {
    if (node.type === 'token') {
      router.push(`/tokens/${node.id.replace('token_', '')}`);
    }
    if (node.type === 'user') {
      router.push(`/degens/${node.id.replace('user_', '')}`);
    }
  };

  return (
    <div>
      <Text size={TextSizeEnum.S12} className={styles.heading}>
        Chart shows top project and their connections between each other, and
        top users in the community
      </Text>
      <div className={styles.graphContainer}>
        <ForceGraph
          ref={fgRef}
          graphData={{ nodes, links }}
          enableNodeDrag={false}
          backgroundColor={primary_dark_900}
          height={600}
          nodeColor={'color'}
          nodeOpacity={1}
          onNodeHover={(node) => handleNodeHover(node as GraphNode)}
          onNodeClick={(node) => handleNodeClick(node as GraphNode)}
          nodeThreeObjectExtend={true}
          linkColor={(link) =>
            highlightedNodes.size
              ? highlightedLinks.has(link as GraphLink)
                ? 'white'
                : '#666'
              : 'white'
          }
          linkWidth={(link) =>
            highlightedLinks.has(link as GraphLink) ? 3 : 1
          }
          linkOpacity={0.3}
          nodeRelSize={10}
          // @ts-ignore
          extraRenderers={[new CSS2DRenderer()]}
          // @ts-ignore
          nodeThreeObject={(n) => {
            const node = n as GraphNode;

            if (highlightedNodes.size && !highlightedNodes.has(node)) {
              return null;
            }

            const nodeEl = document.createElement('div');
            nodeEl.textContent = node.label;
            nodeEl.classList.add(styles.nodeLabel);
            nodeEl.classList.add(styles[node.type]);

            if (!highlightedNodes.size) {
              nodeEl.classList.add(styles.small);
            }

            return new CSS2DObject(nodeEl);
          }}
        />
      </div>
    </div>
  );
};

ConnectionsTabComponent.displayName = 'ConnectionsTab';
