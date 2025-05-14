import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-20">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Transform Educational Experiences with AI-Powered Psychology
            </h1>
            <p className="text-xl mb-8">
              EdPsych Connect bridges education and psychology, providing personalised learning experiences, assessment tools, and curriculum planning for the UK educational system.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/register" className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
                Get Started
              </Link>
              <button
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="bg-indigo-400 rounded-lg shadow-xl w-full h-80 flex items-center justify-center">
              <div className="text-white text-4xl font-bold">EdPsych Connect</div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-white rounded-t-3xl"></div>
    </section>
  );
}