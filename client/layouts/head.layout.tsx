import Head from "next/head";

const HeadLayout = ({ title }: any) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

export default HeadLayout;
