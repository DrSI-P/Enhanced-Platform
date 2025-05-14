import React from 'react';
import { Zap, BarChart2, BookOpen, Users, Brain, ShieldCheck, UsersRound, Lightbulb } from 'lucide-react'; // Import relevant Lucide icons

const features = [
  {
    title: 'AI-Powered Personalisation',
    description: 'Adaptive learning paths tailored to individual student needs, learning styles, and progress.',
    color: 'bg-primary-500',
    icon: <Zap size={28} />,
  },
  {
    title: 'Assessment Portal',
    description: 'Comprehensive assessment tools for educational psychologists with detailed reporting and analysis.',
    color: 'bg-secondary-500',
    icon: <BarChart2 size={28} />,
  },
  {
    title: 'Curriculum Planning',
    description: 'Evidence-based curriculum planning tools aligned with UK educational standards and frameworks.',
    color: 'bg-accent-purple',
    icon: <BookOpen size={28} />,
  },
  {
    title: 'Collaborative Workspace',
    description: 'Secure environment for educators, parents, and specialists to collaborate on student support.',
    color: 'bg-accent-teal',
    icon: <Users size={28} />,
  },
  // Adding a few more example features based on project continuity note for better visual representation
  {
    title: 'Executive Dysfunction Support',
    description: 'Tools and resources to support students with executive dysfunction challenges.',
    color: 'bg-primary-600', // Using a darker primary shade
    icon: <Brain size={28} />,
  },
  {
    title: 'SEMH Support Tools',
    description: 'Specialised tools for Social, Emotional, and Mental Health support.',
    color: 'bg-secondary-600', // Using a darker secondary shade
    icon: <ShieldCheck size={28} />,
  },
  {
    title: 'Professional Development',
    description: 'CPD resources and modules for educators and psychologists.',
    color: 'bg-purple-600', // Example, assuming a darker accent shade or new accent
    icon: <UsersRound size={28} />,
  },
  {
    title: 'Interactive Learning',
    description: 'Engaging and interactive content to maximise student motivation.',
    color: 'bg-teal-600', // Example, assuming a darker accent shade or new accent
    icon: <Lightbulb size={28} />,
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out hover:border-primary-500 border-2 border-transparent">
              <div className="mb-6 flex justify-center">
                <div className={`${feature.color} p-4 rounded-full w-20 h-20 flex items-center justify-center text-white`}>
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">{feature.title}</h3>
              <p className="text-gray-700 text-sm text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
