const testimonials = [
  {
    quote: "EdPsych Connect has transformed how we support students with learning differences. The personalized approach and evidence-based tools have made a significant impact on student outcomes.",
    name: "Dr. Emma Thompson",
    title: "Head of SEN Department, Oakridge Academy",
    initials: "ET",
    bgColor: "bg-indigo-500"
  },
  {
    quote: "As an educational psychologist, the assessment tools and collaborative features have streamlined my workflow and improved communication with schools and families.",
    name: "James Wilson",
    title: "Educational Psychologist, London Borough",
    initials: "JW",
    bgColor: "bg-blue-500"
  },
  {
    quote: "The curriculum planning tools have been invaluable for creating inclusive learning environments that address diverse student needs.",
    name: "Sarah Ahmed",
    title: "Curriculum Coordinator, Riverside School",
    initials: "SA",
    bgColor: "bg-purple-500"
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
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card bg-white">
              <div className="mb-6">
                <svg className="h-8 w-8 text-indigo-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-gray-700 mb-6 italic">{testimonial.quote}</p>
              <div className="flex items-center">
                <div className="mr-4">
                  <div className={`${testimonial.bgColor} w-12 h-12 rounded-full flex items-center justify-center text-white font-bold`}>
                    {testimonial.initials}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
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