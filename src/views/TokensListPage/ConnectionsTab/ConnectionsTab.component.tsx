import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import ForceGraph, { ForceGraphMethods } from 'react-force-graph-3d';
import {
  CSS2DRenderer,
  CSS2DObject,
} from 'three/examples/jsm/renderers/CSS2DRenderer.js';

import { Text, TextSizeEnum } from '@components/Text';

import { primary_dark_900 } from '@utils/colors';
import { deepCopy } from '@utils/deepCopy';
import { isBrowser } from '@utils/isBrowser';
import {
  GraphNode,
  GraphLink,
} from '@store/tokens/tokenConnections/tokenConnections.types';
import { useTokenConnectionsSelector } from '@store/tokens/tokenConnections/useTokenConnectionsSelector';

import { requestStatusEnum } from '@typings/requestStatus';

import styles from './ConnectionsTab.module.scss';

export const ConnectionsTabComponent = () => {
  const { nodes, links, status } = useTokenConnectionsSelector();
  const router = useRouter();
  const fgRef = useRef<ForceGraphMethods | undefined>();
  const localNodes = useRef<GraphNode[]>([]);
  const localLinks = useRef<GraphLink[]>([]);
  const [hoverNode, setHoverNode] = useState<GraphNode | null>(null);
  const [highlightedNodes, setHighlightedNodes] = useState<Set<GraphNode>>(
    new Set(),
  );
  const [highlightedLinks, setHighlightedLinks] = useState<Set<GraphLink>>(
    new Set(),
  );
  const [iterationStopped, setIterationStopped] = useState<boolean>(false);

  useEffect(() => {
    if (!isBrowser(window)) return;
    if (!fgRef.current) return;
    if (status !== requestStatusEnum.SUCCESS) return;

    if (!localNodes.current.length) {
      deepCopy(nodes).forEach((node) => localNodes.current.push(node));
      deepCopy(links).forEach((link) => localLinks.current.push(link));
    }

    localLinks.current.forEach((link) => {
      const node1 = localNodes.current.find((node) => node.id === link.target);
      const node2 = localNodes.current.find((node) => node.id === link.source);
      if (!node1 || !node2) return;
      node1.neighbors.push(node2);
      node1.links.push(link);
      node2.neighbors.push(node1);
      node2.links.push(link);
    });

    fgRef.current?.d3Force('link')?.distance(() => 800);
  }, [isBrowser(window), status]);

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

    localNodes.current.forEach((node) => {
      node.fx = node.x;
      node.fy = node.y;
      node.fz = node.z;
    });
  };

  const handleNodeClick = (node: GraphNode) => {
    router.push(`/${node.type}/${node.link}`);
  };

  // if (status !== requestStatusEnum.SUCCESS) return null;

  return (
    <div>
      <Text size={TextSizeEnum.S12} className={styles.heading}>
        The graph shows the top related projects based on their community.
      </Text>
      <div className={styles.graphContainer}>
        <ForceGraph
          ref={fgRef}
          graphData={{ nodes: localNodes.current, links: localLinks.current }}
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
