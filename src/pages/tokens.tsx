
export default function Tokens() {
  return (
    <main>
      <h1>Token list</h1>
    </main>
  );
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}
