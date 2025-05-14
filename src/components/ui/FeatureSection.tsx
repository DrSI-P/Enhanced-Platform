import React from 'react';

const features = [
  {
    title: 'AI-Powered Personalization',
    description: 'Adaptive learning paths tailored to individual student needs, learning styles, and progress.',
    color: 'bg-indigo-500',
  },
  {
    title: 'Assessment Portal',
    description: 'Comprehensive assessment tools for educational psychologists with detailed reporting and analysis.',
    color: 'bg-blue-500',
  },
  {
    title: 'Curriculum Planning',
    description: 'Evidence-based curriculum planning tools aligned with UK educational standards and frameworks.',
    color: 'bg-purple-500',
  },
  {
    title: 'Collaborative Workspace',
    description: 'Secure environment for educators, parents, and specialists to collaborate on student support.',
    color: 'bg-teal-500',
  },
];

export default function FeatureSection() {
  return (
    <section id="features" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Innovative Features</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform combines educational psychology with cutting-edge technology to create a comprehensive support system.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card hover:border-indigo-500 transition-all">
              <div className="mb-4 flex justify-center">
                <div className={`${feature.color} p-4 rounded-full w-16 h-16 flex items-center justify-center text-white font-bold text-xl`}>
                  {feature.title.charAt(0)}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}