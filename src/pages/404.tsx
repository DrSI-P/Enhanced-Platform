import Link from 'next/link';
import Head from 'next/head';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found | EdPsych Connect</title>
        <meta name="description" content="The page you are looking for could not be found" />
      </Head>
      <Navbar />
      <main className="bg-gray-50 min-h-screen flex items-center">
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-9xl font-bold text-indigo-600 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Page Not Found</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
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