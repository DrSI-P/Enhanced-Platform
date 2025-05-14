import type { NextApiRequest, NextApiResponse } from 'next';
import { MCPServer } from '@/utils/mcp';

// Sample MCP servers with their tools and resources
const mcpServers: MCPServer[] = [
  {
    name: 'psychology-tools',
    description: 'Provides psychological assessment and intervention tools',
    tools: [
      {
        name: 'anxiety-assessment',
        description: 'Analyzes anxiety assessment data and provides personalized recommendations',
        inputSchema: {
          age: 'number',
          gender: 'string',
          responses: 'Record<string, number>'
        },
        outputSchema: {
          overallScore: 'number',
          categories: 'Record<string, { score: number, interpretation: string, recommendations: string[] }>',
          summary: 'string'
        }
      },
      {
        name: 'executive-function-assessment',
        description: 'Evaluates executive function skills and provides targeted strategies',
        inputSchema: {
          age: 'number',
          responses: 'Record<string, number>'
        },
        outputSchema: {
          overallScore: 'number',
          areas: 'Record<string, { score: number, interpretation: string, strategies: string[] }>',
          summary: 'string'
        }
      }
    ],
    resources: [
      {
        uri: 'psychology://assessments/anxiety/questions',
        description: 'Standard anxiety assessment questions by category',
        type: 'json'
      },
      {
        uri: 'psychology://interventions/anxiety/techniques',
        description: 'Evidence-based anxiety management techniques',
        type: 'json'
      }
    ]
  },
  {
    name: 'vr-environments',
    description: 'Generates and manages virtual learning environments',
    tools: [
      {
        name: 'generate-environment',
        description: 'Creates personalized virtual environments based on student profiles and anxiety levels',
        inputSchema: {
          studentProfile: 'Record<string, any>',
          anxietyLevel: 'number',
          preferences: 'Record<string, any>'
        },
        outputSchema: {
          environmentId: 'string',
          configuration: 'Record<string, any>',
          recommendations: 'string[]'
        }
      },
      {
        name: 'adjust-environment',
        description: 'Modifies existing virtual environments based on student feedback and progress',
        inputSchema: {
          environmentId: 'string',
          adjustments: 'Record<string, any>',
          reason: 'string'
        },
        outputSchema: {
          success: 'boolean',
          updatedConfiguration: 'Record<string, any>',
          message: 'string'
        }
      }
    ],
    resources: [
      {
        uri: 'vr://environments/templates',
        description: 'Available virtual environment templates',
        type: 'json'
      },
      {
        uri: 'vr://environments/elements',
        description: 'Interactive elements for virtual environments',
        type: 'json'
      }
    ]
  },
  {
    name: 'progress-tracker',
    description: 'Monitors and analyzes student progress through educational programs',
    tools: [
      {
        name: 'log-activity',
        description: 'Records student activity and progress data',
        inputSchema: {
          studentId: 'string',
          activityData: 'Record<string, any>',
          timestamp: 'string'
        },
        outputSchema: {
          success: 'boolean',
          progressUpdate: 'Record<string, any>',
          message: 'string'
        }
      },
      {
        name: 'generate-report',
        description: 'Creates comprehensive progress reports for students or groups',
        inputSchema: {
          studentIds: 'string[]',
          timeframe: 'Record<string, string>',
          metrics: 'string[]'
        },
        outputSchema: {
          reportId: 'string',
          summary: 'Record<string, any>',
          detailedData: 'Record<string, any>[]'
        }
      }
    ],
    resources: [
      {
        uri: 'progress://metrics/definitions',
        description: 'Definitions of progress tracking metrics',
        type: 'json'
      },
      {
        uri: 'progress://report/templates',
        description: 'Templates for progress reports',
        type: 'json'
      }
    ]
  },
  {
    name: 'learning-advisor',
    description: 'Provides personalized learning recommendations based on student profiles and progress',
    tools: [
      {
        name: 'get-recommendations',
        description: 'Generates personalized learning activity recommendations',
        inputSchema: {
          studentId: 'string',
          learningGoals: 'string[]',
          currentProgress: 'Record<string, any>'
        },
        outputSchema: {
          recommendations: 'Record<string, any>[]',
          rationale: 'string',
          nextSteps: 'string[]'
        }
      },
      {
        name: 'evaluate-activity',
        description: 'Evaluates the effectiveness of a learning activity for a specific student',
        inputSchema: {
          studentId: 'string',
          activityId: 'string',
          outcomes: 'Record<string, any>'
        },
        outputSchema: {
          effectiveness: 'number',
          insights: 'string[]',
          adjustments: 'Record<string, any>'
        }
      }
    ],
    resources: [
      {
        uri: 'learning://activities/library',
        description: 'Library of learning activities with metadata',
        type: 'json'
      },
      {
        uri: 'learning://strategies/evidence-based',
        description: 'Evidence-based learning strategies by category',
        type: 'json'
      }
    ]
  }
];

/**
 * API endpoint to list available MCP servers
 * 
 * Returns information about all available MCP servers including their
 * tools and resources.
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<MCPServer[] | { error: string }>
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    return res.status(200).json(mcpServers);
  } catch (error) {
    console.error('Error listing MCP servers:', error);
    return res.status(500).json({ error: 'Failed to list MCP servers' });
  }
}