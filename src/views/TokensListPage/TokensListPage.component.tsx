import { useEffect, useState } from 'react';

import { Layout } from '@ui/Layout';
import { TabBar } from '@ui/TabBar';
import {
  TokensListPageTabComponents,
  TokensListPageTabs,
} from './TokensListPage.constants';

import { useTokenConnectionsSelector } from '@store/tokens/tokenConnections/useTokenConnectionsSelector';
import { useTokensActions } from '@store/tokens/useTokensActions';

import { requestStatusEnum } from '@typings/requestStatus';

export const TokensListPageComponent = () => {
  const [selectedTab, setSelectedTab] = useState('Visualizations');
  const { fetchTokenConnectionsAction } = useTokensActions();
  const { status } = useTokenConnectionsSelector();

  useEffect(() => {
    if (status !== requestStatusEnum.INITIAL) return;
    fetchTokenConnectionsAction();
  }, []);

  const TabComponent = TokensListPageTabComponents[selectedTab];

  return (
    <Layout
      activeMenuLink="Tokens"
      breadcrumbs={['Tokens']}
      title={'Tokens'}
      description={
        'Visualization, connections and comprehensive list of tokens.'
      }
    >
      <TabBar
        options={TokensListPageTabs}
        selectedTab={selectedTab}
        onTabClick={(value) => setSelectedTab(value)}
      />
      <TabComponent />
    </Layout>
  );
};

TokensListPageComponent.displayName = 'TokensListPage';
