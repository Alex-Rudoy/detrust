import { useState } from 'react';

import { Layout } from '@ui/Layout';
import { TabBar } from '@ui/TabBar';
import {
  TokensListPageTabComponents,
  TokensListPageTabs,
} from './TokensListPage.constants';

import { TokensListPageProps } from './TokensListPage.types';

export const TokensListPageComponent = (props: TokensListPageProps) => {
  const [selectedTab, setSelectedTab] = useState('Visualizations');

  const TabComponent = TokensListPageTabComponents[selectedTab];

  return (
    <Layout activeMenuLink="Tokens" breadcrumbs={['Tokens']}>
      <TabBar
        options={TokensListPageTabs}
        selectedTab={selectedTab}
        onTabClick={(value) => setSelectedTab(value)}
      />
      <TabComponent {...props} />
    </Layout>
  );
};

TokensListPageComponent.displayName = 'TokensListPage';
