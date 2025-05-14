import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

const DRAFTS_DIR = path.resolve(process.cwd(), 'content/blog/drafts');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            if (!fs.existsSync(DRAFTS_DIR)) {
                fs.mkdirSync(DRAFTS_DIR, { recursive: true });
            }
            const files = fs.readdirSync(DRAFTS_DIR);
            const draftPosts = files
                .filter(file => file.endsWith('.md'))
                .map(file => {
                    // Basic metadata, can be expanded if frontmatter is used
                    return {
                        filename: file,
                        title: file.replace(/\.md$/, '').replace(/_/g, ' '),
                        // Add more metadata extraction here if needed, e.g., reading frontmatter
                    };
                });
            res.status(200).json(draftPosts);
        } catch (error) {
            console.error('Error reading draft posts:', error);
            res.status(500).json({ message: 'Error reading draft posts', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

