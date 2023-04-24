import { END } from 'redux-saga';

import { DegenGroupPage } from '@views/DegenGroupPage';

import { DegensService } from '@api/DegensService';
import { fetchDegensListForGroupAction } from '@store/degens/degensList/degensList.reducer';
import { fetchGroupTokensAction } from '@store/degens/groupTokens/groupTokens.reducer';
import { SagaStore, wrapper } from '@store/index';

export default function DegenGroup() {
  return <DegenGroupPage />;
}

export const getStaticProps = wrapper.getStaticProps((store) => async (ctx) => {
  const id = ctx.params?.id as string;
  if (!id) {
    return {
      notFound: true,
    };
  }

  store.dispatch(fetchGroupTokensAction({ id: +id }));
  store.dispatch(fetchDegensListForGroupAction({ id: +id }));

  store.dispatch(END);
  await (store as SagaStore).sagaTask.toPromise();

  if (
    !store.getState().groupTokens.groupTokens.length &&
    !store.getState().degensList.degensList.length
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
  const res = await DegensService.getGroups();

  const paths = res.data.map(({ category_id: id }) => ({
    params: { id: id.toString() },
  }));

  return { paths, fallback: 'blocking' };
}
