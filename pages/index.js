import Head from "next/head";

import { useEffect } from "react";

// components
import CoinsShower from "../components/CoinsShower";

import { useAppContext } from "../context/AppContext";

export default function Home({ data }) {
  const { setCoins } = useAppContext();

  useEffect(() => {
    setCoins(data);
  }, [data]);

  return (
    <>
      <Head>
        <title>Criptomonedas</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-center h4">Crypto Price</h1>
      <h2 className="text-center h5 text-muted">Price change in the last 24h</h2>
      <CoinsShower coins={data} />
    </>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false`
  );
  const data = await res.json();
  // Pass data to the page via props
  return { props: { data } };
};
