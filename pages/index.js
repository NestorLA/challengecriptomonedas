import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

// components
import Navigation from "../components/Navigation";
import CardWallet from "../components/CardWallet";

export default function Home() {
  return (
    <>
      <Head>
        <title>Criptomonedas</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />
      <CardWallet />
    </>
  );
}
