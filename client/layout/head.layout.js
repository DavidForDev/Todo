import Head from "next/head";

const Header = ({ pageTitle }) => {
  return (
    <Head>
      <title>{pageTitle}</title>
    </Head>
  );
};

export default Header;
