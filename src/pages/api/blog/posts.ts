import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import matter from 'gray-matter'; // To read frontmatter if we add it later

const APPROVED_DIR = path.resolve(process.cwd(), 'content/blog/approved');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            if (!fs.existsSync(APPROVED_DIR)) {
                // If the directory doesn't exist, it means no posts have been approved yet.
                // Return an empty array rather than an error.
                return res.status(200).json([]);
            }
            const files = fs.readdirSync(APPROVED_DIR);
            const approvedPosts = files
                .filter(file => file.endsWith('.md'))
                .map(file => {
                    const filePath = path.join(APPROVED_DIR, file);
                    const fileContent = fs.readFileSync(filePath, 'utf-8');
                    const { data } = matter(fileContent); // Extracts frontmatter

                    return {
                        slug: file.replace(/\.md$/, ''),
                        title: data.title || file.replace(/\.md$/, '').replace(/_/g, ' '),
                        date: data.date || new Date().toISOString().split('T')[0], // Placeholder date
                        excerpt: data.excerpt || '', // Placeholder excerpt
                        // Add more metadata from frontmatter as needed
                    };
                })
                .sort((post1, post2) => (post1.date > post2.date ? -1 : 1)); // Sort by date, newest first
            
            res.status(200).json(approvedPosts);
        } catch (error) {
            console.error('Error reading approved posts:', error);
            res.status(500).json({ message: 'Error reading approved posts', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

