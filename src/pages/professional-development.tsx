import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Course categories
const categories = [
  'Assessment',
  'Intervention',
  'SEMH',
  'Neurodevelopmental',
  'Pedagogy',
  'Research',
  'Leadership'
];

// Sample courses
const courses = [
  {
    id: 'c001',
    title: 'Comprehensive Cognitive Assessment',
    description: 'Learn how to administer, score, and interpret cognitive assessments for educational purposes.',
    category: 'Assessment',
    level: 'Advanced',
    duration: '10 hours',
    instructor: 'Dr. Sarah Johnson',
    image: '/images/courses/cognitive-assessment.jpg',
    price: 199,
    rating: 4.8,
    reviews: 124,
    modules: [
      'Introduction to Cognitive Assessment',
      'Standardized Testing Procedures',
      'Interpreting Test Results',
      'Writing Comprehensive Reports',
      'Case Studies and Practice'
    ]
  },
  {
    id: 'c002',
    title: 'Evidence-Based Literacy Interventions',
    description: 'Explore research-backed approaches to supporting literacy development for struggling readers.',
    category: 'Intervention',
    level: 'Intermediate',
    duration: '8 hours',
    instructor: 'Prof. Michael Chen',
    image: '/images/courses/literacy-interventions.jpg',
    price: 149,
    rating: 4.7,
    reviews: 98,
    modules: [
      'Foundations of Literacy Development',
      'Phonological Awareness Interventions',
      'Fluency Building Strategies',
      'Comprehension Support Techniques',
      'Progress Monitoring and Adaptation'
    ]
  },
  {
    id: 'c003',
    title: 'Supporting Executive Function in the Classroom',
    description: 'Practical strategies for helping students develop executive function skills in educational settings.',
    category: 'Neurodevelopmental',
    level: 'Beginner',
    duration: '6 hours',
    instructor: 'Dr. Emily Rodriguez',
    image: '/images/courses/executive-function.jpg',
    price: 129,
    rating: 4.9,
    reviews: 156,
    modules: [
      'Understanding Executive Functions',
      'Working Memory Support',
      'Inhibitory Control Strategies',
      'Planning and Organization Tools',
      'Classroom Implementation'
    ]
  },
  {
    id: 'c004',
    title: 'Trauma-Informed Educational Practices',
    description: 'Develop skills to create trauma-sensitive learning environments that support all students.',
    category: 'SEMH',
    level: 'Intermediate',
    duration: '12 hours',
    instructor: 'Dr. James Wilson',
    image: '/images/courses/trauma-informed.jpg',
    price: 179,
    rating: 4.9,
    reviews: 203,
    modules: [
      'Understanding Trauma and Its Impact',
      'Recognizing Signs of Trauma',
      'Building Trauma-Sensitive Classrooms',
      'De-escalation Techniques',
      'Self-care for Educators',
      'Collaboration with Support Services'
    ]
  },
  {
    id: 'c005',
    title: 'Educational Research Methods',
    description: 'Learn how to design, conduct, and analyze educational research to inform evidence-based practice.',
    category: 'Research',
    level: 'Advanced',
    duration: '15 hours',
    instructor: 'Prof. Alicia Thompson',
    image: '/images/courses/research-methods.jpg',
    price: 249,
    rating: 4.6,
    reviews: 87,
    modules: [
      'Research Design Fundamentals',
      'Quantitative Methods',
      'Qualitative Approaches',
      'Mixed Methods Research',
      'Data Analysis Techniques',
      'Ethical Considerations',
      'Publishing and Dissemination'
    ]
  },
  {
    id: 'c006',
    title: 'Inclusive Leadership in Educational Psychology',
    description: 'Develop leadership skills to promote inclusive practices and lead multidisciplinary teams.',
    category: 'Leadership',
    level: 'Advanced',
    duration: '8 hours',
    instructor: 'Dr. Robert Patel',
    image: '/images/courses/inclusive-leadership.jpg',
    price: 189,
    rating: 4.7,
    reviews: 112,
    modules: [
      'Inclusive Leadership Principles',
      'Building Collaborative Teams',
      'Strategic Planning for Inclusion',
      'Managing Change and Resistance',
      'Evaluating Impact and Outcomes'
    ]
  }
];

// Certification tracks
const certificationTracks = [
  {
    title: 'Assessment Specialist',
    description: 'Become certified in comprehensive educational assessment practices.',
    courses: ['c001', 'c005'],
    additionalRequirements: 'Supervised practice and case study submission',
    duration: '6 months',
    cpd: 50
  },
  {
    title: 'Intervention Specialist',
    description: 'Develop expertise in designing and implementing evidence-based interventions.',
    courses: ['c002', 'c003', 'c004'],
    additionalRequirements: 'Implementation project and reflection',
    duration: '9 months',
    cpd: 75
  },
  {
    title: 'Educational Psychology Leader',
    description: 'Advanced certification for leadership roles in educational psychology.',
    courses: ['c004', 'c005', 'c006'],
    additionalRequirements: 'Leadership portfolio and professional interview',
    duration: '12 months',
    cpd: 100
  }
];

export default function ProfessionalDevelopment() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('courses');

  // Filter courses based on category and search query
  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory ? course.category === selectedCategory : true;
    const matchesSearch = searchQuery 
      ? course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  // Get course details if a course is selected
  const courseDetails = selectedCourse 
    ? courses.find(course => course.id === selectedCourse) 
    : null;

  return (
    <>
      <Head>
        <title>Professional Development | EdPsych Connect</title>
        <meta name="description" content="Professional development courses and certification for educational psychology professionals" />
      </Head>
      <Navbar />
      <main className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Professional Development</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enhance your skills and knowledge with our specialized courses and certification tracks.
            </p>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('courses')}
                className={`${
                  activeTab === 'courses'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Courses
              </button>
              <button
                onClick={() => setActiveTab('certification')}
                className={`${
                  activeTab === 'certification'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Certification Tracks
              </button>
              <button
                onClick={() => setActiveTab('cpd')}
                className={`${
                  activeTab === 'cpd'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                CPD Tracking
              </button>
            </nav>
          </div>

          {/* Tab content */}
          {activeTab === 'courses' && (
            <div>
              {selectedCourse ? (
                // Course details view
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{courseDetails?.title}</h2>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">Instructor: {courseDetails?.instructor}</p>
                    </div>
                    <button
                      onClick={() => setSelectedCourse(null)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      ← Back to courses
                    </button>
                  </div>
                  <div className="border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2 p-6">
                        <div className="mb-6">
                          <h3 className="text-lg font-medium text-gray-900 mb-2">About this course</h3>
                          <p className="text-gray-600">{courseDetails?.description}</p>
                        </div>
                        
                        <div className="mb-6">
                          <h3 className="text-lg font-medium text-gray-900 mb-2">What you'll learn</h3>
                          <ul className="list-disc pl-5 space-y-1">
                            {courseDetails?.modules.map((module, index) => (
                              <li key={index} className="text-gray-600">{module}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-2">Requirements</h3>
                          <ul className="list-disc pl-5 space-y-1">
                            <li className="text-gray-600">Professional experience in education or psychology</li>
                            <li className="text-gray-600">Basic understanding of educational principles</li>
                            <li className="text-gray-600">Computer with internet access</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-6">
                        <div className="mb-6">
                          <p className="text-3xl font-bold text-gray-900">£{courseDetails?.price}</p>
                          <button className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">
                            Enroll Now
                          </button>
                        </div>
                        
                        <div className="border-t border-gray-200 pt-4">
                          <h3 className="text-lg font-medium text-gray-900 mb-2">Course details</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Duration:</span>
                              <span className="text-gray-900">{courseDetails?.duration}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Level:</span>
                              <span className="text-gray-900">{courseDetails?.level}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Category:</span>
                              <span className="text-gray-900">{courseDetails?.category}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">CPD Points:</span>
                              <span className="text-gray-900">{parseInt(courseDetails?.duration || '0') * 2}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border-t border-gray-200 pt-4 mt-4">
                          <div className="flex items-center">
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} className={`h-5 w-5 ${i < Math.floor(courseDetails?.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <p className="ml-2 text-gray-900">{courseDetails?.rating} ({courseDetails?.reviews} reviews)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Course listing view
                <>
                  <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-4 md:mb-0">
                      <div className="relative rounded-md shadow-sm max-w-md">
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search courses..."
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-12 sm:text-sm border-gray-300 rounded-md py-2"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          selectedCategory === null
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        All
                      </button>
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`px-3 py-1 rounded-full text-sm ${
                            selectedCategory === category
                              ? 'bg-indigo-600 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.length > 0 ? (
                      filteredCourses.map((course) => (
                        <div key={course.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
                          <div className="h-40 bg-indigo-100 flex items-center justify-center">
                            <span className="text-indigo-600 font-bold text-xl">{course.category}</span>
                          </div>
                          <div className="p-6">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                              <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                                {course.level}
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                            <div className="flex justify-between items-center mb-4">
                              <div className="flex items-center">
                                <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="ml-1 text-sm text-gray-600">{course.rating} ({course.reviews})</span>
                              </div>
                              <span className="text-sm text-gray-600">{course.duration}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-lg font-bold text-gray-900">£{course.price}</span>
                              <button
                                onClick={() => setSelectedCourse(course.id)}
                                className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                              >
                                View Details →
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-full text-center py-12">
                        <p className="text-gray-500">No courses found matching your criteria.</p>
                        <button
                          onClick={() => {
                            setSelectedCategory(null);
                            setSearchQuery('');
                          }}
                          className="mt-2 text-indigo-600 hover:text-indigo-900"
                        >
                          Clear filters
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {activeTab === 'certification' && (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Certification Tracks</h2>
              <p className="text-gray-600 mb-8">
                Our certification tracks provide structured professional development pathways to develop specialized expertise.
                Each track includes a combination of courses, practical experience, and assessment.
              </p>
              
              <div className="space-y-8">
                {certificationTracks.map((track, index) => (
                  <div key={index} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{track.title}</h3>
                    <p className="text-gray-600 mb-4">{track.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Required Courses:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {track.courses.map((courseId) => {
                            const course = courses.find(c => c.id === courseId);
                            return (
                              <li key={courseId} className="text-gray-600">
                                {course?.title}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Additional Requirements:</h4>
                        <p className="text-gray-600">{track.additionalRequirements}</p>
                        
                        <div className="mt-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Duration:</span>
                            <span className="text-gray-900">{track.duration}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">CPD Points:</span>
                            <span className="text-gray-900">{track.cpd}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <button className="w-full md:w-auto px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                      Enroll in Certification Track
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'cpd' && (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">CPD Tracking</h2>
                <p className="text-gray-600">
                  Track and manage your Continuing Professional Development points.
                </p>
              </div>
              
              <div className="bg-indigo-50 p-6 rounded-lg mb-8">
                <div className="text-center">
                  <p className="text-sm text-indigo-600 mb-1">Your CPD Points</p>
                  <p className="text-4xl font-bold text-indigo-700">0</p>
                  <p className="text-sm text-indigo-600 mt-1">Sign in to track your CPD points</p>
                </div>
                
                <div className="mt-6 flex justify-center">
                  <Link href="/login" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                    Sign In
                  </Link>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">CPD Features</h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="border rounded-lg p-4">
                    <div className="text-indigo-600 text-xl mb-2">📊</div>
                    <h4 className="font-medium text-gray-900 mb-1">Track Your Progress</h4>
                    <p className="text-sm text-gray-600">
                      Monitor your CPD points and progress toward professional goals.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="text-indigo-600 text-xl mb-2">📝</div>
                    <h4 className="font-medium text-gray-900 mb-1">Record Activities</h4>
                    <p className="text-sm text-gray-600">
                      Log courses, workshops, conferences, and other professional activities.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="text-indigo-600 text-xl mb-2">📄</div>
                    <h4 className="font-medium text-gray-900 mb-1">Generate Reports</h4>
                    <p className="text-sm text-gray-600">
                      Create professional CPD reports for registration and accreditation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}