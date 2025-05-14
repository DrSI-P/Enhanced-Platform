import Head from 'next/head';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/ui/Hero';
import FeatureSection from '@/components/ui/FeatureSection';
import TestimonialSection from '@/components/ui/TestimonialSection';
import CtaSection from '@/components/ui/CtaSection';

export default function Home() {
  return (
    <>
      <Head>
        <title>EdPsych Connect | AI-Powered Educational Platform</title>
        <meta name="description" content="A comprehensive educational platform bridging education and psychology with innovative features for learners, educators, parents, and specialists." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <Hero />
        <FeatureSection />
        <TestimonialSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}