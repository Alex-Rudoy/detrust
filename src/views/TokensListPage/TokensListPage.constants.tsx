import dynamic from 'next/dynamic';

import { ListTab } from './ListTab';
import { VisualizationsTab } from './VisualizationsTab';

import { TokensListPageProps } from './TokensListPage.types';

const ConnectionsTab = dynamic(
  () => import('./ConnectionsTab').then((mod) => mod.ConnectionsTab),
  {
    ssr: false,
  },
);

export const TokensListPageTabComponents: Record<
  string,
  React.FC<TokensListPageProps>
> = {
  Visualizations: VisualizationsTab,
  Connections: ConnectionsTab as React.FC,
  List: ListTab,
};

export const TokensListPageTabs = Object.keys(TokensListPageTabComponents).map(
  (key) => ({
    value: key,
    label: key,
  }),
);
