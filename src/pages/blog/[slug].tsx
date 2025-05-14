import React from 'react';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

interface PostProps {
    slug: string;
    title: string;
    date: string;
    contentHtml: string; // HTML content of the blog post
    excerpt?: string;
}

const BlogPostPage: React.FC<PostProps> = ({ slug, title, date, contentHtml, excerpt }) => {
    return (
        <>
            <Head>
                <title>{title} | EdPsych Connect Blog</title>
                {excerpt && <meta name="description" content={excerpt} />}
            </Head>
            <div className="container mx-auto px-4 py-12">
                <article className="prose lg:prose-xl max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                    <header className="mb-8">
                        <h1 className="text-4xl font-bold text-sky-700 mb-3">{title}</h1>
                        <p className="text-gray-500 text-sm">
                            Published on {new Date(date).toLocaleDateString("en-GB", { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </header>
                    <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
                </article>
            </div>
        </>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const approvedDir = path.resolve(process.cwd(), 'content/blog/approved');
    let filenames: string[] = [];
    try {
        if (fs.existsSync(approvedDir)) {
            filenames = fs.readdirSync(approvedDir).filter(file => file.endsWith('.md'));
        }
    } catch (error) {
        console.error("Error reading approved directory for paths:", error);
    }
    
    const paths = filenames.map(filename => ({
        params: { slug: filename.replace(/\.md$/, '') },
    }));

    return {
        paths,
        fallback: 'blocking', // or true if you want to serve a fallback page while generating
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const slug = context.params?.slug as string;
    if (!slug) {
        return { notFound: true };
    }

    const approvedDir = path.resolve(process.cwd(), 'content/blog/approved');
    const filePath = path.join(approvedDir, `${slug}.md`);

    try {
        if (!fs.existsSync(filePath)) {
            return { notFound: true };
        }

        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);

        // Convert markdown to HTML
        const processedContent = await remark().use(html).process(content);
        const contentHtml = processedContent.toString();
        const wordCount = content.split(/\s+/).length;
        const autoExcerpt = content.split(/\s+/).slice(0, 30).join(" ") + (wordCount > 30 ? "..." : "");

        return {
            props: {
                slug,
                title: data.title || slug.replace(/_/g, ' '),
                date: data.date || new Date().toISOString(),
                contentHtml,
                excerpt: data.excerpt || autoExcerpt,
            },
            revalidate: 60, // Revalidate every 60 seconds
        };
    } catch (error) {
        console.error(`Error in getStaticProps for blog post ${slug}:`, error);
        return { notFound: true };
    }
};

export default BlogPostPage;

