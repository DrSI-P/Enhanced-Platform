import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface Post {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
}

interface BlogIndexProps {
    posts: Post[];
}

const BlogIndexPage: React.FC<BlogIndexProps> = ({ posts }) => {
    return (
        <>
            <Head>
                <title>Blog | EdPsych Connect</title>
                <meta name="description" content="Read the latest articles and insights from EdPsych Connect on educational psychology, EHCNA, EBSA, and more." />
            </Head>
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold mb-8 text-center text-sky-700">EdPsych Connect Blog</h1>
                
                {posts.length === 0 ? (
                    <p className="text-center text-gray-600 text-lg">No blog posts available yet. Please check back soon!</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <article key={post.slug} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                                <div className="p-6 flex flex-col flex-grow">
                                    <h2 className="text-2xl font-semibold mb-3 text-sky-600 hover:text-sky-800">
                                        <Link href={`/blog/${post.slug}`}>
                                            {post.title}
                                        </Link>
                                    </h2>
                                    <p className="text-gray-500 text-sm mb-3">Published on {new Date(post.date).toLocaleDateString("en-GB", { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    <p className="text-gray-700 mb-4 flex-grow">{post.excerpt || "Read more to learn about this topic..."}</p>
                                    <Link href={`/blog/${post.slug}`} className="mt-auto inline-block text-sky-600 hover:text-sky-800 font-semibold self-start">
                                        Read More &rarr;
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const approvedDir = path.resolve(process.cwd(), 'content/blog/approved');
    let posts: Post[] = [];

    try {
        if (fs.existsSync(approvedDir)) {
            const files = fs.readdirSync(approvedDir);
            posts = files
                .filter(file => file.endsWith('.md'))
                .map(filename => {
                    const filePath = path.join(approvedDir, filename);
                    const fileContents = fs.readFileSync(filePath, 'utf8');
                    const { data, content } = matter(fileContents);
                    const wordCount = content.split(/\s+/).length;
                    const autoExcerpt = content.split(/\s+/).slice(0, 30).join(" ") + (wordCount > 30 ? "..." : "");

                    return {
                        slug: filename.replace(/\.md$/, ''),
                        title: data.title || filename.replace(/\.md$/, '').replace(/_/g, ' '),
                        date: data.date || new Date().toISOString(), // Ensure date exists
                        excerpt: data.excerpt || autoExcerpt,
                    };
                })
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by date, newest first
        }
    } catch (error) {
        console.error("Error in getStaticProps for blog index:", error);
        // Return empty posts array or handle error as appropriate
    }

    return {
        props: {
            posts,
        },
        revalidate: 60, // Revalidate every 60 seconds to pick up new posts
    };
};

export default BlogIndexPage;

