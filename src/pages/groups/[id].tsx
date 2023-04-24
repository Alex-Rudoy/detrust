import { END } from 'redux-saga';

import { DegenGroupPage } from '@views/DegenGroupPage';

import { DegensService } from '@api/DegensService';
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
  // store.dispatch(fetchGrou({ id }));

  store.dispatch(END);
  await (store as SagaStore).sagaTask.toPromise();

  return {
    props: {},
    revalidate: 10,
  };
});

export async function getStaticPaths() {
  const res = await DegensService.getGroups();

  const paths = res.data.map(({ category_id: id }) => ({
    params: { id },
  }));

  return { paths, fallback: 'blocking' };
}
