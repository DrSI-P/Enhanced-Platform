import Link from 'next/link';
import Head from 'next/head';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { NextPageContext } from 'next';

interface ErrorProps {
  statusCode?: number;
}

function ErrorPage({ statusCode }: ErrorProps) {
  const title = statusCode
    ? `Error ${statusCode} | EdPsych Connect`
    : 'An Error Occurred | EdPsych Connect';
  const heading = statusCode ? `${statusCode}` : 'Oops!';
  const message =
    statusCode === 404
      ? 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.'
      : statusCode
      ? `An unexpected error occurred on the server (Code: ${statusCode}). We are working to fix the problem.`
      : 'An unexpected error occurred. We are working to fix the problem.';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={message} />
      </Head>
      <Navbar />
      <main className="bg-gray-50 min-h-[calc(100vh-128px)] flex items-center">
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-9xl font-bold text-indigo-600 mb-4">{heading}</h1>
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            {statusCode === 404 ? 'Page Not Found' : 'Server Error'}
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {message}
          </p>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Please try again later, or if the issue persists, feel free to contact our support team.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/" className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
              Return to Home
            </Link>
            <Link href="/contact" className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
              Contact Support
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;

