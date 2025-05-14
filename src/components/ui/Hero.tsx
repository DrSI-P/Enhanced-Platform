import Link from 'next/link';
import Image from 'next/image'; // Import Next.js Image component

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-primary-600 to-secondary-500 text-white pt-20 pb-10 md:pt-28 md:pb-16">
      {/* Added padding top to account for fixed navbar */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Transform Educational Experiences with AI-Powered Psychology
            </h1>
            <p className="text-lg sm:text-xl mb-10 max-w-xl mx-auto md:mx-0">
              EdPsych Connect bridges education and psychology, providing personalised learning experiences, assessment tools, and curriculum planning for the UK educational system.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <Link href="/register" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors text-lg shadow-md hover:shadow-lg">
                Get Started
              </Link>
              <button
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors text-lg shadow-md hover:shadow-lg"
              >
                Learn More
              </button>
            </div>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center md:justify-end">
            {/* Replace placeholder div with Image component */}
            <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl rounded-lg shadow-2xl overflow-hidden">
              <Image 
                src="/images/hero_graphic_v1.png" 
                alt="EdPsych Connect platform illustration showing connected ideas and learning" 
                width={600} // Intrinsic width of the generated image or desired display width
                height={400} // Intrinsic height or desired display height
                layout="responsive" // Makes image responsive within its container
                priority // Load hero image quickly
              />
            </div>
          </div>
        </div>
      </div>
      {/* Removed the curved bottom element for a cleaner, more modern look, can be re-added if desired */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-20 bg-white rounded-t-3xl"></div> */}
    </section>
  );
}
