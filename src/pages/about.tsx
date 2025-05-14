import Head from 'next/head';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function About() {
  return (
    <>
      <Head>
        <title>About Us | EdPsych Connect</title>
        <meta name="description" content="Learn about EdPsych Connect's mission and team" />
      </Head>
      <Navbar />
      <main className="bg-white">
        {/* Hero Section */}
        <div className="bg-indigo-600 text-white py-16">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold mb-4">About EdPsych Connect</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Bridging the gap between educational psychology and classroom practice to transform learning experiences.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                EdPsych Connect was founded with a clear mission: to create a seamless bridge between educational psychology and everyday classroom practice. We believe that every student deserves a learning experience tailored to their unique needs, strengths, and challenges.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our platform empowers educational psychologists, teachers, and parents to collaborate effectively, using data-driven insights and evidence-based approaches to support student development and achievement.
              </p>
              <p className="text-lg text-gray-600">
                By combining cutting-edge technology with deep expertise in educational psychology, we're transforming how educational support is delivered across the UK educational system.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Our Leadership Team</h2>
            
            <div className="grid md:grid-cols-3 gap-12">
              {/* Team Member 1 */}
              <div className="text-center">
                <div className="w-32 h-32 bg-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  SP
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Dr. Scott Patrick</h3>
                <p className="text-indigo-600 mb-2">Founder & CEO</p>
                <p className="text-gray-600">
                  Educational Psychologist with over 15 years of experience in the UK educational system.
                </p>
              </div>
              
              {/* Team Member 2 */}
              <div className="text-center">
                <div className="w-32 h-32 bg-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  JD
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Dr. Jane Davis</h3>
                <p className="text-indigo-600 mb-2">Chief Research Officer</p>
                <p className="text-gray-600">
                  Specialist in educational assessment and curriculum development with a focus on inclusive practices.
                </p>
              </div>
              
              {/* Team Member 3 */}
              <div className="text-center">
                <div className="w-32 h-32 bg-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  MT
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Mark Thompson</h3>
                <p className="text-indigo-600 mb-2">Chief Technology Officer</p>
                <p className="text-gray-600">
                  Technology leader with expertise in AI and educational technology platforms.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Our Values</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Evidence-Based Practice</h3>
                <p className="text-gray-600">
                  We ground our approach in rigorous research and proven methodologies to ensure effective outcomes.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Collaborative Approach</h3>
                <p className="text-gray-600">
                  We believe in bringing together all stakeholders in a child's education to create holistic support systems.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Personalization</h3>
                <p className="text-gray-600">
                  We recognize that each learner is unique, and we tailor our approaches to individual needs and contexts.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}