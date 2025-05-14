import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

const DRAFTS_DIR = path.resolve(process.cwd(), 'content/blog/drafts');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { filename } = req.query;

    if (typeof filename !== 'string') {
        return res.status(400).json({ message: 'Filename must be a string.' });
    }

    if (req.method === 'GET') {
        try {
            const filePath = path.join(DRAFTS_DIR, filename as string);
            if (!fs.existsSync(filePath)) {
                return res.status(404).json({ message: 'Draft not found.' });
            }
            const content = fs.readFileSync(filePath, 'utf-8');
            res.status(200).json({ filename, content });
        } catch (error) {
            console.error(`Error reading draft file ${filename}:`, error);
            res.status(500).json({ message: `Error reading draft file ${filename}`, error: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

