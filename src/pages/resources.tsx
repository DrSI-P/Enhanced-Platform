import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MCPToolDemo from '@/components/resources/MCPToolDemo';

// Resource categories and items
const resources = [
  {
    category: 'Educational Psychology Guides',
    items: [
      {
        title: 'Understanding Learning Differences',
        description: 'A comprehensive guide to identifying and supporting various learning differences in the classroom.',
        type: 'PDF Guide',
        link: '#'
      },
      {
        title: 'Cognitive Development in Early Years',
        description: 'Research-based insights into cognitive development stages and supportive interventions.',
        type: 'Research Paper',
        link: '#'
      },
      {
        title: 'Behavioral Support Strategies',
        description: 'Practical strategies for managing and supporting positive behavior in educational settings.',
        type: 'Toolkit',
        link: '#'
      }
    ]
  },
  {
    category: 'Assessment Tools',
    items: [
      {
        title: 'Formative Assessment Framework',
        description: 'A structured approach to implementing effective formative assessment in diverse learning environments.',
        type: 'Framework',
        link: '#'
      },
      {
        title: 'Cognitive Abilities Screening',
        description: 'Screening tools to identify cognitive strengths and areas for development.',
        type: 'Assessment Tool',
        link: '#'
      },
      {
        title: 'Social-Emotional Development Tracker',
        description: 'Tools for monitoring and supporting social-emotional development across age ranges.',
        type: 'Interactive Tool',
        link: '#'
      }
    ]
  },
  {
    category: 'Curriculum Resources',
    items: [
      {
        title: 'Inclusive Curriculum Design',
        description: 'Guidelines for creating inclusive curriculum materials that support all learners.',
        type: 'Design Guide',
        link: '#'
      },
      {
        title: 'Differentiation Strategies',
        description: 'Practical approaches to differentiating instruction for diverse learning needs.',
        type: 'Strategy Guide',
        link: '#'
      },
      {
        title: 'Cross-Curricular Planning Templates',
        description: 'Templates and examples for effective cross-curricular planning aligned with UK standards.',
        type: 'Templates',
        link: '#'
      }
    ]
  }
];

export default function Resources() {
  const [activeTab, setActiveTab] = useState('resources');
  
  return (
    <>
      <Head>
        <title>Resources | EdPsych Connect</title>
        <meta name="description" content="Educational psychology resources, assessment tools, and curriculum materials" />
      </Head>
      <Navbar />
      <main className="bg-white">
        {/* Hero Section */}
        <div className="bg-indigo-600 text-white py-16">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold mb-4">Resources</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Access our collection of educational psychology resources, assessment tools, and curriculum materials.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-6">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab('resources')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'resources'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Resources Library
              </button>
              <button
                onClick={() => setActiveTab('tools')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'tools'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Interactive Tools
              </button>
            </div>
          </div>
        </div>

        {/* Resources Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Featured Resources</h2>
                <p className="text-gray-600">
                  Browse our curated collection of resources designed to support educational psychologists, teachers, and parents.
                </p>
              </div>
              
              {resources.map((category, categoryIndex) => (
                <div key={categoryIndex} className="mb-12">
                  <h3 className="text-xl font-semibold text-indigo-600 mb-6 pb-2 border-b border-gray-200">
                    {category.category}
                  </h3>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="p-6">
                          <div className="text-xs font-semibold text-indigo-500 uppercase tracking-wide mb-1">
                            {item.type}
                          </div>
                          <h4 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h4>
                          <p className="text-gray-600 mb-4">{item.description}</p>
                          <Link href={item.link} className="text-indigo-600 hover:text-indigo-800 font-medium">
                            Access Resource →
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              {/* Request Resources Section */}
              <div className="bg-gray-50 rounded-lg p-8 mt-12">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Need Specific Resources?</h3>
                <p className="text-gray-600 mb-6">
                  If you're looking for specific resources or have suggestions for new materials, we'd love to hear from you.
                </p>
                <Link href="/contact" className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 inline-block">
                  Request Resources
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Tools Section */}
        {activeTab === 'tools' && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-6">
              <div className="max-w-5xl mx-auto">
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Interactive Tools</h2>
                  <p className="text-gray-600">
                    Experience our AI-powered tools designed to provide personalized support and insights.
                  </p>
                </div>
                
                <div className="mb-12">
                  <MCPToolDemo />
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6 mb-12">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">VR Learning Environment Demo</h3>
                  <p className="text-gray-600 mb-6">
                    Our VR Learning Environments provide safe, customizable spaces for students with EBSA to gradually
                    acclimate to classroom settings.
                  </p>
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg flex items-center justify-center mb-6">
                    <div className="text-gray-500 text-center p-8">
                      <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                      </svg>
                      <p>VR Demo requires WebXR support</p>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <button className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 inline-block">
                      Launch VR Demo
                    </button>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Learning Recommendations Engine</h3>
                  <p className="text-gray-600 mb-6">
                    Our AI-powered learning recommendations engine provides personalized activity suggestions based on
                    student profiles, learning goals, and progress data.
                  </p>
                  <div className="bg-indigo-50 p-4 rounded-lg mb-6">
                    <p className="text-indigo-700">
                      Sign in to access the Learning Recommendations Engine and receive personalized suggestions.
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <Link href="/login" className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 inline-block">
                      Sign In to Access
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}