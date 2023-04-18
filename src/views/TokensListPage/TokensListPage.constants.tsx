import { ConnectionsTab } from './ConnectionsTab';
import { ListTab } from './ListTab';
import { VisualizationsTab } from './VisualizationsTab';

import { TokensListPageProps } from './TokensListPage.types';

export const TokensListPageTabComponents: Record<
  string,
  React.FC<TokensListPageProps>
> = {
  Visualizations: VisualizationsTab,
  Connections: ConnectionsTab,
  List: ListTab,
};

export const TokensListPageTabs = Object.keys(TokensListPageTabComponents).map(
  (key) => ({
    value: key,
    label: key,
  }),
);
