import Head from 'next/head';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';

export default function About() {
  const bioParagraphs = [
    "**Dr. Scott Ighavongbe Patrick, DEdPsych, CPsychol, is the Managing Director of EdPsych Connect Limited and a HCPC Registered Chartered Child and Adolescent Educational Psychologist with over fourteen years of dedicated experience in transforming young lives. His profound passion lies in empowering learners by providing meticulously tailored, evidence-based support and interventions, designed to enhance not only their educational experiences but their overall well-being.**",
    "Recently augmenting his extensive expertise with an accreditation in clinical supervision through SDS, Dr. Patrick consistently champions best practice and professional development within the field of educational psychology. He is a fervent advocate for inclusive education, tirelessly working to cultivate learning environments that ensure equitable access for all children and young people, with a particular focus on those from disadvantaged backgrounds.",
    "Dr. Patrick’s doctoral research, the intellectual and inspirational cornerstone of the EdPsych Connect platform, is encapsulated in his work, *\"Restoring Genius: How Education Can Nurture Every Child’s Unique Path.\"* This research explores compassionate, alternative approaches to understanding and supporting student needs, moving beyond traditional, often rigid, educational models. His work emphasises the critical importance of relationship-building and delves into the underlying causes of behaviour, frequently drawing upon the principles of Restorative Justice Practices, Humanistic Theories, and insightful frameworks such as Tomkins' Theory of Affect Script and Nathanson’s Compass of Shame.",
    "His personal journey through an education system that did not always recognise his own potential has deeply informed his professional ethos. These experiences ignited a desire to understand and dismantle the obstacles faced by so many young learners, leading to years of research into the lived experiences of children, particularly those excluded from mainstream schooling. Dr. Patrick’s work seeks to amplify their voices, advocating for an educational model that values creativity, inclusion, emotional well-being, and student agency – a model where education becomes a truly transformative, rather than merely transactional, experience.",
    "Beyond his profound psychological expertise, Dr. Patrick brings a robust background in sales management. This diverse experience has been instrumental in honing his negotiation and facilitation skills, enabling him to effectively engage with and support even the most hard-to-reach children, their families, and diverse stakeholder groups.",
    "Dr. Patrick's life story, marked by resilience and the overcoming of adversity, has indelibly shaped his values and fuels an unwavering commitment to giving back to the community. It is this powerful blend of professional expertise, research-driven insight, personal dedication, and a visionary approach to \"restoring genius\" that underpins the mission of EdPsych Connect: to revolutionise educational support through innovative, evidence-based, and deeply compassionate solutions, ensuring every child has the opportunity to discover and cultivate their unique potential."
  ];

  return (
    <>
      <Head>
        <title>About Us | EdPsych Connect</title>
        <meta name="description" content="Learn about EdPsych Connect's mission, vision, and the driving force behind our innovative platform, Dr. Scott Ighavongbe Patrick." />
      </Head>
      <Navbar />
      <main className="bg-white text-brand-dark-blue">
        {/* Hero Section */}
        <div className="bg-brand-primary text-white py-20 md:py-28">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About EdPsych Connect</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Pioneering a new vision for education, bridging psychology and practice to unlock every child's potential.
            </p>
          </div>
        </div>

        {/* Founder Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
              <div className="lg:w-1/3 text-center lg:text-left">
                <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto lg:mx-0 mb-6 rounded-full overflow-hidden shadow-2xl border-4 border-brand-accent">
                  <Image 
                    src="/images/team/Dr_Scott_Ighavongbe_Patrick.PNG"
                    alt="Dr. Scott Ighavongbe Patrick, Managing Director of EdPsych Connect"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-brand-dark-blue mb-2">Dr. Scott Ighavongbe Patrick</h2>
                <p className="text-xl text-brand-secondary font-semibold mb-4">DEdPsych, CPsychol</p>
                <p className="text-lg text-gray-700">Managing Director, EdPsych Connect Ltd.</p>
                <p className="text-lg text-gray-700">HCPC Registered Chartered Educational Psychologist</p>
              </div>
              <div className="lg:w-2/3">
                <h3 className="text-2xl md:text-3xl font-semibold text-brand-dark-blue mb-6 border-b-2 border-brand-accent pb-3">Pioneering a New Vision for Education</h3>
                {bioParagraphs.map((paragraph, index) => {
                  const parts = paragraph.split(/(\*.*?\*|\*\".*?\".*?\*)/g); // Split by bold/italic markdown
                  return (
                    <p key={index} className="text-lg text-gray-700 mb-6 leading-relaxed">
                      {parts.map((part, i) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                          return <strong key={i}>{part.slice(2, -2)}</strong>;
                        } else if (part.startsWith('*\"') && part.endsWith('\"*')) {
                          return <em key={i} className="font-semibold">{part.slice(3, -3)}</em>;
                        } else if (part.startsWith('*') && part.endsWith('*')) {
                          return <em key={i}>{part.slice(1, -1)}</em>;
                        }
                        return part;
                      })}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 md:py-24 bg-brand-light-gray">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark-blue mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                EdPsych Connect was founded with a clear mission: to create a seamless bridge between educational psychology and everyday classroom practice. We believe that every student deserves a learning experience tailored to their unique needs, strengths, and challenges.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Our platform empowers educational psychologists, teachers, and parents to collaborate effectively, using data-driven insights and evidence-based approaches to support student development and achievement.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                By combining cutting-edge technology with deep expertise in educational psychology, we're transforming how educational support is delivered across the UK educational system, inspired by the vision of "Restoring Genius" in every child.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section - Re-styled with new brand colours */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark-blue mb-12 text-center">Our Core Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-brand-accent bg-opacity-20 rounded-full flex items-center justify-center text-brand-accent mb-6">
                  {/* Placeholder for a relevant icon - e.g., Brain, Lightbulb */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <h3 className="text-2xl font-semibold text-brand-dark-blue mb-3">Evidence-Based Practice</h3>
                <p className="text-gray-700 leading-relaxed">
                  We ground our approach in rigorous research and proven methodologies to ensure effective, impactful outcomes.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-brand-accent bg-opacity-20 rounded-full flex items-center justify-center text-brand-accent mb-6">
                  {/* Placeholder for a relevant icon - e.g., People, Handshake */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                </div>
                <h3 className="text-2xl font-semibold text-brand-dark-blue mb-3">Collaborative Approach</h3>
                <p className="text-gray-700 leading-relaxed">
                  We believe in uniting all stakeholders in a child’s education to create holistic, effective support systems.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-brand-accent bg-opacity-20 rounded-full flex items-center justify-center text-brand-accent mb-6">
                  {/* Placeholder for a relevant icon - e.g., Target, Individual Focus */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                </div>
                <h3 className="text-2xl font-semibold text-brand-dark-blue mb-3">Personalised Support</h3>
                <p className="text-gray-700 leading-relaxed">
                  We recognise that each learner is unique. Our approaches are always tailored to individual needs and contexts.
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

