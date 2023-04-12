import { TokensPage } from '@/views/TokensPage';

export default function Tokens() {
  return <TokensPage />;
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}
