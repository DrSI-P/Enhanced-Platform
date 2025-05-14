import { Quote } from 'lucide-react'; // Using Lucide icon for quotes

const testimonials = [
  {
    quote: "EdPsych Connect has transformed how we support students with learning differences. The personalised approach and evidence-based tools have made a significant impact on student outcomes.",
    name: "Dr. Emma Thompson",
    title: "Head of SEN Department, Oakridge Academy",
    initials: "ET",
    bgColor: "bg-primary-500" // Using primary color from Tailwind config
  },
  {
    quote: "As an educational psychologist, the assessment tools and collaborative features have streamlined my workflow and improved communication with schools and families.",
    name: "James Wilson",
    title: "Educational Psychologist, London Borough",
    initials: "JW",
    bgColor: "bg-secondary-500" // Using secondary color
  },
  {
    quote: "The curriculum planning tools have been invaluable for creating inclusive learning environments that address diverse student needs.",
    name: "Sarah Ahmed",
    title: "Curriculum Coordinator, Riverside School",
    initials: "SA",
    bgColor: "bg-accent-teal" // Using an accent color
  }
];

export default function TestimonialSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">What Educators Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from professionals who have transformed their educational practice with EdPsych Connect.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out flex flex-col">
              <div className="mb-6 text-primary-500">
                <Quote size={36} className="transform -scale-x-100" /> {/* Lucide Quote icon, scaled for visual balance */}
              </div>
              <p className="text-gray-700 mb-6 italic text-base leading-relaxed flex-grow">{testimonial.quote}</p>
              <div className="flex items-center mt-auto pt-6 border-t border-gray-200">
                <div className="mr-4 flex-shrink-0">
                  <div className={`${testimonial.bgColor} w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md`}>
                    {testimonial.initials}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
