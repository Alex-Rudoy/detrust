import { END } from 'redux-saga';

import { DegenPage } from '@views/DegenPage';

import { DegensService } from '@api/DegensService';
import { fetchDegenAction } from '@store/degens/degen/degen.reducer';
import { DegenType } from '@store/degens/degen/degen.types';
import { SagaStore, wrapper } from '@store/index';

export default function Degen() {
  return <DegenPage />;
}

export const getStaticProps = wrapper.getStaticProps((store) => async (ctx) => {
  if (!ctx.params?.username) {
    return {
      notFound: true,
    };
  }

  store.dispatch(fetchDegenAction({ username: ctx.params.username as string }));

  store.dispatch(END);
  await (store as SagaStore).sagaTask.toPromise();

  if (!store.getState().degen.degen.username) {
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
