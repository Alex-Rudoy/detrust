import { END } from 'redux-saga';

import { DegenPage } from '@views/DegenPage';

import { DegensService } from '@api/DegensService';
import { fetchDegenInfoAction } from '@store/degens/degenInfo/degenInfo.reducer';
import { DegenType } from '@store/degens/degensList/degensList.types';
import { fetchDegenTagsAction } from '@store/degens/degenTags/degenTags.reducer';
import { fetchDegenTokensAction } from '@store/degens/degenTokens/degenTokens.reducer';
import { SagaStore, wrapper } from '@store/index';

import { requestStatusEnum } from '@typings/requestStatus';

export default function Degen() {
  return <DegenPage />;
}

export const getStaticProps = wrapper.getStaticProps((store) => async (ctx) => {
  if (!ctx.params?.username) {
    return {
      notFound: true,
    };
  }

  store.dispatch(
    fetchDegenInfoAction({ username: ctx.params.username as string }),
  );
  store.dispatch(
    fetchDegenTagsAction({ username: ctx.params.username as string }),
  );
  store.dispatch(
    fetchDegenTokensAction({ username: ctx.params.username as string }),
  );

  store.dispatch(END);
  await (store as SagaStore).sagaTask.toPromise();

  if (
    store.getState().degenInfo.status !== requestStatusEnum.SUCCESS ||
    store.getState().degenTags.status !== requestStatusEnum.SUCCESS ||
    store.getState().degenTokens.status !== requestStatusEnum.SUCCESS
  ) {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
    revalidate: 10,
  };
});

export async function getStaticPaths() {
  const groupsRes = await DegensService.getGroups();
  const promises = groupsRes.data.map((group) =>
    DegensService.getGroupDegens(group.category_id),
  );
  const responses = await Promise.all(promises);
  const degens: DegenType[] = [];
  responses.forEach((res) => {
    degens.push(...res.data);
  });
  const paths = degens.map(({ username }) => ({
    params: { username },
  }));

  return { paths, fallback: 'blocking' };
}
