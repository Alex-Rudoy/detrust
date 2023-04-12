
export default function Home() {
  return;
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/tokens',
      permanent: false,
    },
  };
}
