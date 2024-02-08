import { NextPageContext } from "next";
import Head from "next/head";
import Link from "next/link";

const ErrorPage = ({ statusCode }: any) => {
  return (
    <>
      <Head>
        <title>page Error</title>
      </Head>
      <div className="w-full h-full flex justify-center items-center flex-col gap-3">
        <h3 className="text-5xl font-bold">{statusCode}</h3>
        <p>Oops! No such page exists</p>
        <Link href="/" className="text-[blue]" prefetch={false}>
          Back
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
