import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-500 text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Transform Educational Experiences?
        </h2>
        <p className="text-xl mb-10 max-w-3xl mx-auto">
          Join educators, psychologists, and specialists across the UK who are using EdPsych Connect to create more effective, personalised learning environments.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/register" className="px-8 py-3 rounded-lg font-semibold bg-white text-primary-600 hover:bg-primary-50 transition-colors text-lg shadow-md hover:shadow-lg">
            Get Started Today
          </Link>
          <Link href="/contact" className="px-8 py-3 rounded-lg font-semibold border-2 border-white text-white hover:bg-white/20 transition-colors text-lg shadow-md hover:shadow-lg">
            Contact Our Team
          </Link>
        </div>
      </div>
    </section>
  );
}
