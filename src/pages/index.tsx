export default function Home() {
  return;
}

export async function getStaticProps() {
  return {
    redirect: {
      destination: '/tokens',
      permanent: false,
    },
  };
}
