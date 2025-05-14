import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Executive function areas
const executiveFunctions = [
  {
    name: 'Working Memory',
    description: 'The ability to hold information in mind and manipulate it.',
    strategies: [
      'Break tasks into smaller steps',
      'Use visual aids and written instructions',
      'Create checklists and use planners',
      'Practice memory games and activities'
    ],
    icon: '🧠'
  },
  {
    name: 'Cognitive Flexibility',
    description: 'The ability to switch between thinking about different concepts or to think about multiple concepts simultaneously.',
    strategies: [
      'Practice transitioning between activities',
      'Use visual schedules to prepare for changes',
      'Play games that require changing rules',
      'Teach problem-solving with multiple solutions'
    ],
    icon: '🔄'
  },
  {
    name: 'Inhibitory Control',
    description: 'The ability to inhibit or control impulsive responses and resist distractions.',
    strategies: [
      'Create structured environments with minimal distractions',
      'Teach self-monitoring techniques',
      'Practice mindfulness and breathing exercises',
      'Use visual reminders for expected behaviors'
    ],
    icon: '✋'
  },
  {
    name: 'Planning and Organization',
    description: 'The ability to manage current and future-oriented task demands.',
    strategies: [
      'Use visual organizers and planners',
      'Break long-term projects into manageable steps',
      'Create templates for recurring tasks',
      'Establish consistent routines and systems'
    ],
    icon: '📝'
  },
  {
    name: 'Time Management',
    description: 'The ability to estimate time, allocate time, and stay within time limits and deadlines.',
    strategies: [
      'Use timers and visual timers',
      'Create schedules with time estimates',
      'Break tasks into timed intervals',
      'Practice estimating how long tasks will take'
    ],
    icon: '⏱️'
  },
  {
    name: 'Emotional Regulation',
    description: 'The ability to manage emotions to achieve goals, complete tasks, or control behavior.',
    strategies: [
      'Teach emotional vocabulary and recognition',
      'Create calm-down spaces and routines',
      'Practice mindfulness and relaxation techniques',
      'Use visual supports for emotional regulation'
    ],
    icon: '😌'
  }
];

// Assessment questions
const assessmentQuestions = [
  {
    id: 'wm1',
    category: 'Working Memory',
    question: 'How often do you forget what you were doing in the middle of a task?',
  },
  {
    id: 'wm2',
    category: 'Working Memory',
    question: 'How difficult is it to remember multi-step instructions?',
  },
  {
    id: 'cf1',
    category: 'Cognitive Flexibility',
    question: 'How challenging is it to adapt when plans change unexpectedly?',
  },
  {
    id: 'cf2',
    category: 'Cognitive Flexibility',
    question: 'How difficult is it to switch between different tasks or activities?',
  },
  {
    id: 'ic1',
    category: 'Inhibitory Control',
    question: 'How often do you act without thinking through consequences?',
  },
  {
    id: 'ic2',
    category: 'Inhibitory Control',
    question: 'How easily are you distracted by unrelated stimuli?',
  },
  {
    id: 'po1',
    category: 'Planning and Organization',
    question: 'How difficult is it to organize materials and belongings?',
  },
  {
    id: 'po2',
    category: 'Planning and Organization',
    question: 'How challenging is it to plan steps needed to complete a project?',
  },
  {
    id: 'tm1',
    category: 'Time Management',
    question: 'How often do you underestimate how long tasks will take?',
  },
  {
    id: 'tm2',
    category: 'Time Management',
    question: 'How difficult is it to meet deadlines without last-minute rushes?',
  },
  {
    id: 'er1',
    category: 'Emotional Regulation',
    question: 'How challenging is it to manage frustration when things don\'t go as planned?',
  },
  {
    id: 'er2',
    category: 'Emotional Regulation',
    question: 'How often do emotions interfere with completing tasks or goals?',
  },
];

export default function ExecutiveDysfunction() {
  const [activeTab, setActiveTab] = useState('overview');
  const [assessmentResponses, setAssessmentResponses] = useState<Record<string, number>>({});
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  const [results, setResults] = useState<Record<string, number>>({});

  const handleAssessmentChange = (id: string, value: number) => {
    setAssessmentResponses(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const calculateResults = () => {
    const categoryScores: Record<string, { total: number, count: number }> = {};
    
    // Initialize categories
    executiveFunctions.forEach(ef => {
      categoryScores[ef.name] = { total: 0, count: 0 };
    });
    
    // Sum up scores by category
    Object.entries(assessmentResponses).forEach(([id, score]) => {
      const question = assessmentQuestions.find(q => q.id === id);
      if (question) {
        const category = categoryScores[question.category];
        category.total += score;
        category.count += 1;
      }
    });
    
    // Calculate averages
    const finalResults: Record<string, number> = {};
    Object.entries(categoryScores).forEach(([category, { total, count }]) => {
      finalResults[category] = count > 0 ? Math.round((total / count) * 10) / 10 : 0;
    });
    
    setResults(finalResults);
    setAssessmentComplete(true);
  };

  const resetAssessment = () => {
    setAssessmentResponses({});
    setAssessmentComplete(false);
    setResults({});
  };

  return (
    <>
      <Head>
        <title>Executive Dysfunction | EdPsych Connect</title>
        <meta name="description" content="Learn about executive function skills and strategies for supporting executive dysfunction" />
      </Head>
      <Navbar />
      <main className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Executive Function Support</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding and supporting executive function skills for better learning and daily functioning.
            </p>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`${
                  activeTab === 'overview'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('assessment')}
                className={`${
                  activeTab === 'assessment'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Self-Assessment
              </button>
              <button
                onClick={() => setActiveTab('strategies')}
                className={`${
                  activeTab === 'strategies'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Strategies
              </button>
              <button
                onClick={() => setActiveTab('resources')}
                className={`${
                  activeTab === 'resources'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Resources
              </button>
            </nav>
          </div>

          {/* Tab content */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">What are Executive Functions?</h2>
                <p className="text-gray-600 mb-6">
                  Executive functions are a set of cognitive processes that are necessary for the cognitive control of behavior. 
                  They include abilities such as working memory, cognitive flexibility, inhibitory control, planning, and organization.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Key Executive Function Areas</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {executiveFunctions.map((ef) => (
                    <div key={ef.name} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="text-3xl mb-2">{ef.icon}</div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">{ef.name}</h4>
                      <p className="text-gray-600 text-sm">{ef.description}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 bg-indigo-50 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold text-indigo-700 mb-2">Why Executive Functions Matter</h3>
                  <p className="text-indigo-600">
                    Strong executive function skills are associated with better academic performance, social relationships, 
                    mental health outcomes, and overall quality of life. Supporting the development of these skills can have 
                    far-reaching positive impacts.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'assessment' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Executive Function Self-Assessment</h2>
                <p className="text-gray-600 mb-6">
                  This brief self-assessment can help identify areas of executive function that may be challenging. 
                  Rate each item on a scale from 1 (rarely/not difficult) to 5 (very often/extremely difficult).
                </p>
                
                {!assessmentComplete ? (
                  <div>
                    <div className="space-y-6">
                      {assessmentQuestions.map((q) => (
                        <div key={q.id} className="bg-gray-50 p-4 rounded-lg">
                          <p className="font-medium text-gray-900 mb-2">{q.question}</p>
                          <p className="text-sm text-gray-500 mb-3">Category: {q.category}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Rarely/Not difficult</span>
                            <div className="flex space-x-2">
                              {[1, 2, 3, 4, 5].map((value) => (
                                <button
                                  key={value}
                                  onClick={() => handleAssessmentChange(q.id, value)}
                                  className={`w-10 h-10 rounded-full ${
                                    assessmentResponses[q.id] === value
                                      ? 'bg-indigo-600 text-white'
                                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                  }`}
                                >
                                  {value}
                                </button>
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">Very often/Extremely difficult</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 flex justify-center">
                      <button
                        onClick={calculateResults}
                        disabled={Object.keys(assessmentResponses).length < assessmentQuestions.length}
                        className={`px-6 py-3 rounded-md text-white font-medium ${
                          Object.keys(assessmentResponses).length < assessmentQuestions.length
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-indigo-600 hover:bg-indigo-700'
                        }`}
                      >
                        Calculate Results
                      </button>
                    </div>
                    
                    {Object.keys(assessmentResponses).length < assessmentQuestions.length && (
                      <p className="text-center text-sm text-gray-500 mt-2">
                        Please answer all questions to see your results.
                      </p>
                    )}
                  </div>
                ) : (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Results</h3>
                    <p className="text-gray-600 mb-6">
                      Higher scores (closer to 5) indicate areas that may be more challenging for you.
                    </p>
                    
                    <div className="space-y-4">
                      {Object.entries(results).map(([category, score]) => (
                        <div key={category} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium text-gray-900">{category}</h4>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              score <= 2 ? 'bg-green-100 text-green-800' :
                              score <= 3.5 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              Score: {score}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className={`h-2.5 rounded-full ${
                                score <= 2 ? 'bg-green-500' :
                                score <= 3.5 ? 'bg-yellow-500' :
                                'bg-red-500'
                              }`} 
                              style={{ width: `${(score / 5) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 flex justify-center space-x-4">
                      <button
                        onClick={resetAssessment}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Retake Assessment
                      </button>
                      <button
                        onClick={() => setActiveTab('strategies')}
                        className="px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        View Strategies
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'strategies' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Executive Function Strategies</h2>
                <p className="text-gray-600 mb-6">
                  These evidence-based strategies can help support and develop executive function skills.
                </p>
                
                <div className="space-y-8">
                  {executiveFunctions.map((ef) => (
                    <div key={ef.name} className="border-b pb-6 last:border-b-0">
                      <div className="flex items-center mb-4">
                        <span className="text-3xl mr-3">{ef.icon}</span>
                        <h3 className="text-xl font-semibold text-gray-900">{ef.name}</h3>
                      </div>
                      <p className="text-gray-600 mb-4">{ef.description}</p>
                      <h4 className="font-medium text-gray-900 mb-2">Recommended Strategies:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {ef.strategies.map((strategy, index) => (
                          <li key={index} className="text-gray-600">{strategy}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'resources' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Additional Resources</h2>
                <p className="text-gray-600 mb-6">
                  Explore these resources to learn more about executive functions and how to support them.
                </p>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Books</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li className="text-gray-600">Smart but Scattered: The Revolutionary "Executive Skills" Approach to Helping Kids Reach Their Potential by Peg Dawson and Richard Guare</li>
                      <li className="text-gray-600">Executive Function in the Classroom: Practical Strategies for Improving Performance and Enhancing Skills for All Students by Christopher Kaufman</li>
                      <li className="text-gray-600">The Executive Functioning Workbook for Teens by Sharon A. Hansen</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Websites and Online Resources</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li className="text-gray-600">Center on the Developing Child at Harvard University - Executive Function Resources</li>
                      <li className="text-gray-600">Understood.org - Executive Functioning</li>
                      <li className="text-gray-600">ADDitude Magazine - Executive Function Resources</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Apps and Tools</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li className="text-gray-600">Todoist - Task management and organization</li>
                      <li className="text-gray-600">Forest - Focus and time management</li>
                      <li className="text-gray-600">Trello - Visual organization and planning</li>
                      <li className="text-gray-600">Calm - Mindfulness and emotional regulation</li>
                    </ul>
                  </div>
                  
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-indigo-700 mb-2">EdPsych Connect Resources</h3>
                    <p className="text-indigo-600 mb-3">
                      As a registered user, you can access our full library of executive function resources:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-indigo-600">
                      <li>Printable worksheets and visual supports</li>
                      <li>Video tutorials on implementing strategies</li>
                      <li>Professional development courses</li>
                      <li>Parent and teacher guides</li>
                    </ul>
                    <div className="mt-4">
                      <Link href="/register" className="text-indigo-600 font-medium hover:text-indigo-500">
                        Sign up for full access →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}