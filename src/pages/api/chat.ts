import type { NextApiRequest, NextApiResponse } from "next";
import { get_chatbot_response } from "../../../../src/lib/chatbot_service"; // Adjust path as needed

type Data = {
  answer?: string;
  error?: string;
  source_documents?: any[]; // Or a more specific type for your documents
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { query, chat_history } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    try {
      // Ensure the Python service is callable from Node.js
      // This might require setting up a Python child process or a separate Python server
      // For this example, we'll assume a direct call is possible (which is not typical for Python in Next.js API routes without a bridge)
      // In a real scenario, you would call a Python microservice or use a bridge like python-shell.
      
      // SIMULATING PYTHON CALL - REPLACE WITH ACTUAL INTER-PROCESS COMMUNICATION OR API CALL TO PYTHON SERVICE
      // const pythonServiceUrl = "http://localhost:YOUR_PYTHON_SERVICE_PORT/chat";
      // const pythonResponse = await fetch(pythonServiceUrl, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ query, chat_history }),
      // });
      // if (!pythonResponse.ok) {
      //   throw new Error(`Python service error: ${pythonResponse.statusText}`);
      // }
      // const result = await pythonResponse.json();

      // Direct call (if Python code was part of the Node.js runtime, e.g. via a WASM build or a bridge)
      // This is a placeholder for the actual mechanism to call the Python service.
      // For now, this will not work directly as shown without a bridge.
      // We will need to adjust this to use a proper method to call the Python backend.
      // For now, let's assume we'll call the Python script via shell for simplicity in this environment.
      // This is NOT a production-ready approach.
      
      // Placeholder: In a real Next.js app, you'd call the Python backend. 
      // For now, we'll just return a placeholder response as the direct python call from TS is not straightforward.
      // The actual call to the python script will be done in a later step using shell_exec for testing, 
      // or ideally, the python service would be a separate microservice.
      
      // This is where the actual call to the Python backend would happen.
      // Since direct Python execution from a Next.js API route is complex,
      // I will proceed with creating the UI first and then simulate the API call or use a shell command for testing the Python script.
      // For now, let's assume the Python service is running and accessible.
      // This API route will be the bridge.

      // For the purpose of this step, I will write the API route structure.
      // The actual invocation of the Python script will be handled in a subsequent step or through a different mechanism.
      // This is a common challenge when mixing Node.js and Python in the same project without a dedicated microservice architecture.

      // Let's assume for now that `get_chatbot_response` is a function that can be called. 
      // In reality, this would be an HTTP call to a Python backend or a child process execution.
      // The current `chatbot_service.py` is designed to be run as a script or imported in Python.
      // To make it callable from Next.js, it would need to be exposed via an HTTP server (e.g., Flask/FastAPI)
      // or called via a child process.

      // For now, to make progress, I will simulate a response structure.
      // The actual integration will require more work on the Python side to expose an endpoint or use child_process.
      // Given the sandbox, a child_process approach might be feasible.

      // Let's refine this to call the python script using child_process
      const { spawn } = require("child_process");
      const pythonProcess = spawn("python3.11", [
        "-c", 
        `import sys; sys.path.append('.'); from src.lib.chatbot_service import get_chatbot_response; import json; print(json.dumps(get_chatbot_response("${query.replace(/"/g, '\\"')}", ${JSON.stringify(chat_history || [])})))`
      ], { cwd: "/home/ubuntu/edpsychconnect" });

      let rawData = "";
      let errorData = "";

      pythonProcess.stdout.on("data", (data: Buffer) => {
        rawData += data.toString();
      });

      pythonProcess.stderr.on("data", (data: Buffer) => {
        errorData += data.toString();
      });

      pythonProcess.on("close", (code: number) => {
        if (code !== 0 || errorData) {
          console.error(`Python script error: ${errorData}`);
          return res.status(500).json({ error: `Chatbot service failed: ${errorData}` });
        }
        try {
          const result = JSON.parse(rawData);
          return res.status(200).json(result);
        } catch (e: any) {
          console.error(`Error parsing Python script output: ${rawData}`, e);
          return res.status(500).json({ error: "Failed to parse chatbot response." });
        }
      });

    } catch (error: any) {
      console.error("Chatbot API error:", error);
      return res.status(500).json({ error: error.message || "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

