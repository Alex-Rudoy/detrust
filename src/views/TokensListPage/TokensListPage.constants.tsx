import { ConnectionsTab } from './ConnectionsTab';
import { ConnectionsTab2Component } from './ConnectionsTab/ConnectionsTab2.component';
import { ListTab } from './ListTab';
import { VisualizationsTab } from './VisualizationsTab';
import { TokensListPageProps } from './TokensListPage.types';

export const TokensListPageTabComponents: Record<
  string,
  React.FC<TokensListPageProps>
> = {
  Visualizations: VisualizationsTab,
  Connections: ConnectionsTab,
  Connections3d: ConnectionsTab2Component,
  List: ListTab,
};

export const TokensListPageTabs = Object.keys(TokensListPageTabComponents).map(
  (key) => ({
    value: key,
    label: key,
  }),
);
