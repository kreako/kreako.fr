import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>kreako - home</title>
        <meta name="description" content="home of kreako.fr" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="text-red-600">HEllo</div>
    </>
  );
};

export default Home;
