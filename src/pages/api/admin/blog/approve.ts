import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

const DRAFTS_DIR = path.resolve(process.cwd(), "content/blog/drafts");
const APPROVED_DIR = path.resolve(process.cwd(), "content/blog/approved");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { filename } = req.body;

        if (typeof filename !== "string") {
            return res.status(400).json({ message: "Filename must be a string." });
        }

        const draftFilePath = path.join(DRAFTS_DIR, filename);
        const approvedFilePath = path.join(APPROVED_DIR, filename);

        try {
            if (!fs.existsSync(DRAFTS_DIR)) {
                fs.mkdirSync(DRAFTS_DIR, { recursive: true });
            }
            if (!fs.existsSync(APPROVED_DIR)) {
                fs.mkdirSync(APPROVED_DIR, { recursive: true });
            }

            if (!fs.existsSync(draftFilePath)) {
                return res.status(404).json({ message: "Draft post not found." });
            }

            // Move the file
            fs.renameSync(draftFilePath, approvedFilePath);

            res.status(200).json({ message: `Successfully approved and moved ${filename} to approved posts.` });
        } catch (error) {
            console.error(`Error approving post ${filename}:`, error);
            res.status(500).json({ message: `Error approving post ${filename}`, error: error.message });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

