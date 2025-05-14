export default function CtaSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-indigo-600 to-blue-500 text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Transform Educational Experiences?
        </h2>
        <p className="text-xl mb-10 max-w-3xl mx-auto">
          Join educators, psychologists, and specialists across the UK who are using EdPsych Connect to create more effective, personalized learning environments.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="#" className="px-6 py-3 rounded-lg font-semibold bg-white text-indigo-600 hover:bg-gray-100 transition-colors">
            Get Started Today
          </a>
          <a href="#" className="px-6 py-3 rounded-lg font-semibold border border-white text-white hover:bg-white/10 transition-colors">
            Contact Our Team
          </a>
        </div>
      </div>
    </section>
  );
}