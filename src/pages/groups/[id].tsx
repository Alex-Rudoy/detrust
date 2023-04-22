import { GetServerSideProps } from 'next';

import { DegenGroupPage, DegenGroupPageProps } from '@views/DegenGroupPage';

import { DegensService } from '@api/DegensService';

export default function DegenGroup(props: DegenGroupPageProps) {
  return <DegenGroupPage {...props} />;
}

export const getServerSideProps: GetServerSideProps<
  DegenGroupPageProps
> = async (ctx) => {
  try {
    const id = ctx.params?.id as string;
    if (!ctx.params?.id) {
      return {
        notFound: true,
      };
    }

    const [groupProjectsResponse, groupDegensResponse] = await Promise.all([
      DegensService.getGroupProjects(id),
      DegensService.getGroupDegens(id),
    ]);

    return {
      props: {
        degens: groupDegensResponse.data,
        projects: groupProjectsResponse.data, // todo: add type
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};
