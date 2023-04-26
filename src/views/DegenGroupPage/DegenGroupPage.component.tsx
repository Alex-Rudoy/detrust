import { useRouter } from 'next/router';

import { DegensTableSection } from '@ui/DegensTableSection';
import { Layout } from '@ui/Layout';
import { GroupTokensSection } from './GroupTokensSection';

import { useGroupsSelector } from '@store/degens/groups/useGroupsSelector';

export const DegenGroupPageComponent = () => {
  const { groups } = useGroupsSelector();
  const router = useRouter();
  const id = router.query.id as string;

  const groupName = groups.find((group) => group.category_id === +id)?.category;

  return (
    <Layout
      activeMenuLink={groupName}
      breadcrumbs={['Groups', groupName || '...']}
      title={`Groups | ${groupName}`}
      description={`Comprehensive info about ${groupName}`}
    >
      <GroupTokensSection />
      <DegensTableSection />
    </Layout>
  );
};

DegenGroupPageComponent.displayName = 'DegenGroupPage';
