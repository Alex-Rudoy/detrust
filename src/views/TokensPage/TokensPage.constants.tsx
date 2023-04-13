import { ListTab } from './ListTab';
import { VisualizationsTab } from './VisualizationsTab';
import { TokensPageProps } from './TokensPage.types';

export const TokenPageTabComponents: Record<
  string,
  React.FC<TokensPageProps>
> = {
  Visualizations: VisualizationsTab,
  Connections: ListTab,
  List: ListTab,
};

export const TokensPageTabs = Object.keys(TokenPageTabComponents).map(
  (key) => ({
    value: key,
    label: key,
  }),
);
