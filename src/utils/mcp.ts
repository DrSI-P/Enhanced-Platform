/**
 * MCP (Model Context Protocol) Client Utilities
 * 
 * This module provides utilities for interacting with MCP servers
 * and accessing their tools and resources.
 */

// Types for MCP server interactions
export type MCPToolInput = Record<string, any>;
export type MCPToolOutput = Record<string, any>;

export type MCPServer = {
  name: string;
  description: string;
  tools: MCPTool[];
  resources: MCPResource[];
};

export type MCPTool = {
  name: string;
  description: string;
  inputSchema: Record<string, any>;
  outputSchema: Record<string, any>;
};

export type MCPResource = {
  uri: string;
  description: string;
  type: string;
};

/**
 * Calls an MCP tool with the provided arguments
 * 
 * @param serverName - The name of the MCP server
 * @param toolName - The name of the tool to call
 * @param args - The arguments to pass to the tool
 * @returns The tool's response
 */
export async function callMCPTool(
  serverName: string,
  toolName: string,
  args: MCPToolInput
): Promise<MCPToolOutput> {
  try {
    const response = await fetch(`/api/mcp/${toolName.toLowerCase()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-MCP-Server': serverName
      },
      body: JSON.stringify(args)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to call MCP tool');
    }

    return await response.json();
  } catch (error) {
    console.error(`Error calling MCP tool ${toolName}:`, error);
    throw error;
  }
}

/**
 * Accesses an MCP resource
 * 
 * @param serverName - The name of the MCP server
 * @param uri - The URI of the resource to access
 * @returns The resource data
 */
export async function accessMCPResource(
  serverName: string,
  uri: string
): Promise<any> {
  try {
    const encodedUri = encodeURIComponent(uri);
    const response = await fetch(`/api/mcp/resource?uri=${encodedUri}`, {
      method: 'GET',
      headers: {
        'X-MCP-Server': serverName
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to access MCP resource');
    }

    return await response.json();
  } catch (error) {
    console.error(`Error accessing MCP resource ${uri}:`, error);
    throw error;
  }
}

/**
 * Lists available MCP servers
 * 
 * @returns Array of available MCP servers
 */
export async function listMCPServers(): Promise<MCPServer[]> {
  try {
    const response = await fetch('/api/mcp/servers');
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to list MCP servers');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error listing MCP servers:', error);
    throw error;
  }
}

/**
 * Gets information about a specific MCP server
 * 
 * @param serverName - The name of the MCP server
 * @returns Server information including available tools and resources
 */
export async function getMCPServerInfo(serverName: string): Promise<MCPServer> {
  try {
    const response = await fetch(`/api/mcp/servers/${serverName}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to get MCP server info');
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error getting MCP server info for ${serverName}:`, error);
    throw error;
  }
}

// Example usage of the MCP anxiety assessment tool
export async function performAnxietyAssessment(
  age: number,
  gender: string,
  responses: Record<string, number>
) {
  return callMCPTool('psychology-tools', 'anxiety-assessment', {
    age,
    gender,
    responses
  });
}

// Example usage of the MCP environment generation tool
export async function generateLearningEnvironment(
  studentProfile: Record<string, any>,
  anxietyLevel: number,
  preferences: Record<string, any>
) {
  return callMCPTool('vr-environments', 'generate-environment', {
    studentProfile,
    anxietyLevel,
    preferences
  });
}

// Example usage of the MCP progress tracking tool
export async function trackStudentProgress(
  studentId: string,
  activityData: Record<string, any>
) {
  return callMCPTool('progress-tracker', 'log-activity', {
    studentId,
    activityData,
    timestamp: new Date().toISOString()
  });
}

// Example usage of the MCP learning recommendations tool
export async function getLearningRecommendations(
  studentId: string,
  learningGoals: string[],
  currentProgress: Record<string, any>
) {
  return callMCPTool('learning-advisor', 'get-recommendations', {
    studentId,
    learningGoals,
    currentProgress
  });
}