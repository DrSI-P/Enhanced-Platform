import { useState } from 'react';
import { performAnxietyAssessment } from '@/utils/mcp';

// Sample anxiety assessment questions
const sampleQuestions = [
  {
    id: 'q1',
    text: 'How often do you experience a racing heart when anxious?',
    category: 'physiological'
  },
  {
    id: 'q2',
    text: 'How often do you experience sweating when anxious?',
    category: 'physiological'
  },
  {
    id: 'q3',
    text: 'How often do you experience trembling when anxious?',
    category: 'physiological'
  },
  {
    id: 'q4',
    text: 'How often do you experience shortness of breath when anxious?',
    category: 'physiological'
  },
  {
    id: 'q5',
    text: 'How often do you worry about future events?',
    category: 'cognitive'
  },
  {
    id: 'q6',
    text: 'How often do you fear losing control?',
    category: 'cognitive'
  },
  {
    id: 'q7',
    text: 'How difficult is it to concentrate when anxious?',
    category: 'cognitive'
  },
  {
    id: 'q8',
    text: 'How often do you think about the worst possible outcomes?',
    category: 'cognitive'
  },
  {
    id: 'q9',
    text: 'How often do you avoid anxiety-provoking situations?',
    category: 'behavioral'
  },
  {
    id: 'q10',
    text: 'How often do you seek reassurance from others when anxious?',
    category: 'behavioral'
  },
  {
    id: 'q11',
    text: 'How often do you feel restless when anxious?',
    category: 'behavioral'
  },
  {
    id: 'q12',
    text: 'How often do you experience sleep disturbances due to anxiety?',
    category: 'behavioral'
  }
];

export default function MCPToolDemo() {
  const [age, setAge] = useState<number>(25);
  const [gender, setGender] = useState<string>('');
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<number>(1);

  const handleResponseChange = (questionId: string, value: number) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Check if all questions have been answered
      const answeredQuestions = Object.keys(responses).length;
      if (answeredQuestions < sampleQuestions.length) {
        throw new Error(`Please answer all questions (${answeredQuestions}/${sampleQuestions.length} answered)`);
      }

      // Call the MCP tool
      const assessmentResult = await performAnxietyAssessment(age, gender, responses);
      setResult(assessmentResult);
      setStep(3);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const resetAssessment = () => {
    setResponses({});
    setResult(null);
    setError(null);
    setStep(1);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">AI-Powered Anxiety Assessment</h2>
      <p className="text-gray-600 mb-6">
        This demo showcases our MCP (Model Context Protocol) integration for personalized anxiety assessment and recommendations.
      </p>

      {step === 1 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value) || 0)}
                min="0"
                max="100"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-binary</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setStep(2)}
              disabled={!age || !gender}
              className={`px-4 py-2 rounded-md text-white ${
                !age || !gender ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit}>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Anxiety Assessment</h3>
          <p className="text-gray-600 mb-4">
            Rate each item on a scale from 1 (rarely/not at all) to 5 (very often/very much).
          </p>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <div className="space-y-6 mb-6">
            {sampleQuestions.map((question) => (
              <div key={question.id} className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium text-gray-900 mb-2">{question.text}</p>
                <p className="text-sm text-gray-500 mb-3">Category: {question.category}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Rarely/Not at all</span>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleResponseChange(question.id, value)}
                        className={`w-10 h-10 rounded-full ${
                          responses[question.id] === value
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

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded-md text-white ${
                loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {loading ? 'Processing...' : 'Submit'}
            </button>
          </div>
        </form>
      )}

      {step === 3 && result && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Assessment Results</h3>
          
          <div className="mb-6">
            <div className="bg-indigo-50 p-4 rounded-lg mb-4">
              <h4 className="font-medium text-indigo-900 mb-2">Summary</h4>
              <p className="text-indigo-700">{result.summary}</p>
            </div>
            
            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Overall Anxiety Score</h4>
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                  <div 
                    className={`h-2.5 rounded-full ${
                      result.overallScore < 2 ? 'bg-green-500' :
                      result.overallScore < 3.5 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`} 
                    style={{ width: `${(result.overallScore / 5) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">{result.overallScore.toFixed(1)}/5</span>
              </div>
            </div>
            
            <h4 className="font-medium text-gray-900 mb-2">Category Scores</h4>
            <div className="space-y-4">
              {Object.entries(result.categories).map(([category, data]: [string, any]) => (
                <div key={category} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="font-medium text-gray-900">{category}</h5>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      data.score < 2 ? 'bg-green-100 text-green-800' :
                      data.score < 3.5 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      Score: {data.score.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{data.interpretation}</p>
                  <div>
                    <h6 className="text-sm font-medium text-gray-900 mb-1">Recommendations:</h6>
                    <ul className="list-disc pl-5 space-y-1">
                      {data.recommendations.map((recommendation: string, index: number) => (
                        <li key={index} className="text-gray-600 text-sm">{recommendation}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={resetAssessment}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Start Over
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Print Results
            </button>
          </div>
        </div>
      )}

      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          <strong>Note:</strong> This is a demonstration of our MCP integration capabilities. In a production environment, 
          this would connect to our secure MCP servers for real-time AI-powered assessment and recommendations.
        </p>
      </div>
    </div>
  );
}