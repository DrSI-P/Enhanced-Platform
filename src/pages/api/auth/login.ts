import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  success: boolean;
  message: string;
  token?: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
  
  // This is a mock implementation - in production, you would validate credentials
  try {
    // Mock successful login
    return res.status(200).json({ 
      success: true, 
      message: 'Login successful',
      token: 'mock-jwt-token' 
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}