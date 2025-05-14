import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// SEMH areas
const semhAreas = [
  {
    name: 'Anxiety',
    description: 'Excessive worry, fear, or nervousness that interferes with daily activities.',
    strategies: [
      'Practice deep breathing and relaxation techniques',
      'Use cognitive restructuring to challenge negative thoughts',
      'Create predictable routines and prepare for transitions',
      'Break tasks into smaller, manageable steps'
    ],
    icon: '😰'
  },
  {
    name: 'Depression',
    description: 'Persistent feelings of sadness, hopelessness, and loss of interest in activities.',
    strategies: [
      'Encourage physical activity and time outdoors',
      'Set small, achievable goals to build confidence',
      'Maintain social connections and support networks',
      'Establish healthy sleep and eating routines'
    ],
    icon: '😔'
  },
  {
    name: 'Anger Management',
    description: 'Difficulty controlling anger responses and managing frustration appropriately.',
    strategies: [
      'Identify triggers and early warning signs',
      'Teach calming strategies and time-out procedures',
      'Practice problem-solving and conflict resolution skills',
      'Use visual supports for emotional regulation'
    ],
    icon: '😠'
  },
  {
    name: 'Self-Esteem',
    description: 'How individuals perceive and value themselves, affecting confidence and resilience.',
    strategies: [
      'Focus on strengths and achievements',
      'Set realistic goals and celebrate progress',
      'Provide specific, genuine praise',
      'Teach positive self-talk and affirmations'
    ],
    icon: '💪'
  },
  {
    name: 'Social Skills',
    description: 'The ability to interact effectively with others and navigate social situations.',
    strategies: [
      'Explicitly teach and model social skills',
      'Practice through role-play and social stories',
      'Provide structured opportunities for peer interaction',
      'Use visual supports and social scripts'
    ],
    icon: '👥'
  },
  {
    name: 'Resilience',
    description: 'The ability to adapt, recover, and grow from challenges and adversity.',
    strategies: [
      'Develop problem-solving skills',
      'Build a growth mindset and positive outlook',
      'Strengthen supportive relationships',
      'Practice self-care and stress management'
    ],
    icon: '🌱'
  }
];

// Wellbeing assessment questions
const wellbeingQuestions = [
  {
    id: 'anx1',
    category: 'Anxiety',
    question: 'How often do you feel worried or nervous?',
  },
  {
    id: 'anx2',
    category: 'Anxiety',
    question: 'How much do worries interfere with your daily activities?',
  },
  {
    id: 'dep1',
    category: 'Depression',
    question: 'How often do you feel sad or down?',
  },
  {
    id: 'dep2',
    category: 'Depression',
    question: 'How much interest or pleasure do you have in doing things you usually enjoy?',
  },
  {
    id: 'ang1',
    category: 'Anger Management',
    question: 'How often do you feel angry or frustrated?',
  },
  {
    id: 'ang2',
    category: 'Anger Management',
    question: 'How difficult is it to control your anger when upset?',
  },
  {
    id: 'est1',
    category: 'Self-Esteem',
    question: 'How positively do you feel about yourself most days?',
  },
  {
    id: 'est2',
    category: 'Self-Esteem',
    question: 'How confident do you feel in your abilities?',
  },
  {
    id: 'soc1',
    category: 'Social Skills',
    question: 'How comfortable do you feel in social situations?',
  },
  {
    id: 'soc2',
    category: 'Social Skills',
    question: 'How easy is it for you to make and maintain friendships?',
  },
  {
    id: 'res1',
    category: 'Resilience',
    question: 'How well do you bounce back from setbacks or challenges?',
  },
  {
    id: 'res2',
    category: 'Resilience',
    question: 'How well do you adapt to change or unexpected situations?',
  },
];

// Mindfulness exercises
const mindfulnessExercises = [
  {
    title: 'Five Senses Grounding',
    description: 'Notice 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.',
    duration: '5 minutes',
    difficulty: 'Beginner'
  },
  {
    title: 'Mindful Breathing',
    description: 'Focus on your breath, noticing the sensation of air flowing in and out of your body. When your mind wanders, gently bring attention back to your breath.',
    duration: '10 minutes',
    difficulty: 'Beginner'
  },
  {
    title: 'Body Scan',
    description: 'Progressively focus attention on different parts of your body, from your toes to the top of your head, noticing sensations without judgment.',
    duration: '15 minutes',
    difficulty: 'Intermediate'
  },
  {
    title: 'Mindful Walking',
    description: 'Walk slowly and deliberately, paying attention to the sensation of each step, the movement of your body, and your surroundings.',
    duration: '10-20 minutes',
    difficulty: 'Intermediate'
  },
  {
    title: 'Loving-Kindness Meditation',
    description: 'Direct positive wishes and goodwill toward yourself and others, using phrases like "May I be happy, may I be healthy, may I be safe."',
    duration: '15 minutes',
    difficulty: 'Advanced'
  }
];

export default function SEMHSupport() {
  const [activeTab, setActiveTab] = useState('overview');
  const [assessmentResponses, setAssessmentResponses] = useState<Record<string, number>>({});
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  const [results, setResults] = useState<Record<string, number>>({});
  const [currentExercise, setCurrentExercise] = useState<number | null>(null);
  const [timerActive, setTimerActive] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);

  const handleAssessmentChange = (id: string, value: number) => {
    setAssessmentResponses(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const calculateResults = () => {
    const categoryScores: Record<string, { total: number, count: number }> = {};
    
    // Initialize categories
    semhAreas.forEach(area => {
      categoryScores[area.name] = { total: 0, count: 0 };
    });
    
    // Sum up scores by category
    Object.entries(assessmentResponses).forEach(([id, score]) => {
      const question = wellbeingQuestions.find(q => q.id === id);
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

  const startExercise = (index: number) => {
    setCurrentExercise(index);
    const durationInMinutes = parseInt(mindfulnessExercises[index].duration.split(' ')[0]);
    setTimerSeconds(durationInMinutes * 60);
    setTimerActive(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <>
      <Head>
        <title>SEMH Support | EdPsych Connect</title>
        <meta name="description" content="Social, emotional, and mental health support resources and tools" />
      </Head>
      <Navbar />
      <main className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">SEMH Support</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Resources and tools to support social, emotional, and mental health wellbeing.
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
                Wellbeing Assessment
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
                onClick={() => setActiveTab('mindfulness')}
                className={`${
                  activeTab === 'mindfulness'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Mindfulness
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
                <h2 className="text-2xl font-bold text-gray-900 mb-4">What is SEMH?</h2>
                <p className="text-gray-600 mb-6">
                  Social, Emotional, and Mental Health (SEMH) refers to a person's ability to understand and manage their emotions, 
                  set and achieve positive goals, feel and show empathy for others, establish and maintain positive relationships, 
                  and make responsible decisions.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Key SEMH Areas</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {semhAreas.map((area) => (
                    <div key={area.name} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="text-3xl mb-2">{area.icon}</div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">{area.name}</h4>
                      <p className="text-gray-600 text-sm">{area.description}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 bg-indigo-50 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold text-indigo-700 mb-2">Why SEMH Matters</h3>
                  <p className="text-indigo-600">
                    Strong social, emotional, and mental health is associated with better academic performance, improved behavior, 
                    positive relationships, and overall wellbeing. Supporting SEMH development helps children and young people 
                    thrive in school and beyond.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'assessment' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Wellbeing Self-Assessment</h2>
                <p className="text-gray-600 mb-6">
                  This brief self-assessment can help identify areas of wellbeing that may need support. 
                  Rate each item on a scale from 1 (rarely/not at all) to 5 (very often/very much).
                </p>
                
                {!assessmentComplete ? (
                  <div>
                    <div className="space-y-6">
                      {wellbeingQuestions.map((q) => (
                        <div key={q.id} className="bg-gray-50 p-4 rounded-lg">
                          <p className="font-medium text-gray-900 mb-2">{q.question}</p>
                          <p className="text-sm text-gray-500 mb-3">Category: {q.category}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Rarely/Not at all</span>
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
                            <span className="text-sm text-gray-500">Very often/Very much</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 flex justify-center">
                      <button
                        onClick={calculateResults}
                        disabled={Object.keys(assessmentResponses).length < wellbeingQuestions.length}
                        className={`px-6 py-3 rounded-md text-white font-medium ${
                          Object.keys(assessmentResponses).length < wellbeingQuestions.length
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-indigo-600 hover:bg-indigo-700'
                        }`}
                      >
                        Calculate Results
                      </button>
                    </div>
                    
                    {Object.keys(assessmentResponses).length < wellbeingQuestions.length && (
                      <p className="text-center text-sm text-gray-500 mt-2">
                        Please answer all questions to see your results.
                      </p>
                    )}
                  </div>
                ) : (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Results</h3>
                    <p className="text-gray-600 mb-6">
                      Higher scores (closer to 5) indicate areas of strength, while lower scores may indicate areas that could benefit from support.
                    </p>
                    
                    <div className="space-y-4">
                      {Object.entries(results).map(([category, score]) => (
                        <div key={category} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium text-gray-900">{category}</h4>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              score >= 4 ? 'bg-green-100 text-green-800' :
                              score >= 2.5 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              Score: {score}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className={`h-2.5 rounded-full ${
                                score >= 4 ? 'bg-green-500' :
                                score >= 2.5 ? 'bg-yellow-500' :
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
                <h2 className="text-2xl font-bold text-gray-900 mb-4">SEMH Strategies</h2>
                <p className="text-gray-600 mb-6">
                  These evidence-based strategies can help support and develop social, emotional, and mental health.
                </p>
                
                <div className="space-y-8">
                  {semhAreas.map((area) => (
                    <div key={area.name} className="border-b pb-6 last:border-b-0">
                      <div className="flex items-center mb-4">
                        <span className="text-3xl mr-3">{area.icon}</span>
                        <h3 className="text-xl font-semibold text-gray-900">{area.name}</h3>
                      </div>
                      <p className="text-gray-600 mb-4">{area.description}</p>
                      <h4 className="font-medium text-gray-900 mb-2">Recommended Strategies:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {area.strategies.map((strategy, index) => (
                          <li key={index} className="text-gray-600">{strategy}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'mindfulness' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Mindfulness Exercises</h2>
                <p className="text-gray-600 mb-6">
                  Mindfulness practices can help reduce stress, improve focus, and enhance emotional regulation.
                  Try these guided exercises to support your wellbeing.
                </p>
                
                {currentExercise === null ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mindfulnessExercises.map((exercise, index) => (
                      <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{exercise.title}</h3>
                        <div className="flex space-x-2 mb-3">
                          <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                            {exercise.duration}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                            {exercise.difficulty}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{exercise.description}</p>
                        <button
                          onClick={() => startExercise(index)}
                          className="w-full px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                        >
                          Start Exercise
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="max-w-md mx-auto text-center">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {mindfulnessExercises[currentExercise].title}
                    </h3>
                    <div className="text-6xl font-bold text-indigo-600 my-8">
                      {formatTime(timerSeconds)}
                    </div>
                    <p className="text-gray-600 mb-8">
                      {mindfulnessExercises[currentExercise].description}
                    </p>
                    <div className="flex justify-center space-x-4">
                      <button
                        onClick={() => setCurrentExercise(null)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        End Exercise
                      </button>
                      <button
                        onClick={() => setTimerActive(!timerActive)}
                        className="px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        {timerActive ? 'Pause' : 'Resume'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'resources' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Additional Resources</h2>
                <p className="text-gray-600 mb-6">
                  Explore these resources to learn more about supporting social, emotional, and mental health.
                </p>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Books</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li className="text-gray-600">The Whole-Brain Child by Daniel J. Siegel and Tina Payne Bryson</li>
                      <li className="text-gray-600">Emotional Intelligence by Daniel Goleman</li>
                      <li className="text-gray-600">The Anxiety Workbook for Teens by Lisa M. Schab</li>
                      <li className="text-gray-600">The Self-Esteem Workbook for Teens by Lisa M. Schab</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Websites and Online Resources</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li className="text-gray-600">Young Minds - Mental health support for young people</li>
                      <li className="text-gray-600">Mind - Mental health charity with resources and support</li>
                      <li className="text-gray-600">CASEL - Collaborative for Academic, Social, and Emotional Learning</li>
                      <li className="text-gray-600">Place2Be - Children's mental health charity</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Apps and Tools</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li className="text-gray-600">Headspace - Guided meditation and mindfulness</li>
                      <li className="text-gray-600">Calm - Sleep, meditation, and relaxation</li>
                      <li className="text-gray-600">Smiling Mind - Mindfulness for young people</li>
                      <li className="text-gray-600">MoodKit - Mood improvement tools</li>
                    </ul>
                  </div>
                  
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-indigo-700 mb-2">EdPsych Connect Resources</h3>
                    <p className="text-indigo-600 mb-3">
                      As a registered user, you can access our full library of SEMH resources:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-indigo-600">
                      <li>Printable worksheets and visual supports</li>
                      <li>Guided mindfulness and relaxation exercises</li>
                      <li>Professional development courses on SEMH</li>
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