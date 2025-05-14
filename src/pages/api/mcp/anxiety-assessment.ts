import type { NextApiRequest, NextApiResponse } from 'next';

type AssessmentData = {
  age: number;
  gender: string;
  responses: {
    [key: string]: number;
  };
};

type AssessmentResult = {
  overallScore: number;
  categories: {
    [key: string]: {
      score: number;
      interpretation: string;
      recommendations: string[];
    };
  };
  summary: string;
};

// Sample anxiety assessment questions by category
const assessmentQuestions = {
  physiological: [
    'q1', // Racing heart
    'q2', // Sweating
    'q3', // Trembling
    'q4'  // Shortness of breath
  ],
  cognitive: [
    'q5', // Worry about future events
    'q6', // Fear of losing control
    'q7', // Difficulty concentrating
    'q8'  // Catastrophic thinking
  ],
  behavioral: [
    'q9',  // Avoidance of situations
    'q10', // Seeking reassurance
    'q11', // Restlessness
    'q12'  // Sleep disturbances
  ]
};

// Interpretation thresholds
const interpretationThresholds = {
  low: 2.0,
  moderate: 3.5,
  high: 4.5
};

// Recommendations by category and severity
const recommendations = {
  physiological: {
    low: [
      'Practice deep breathing exercises daily',
      'Consider light physical activity like walking or yoga'
    ],
    moderate: [
      'Learn and practice progressive muscle relaxation techniques',
      'Establish a regular exercise routine',
      'Consider mindfulness meditation focused on body sensations'
    ],
    high: [
      'Consult with a healthcare professional about physiological symptoms',
      'Implement structured relaxation techniques multiple times daily',
      'Consider referral to a specialist for further assessment',
      'Explore grounding techniques for immediate symptom management'
    ]
  },
  cognitive: {
    low: [
      'Practice positive self-talk',
      'Keep a thought journal to identify patterns'
    ],
    moderate: [
      'Learn basic cognitive restructuring techniques',
      'Practice mindfulness meditation focused on thoughts',
      'Establish worry time to contain anxious thoughts'
    ],
    high: [
      'Consider cognitive-behavioral therapy with a qualified professional',
      'Implement structured thought challenging exercises daily',
      'Develop a hierarchy of feared situations for gradual exposure',
      'Practice acceptance and commitment strategies'
    ]
  },
  behavioral: {
    low: [
      'Gradually face mildly anxiety-provoking situations',
      'Establish consistent sleep routines'
    ],
    moderate: [
      'Create a step-by-step plan to address avoidance behaviors',
      'Implement regular relaxation activities before bed',
      'Practice assertiveness skills in anxiety-provoking situations'
    ],
    high: [
      'Consider structured exposure therapy with professional guidance',
      'Implement a comprehensive sleep hygiene program',
      'Develop specific coping plans for high-anxiety situations',
      'Consider referral for specialized behavioral intervention'
    ]
  }
};

/**
 * Analyzes anxiety assessment data and provides personalized recommendations
 * 
 * This MCP tool processes anxiety assessment responses and returns:
 * - Overall anxiety score
 * - Category-specific scores (physiological, cognitive, behavioral)
 * - Interpretations of severity levels
 * - Personalized recommendations based on response patterns
 * - Summary of findings
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<AssessmentResult | { error: string }>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data: AssessmentData = req.body;
    
    // Validate required fields
    if (!data.responses || Object.keys(data.responses).length === 0) {
      return res.status(400).json({ error: 'Assessment responses are required' });
    }
    
    // Calculate category scores
    const categoryScores: {[key: string]: number} = {};
    let totalScore = 0;
    let totalQuestions = 0;
    
    Object.entries(assessmentQuestions).forEach(([category, questions]) => {
      let categoryTotal = 0;
      let categoryCount = 0;
      
      questions.forEach(questionId => {
        if (data.responses[questionId] !== undefined) {
          categoryTotal += data.responses[questionId];
          categoryCount++;
          totalScore += data.responses[questionId];
          totalQuestions++;
        }
      });
      
      categoryScores[category] = categoryCount > 0 ? categoryTotal / categoryCount : 0;
    });
    
    const overallScore = totalQuestions > 0 ? totalScore / totalQuestions : 0;
    
    // Generate interpretations and recommendations
    const result: AssessmentResult = {
      overallScore,
      categories: {},
      summary: ''
    };
    
    Object.entries(categoryScores).forEach(([category, score]) => {
      let severity: 'low' | 'moderate' | 'high';
      
      if (score < interpretationThresholds.low) {
        severity = 'low';
      } else if (score < interpretationThresholds.moderate) {
        severity = 'low';
      } else if (score < interpretationThresholds.high) {
        severity = 'moderate';
      } else {
        severity = 'high';
      }
      
      const interpretation = getInterpretation(category, severity);
      
      result.categories[category] = {
        score,
        interpretation,
        recommendations: recommendations[category as keyof typeof recommendations][severity]
      };
    });
    
    // Generate summary
    result.summary = generateSummary(result, data);
    
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error processing anxiety assessment:', error);
    return res.status(500).json({ error: 'Failed to process assessment data' });
  }
}

// Helper function to generate interpretation text
function getInterpretation(category: string, severity: 'low' | 'moderate' | 'high'): string {
  const categoryLabels = {
    physiological: 'physical symptoms of anxiety',
    cognitive: 'anxious thoughts and worries',
    behavioral: 'anxiety-related behaviors'
  };
  
  const severityDescriptions = {
    low: 'minimal to mild',
    moderate: 'moderate',
    high: 'severe'
  };
  
  return `You are experiencing ${severityDescriptions[severity]} ${categoryLabels[category as keyof typeof categoryLabels]}.`;
}

// Helper function to generate summary
function generateSummary(result: AssessmentResult, data: AssessmentData): string {
  const overallSeverity = 
    result.overallScore < interpretationThresholds.low ? 'minimal' :
    result.overallScore < interpretationThresholds.moderate ? 'mild' :
    result.overallScore < interpretationThresholds.high ? 'moderate' : 'severe';
  
  const highestCategory = Object.entries(result.categories)
    .sort((a, b) => b[1].score - a[1].score)[0][0];
  
  const highestCategoryLabels = {
    physiological: 'physical symptoms',
    cognitive: 'worried thoughts',
    behavioral: 'avoidance behaviors'
  };
  
  const ageSpecificText = data.age < 18 ? 
    'For children and adolescents, involving parents/carers and school staff in anxiety management is recommended.' :
    'Consider both self-help strategies and professional support if anxiety is impacting daily functioning.';
  
  return `Based on your responses, you are experiencing ${overallSeverity} levels of anxiety overall, with your most significant challenges related to ${highestCategoryLabels[highestCategory as keyof typeof highestCategoryLabels]}. ${ageSpecificText} The recommendations provided are tailored to your specific pattern of anxiety symptoms.`;
}