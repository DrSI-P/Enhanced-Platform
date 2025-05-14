import React, { useState, useEffect } from 'react';
import Head from 'next/head';
// import { useSession } from 'next-auth/react'; // Would be used to protect this page

interface DraftPost {
    filename: string;
    title: string;
}

interface DraftPostContent extends DraftPost {
    content: string;
}

const AdminBlogReviewPage: React.FC = () => {
    // const { data: session, status } = useSession(); // Protect route
    const [drafts, setDrafts] = useState<DraftPost[]>([]);
    const [selectedDraft, setSelectedDraft] = useState<DraftPostContent | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const fetchDrafts = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/admin/blog/drafts');
            if (!res.ok) {
                throw new Error(`Failed to fetch drafts: ${res.statusText}`);
            }
            const data = await res.json();
            setDrafts(data);
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchDrafts();
    }, []);

    const fetchDraftContent = async (filename: string) => {
        setIsLoading(true);
        setError(null);
        setSelectedDraft(null);
        try {
            const res = await fetch(`/api/admin/blog/draft/${filename}`);
            if (!res.ok) {
                throw new Error(`Failed to fetch draft content: ${res.statusText}`);
            }
            const data: DraftPostContent = await res.json();
            setSelectedDraft(data);
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    };

    const approvePost = async (filename: string) => {
        setIsLoading(true);
        setError(null);
        setSuccessMessage(null);
        try {
            const res = await fetch('/api/admin/blog/approve', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ filename }),
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || `Failed to approve post: ${res.statusText}`);
            }
            setSuccessMessage(`Post "${filename}" approved successfully!`);
            setSelectedDraft(null); // Clear selected draft
            fetchDrafts(); // Refresh draft list
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    };

    // if (status === "loading") return <p>Loading session...</p>; // Auth check
    // if (!session) return <p>Access Denied. Please log in as admin.</p>; // Auth check

    return (
        <>
            <Head>
                <title>Admin - Review Blog Drafts | EdPsych Connect</title>
            </Head>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Review Blog Drafts</h1>

                {error && <p className="text-red-500 bg-red-100 p-3 rounded mb-4">Error: {error}</p>}
                {successMessage && <p className="text-green-500 bg-green-100 p-3 rounded mb-4">{successMessage}</p>}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1 bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Draft Posts</h2>
                        {isLoading && drafts.length === 0 && <p>Loading drafts...</p>}
                        {drafts.length === 0 && !isLoading && <p>No drafts available for review.</p>}
                        <ul className="space-y-2">
                            {drafts.map((draft) => (
                                <li key={draft.filename}>
                                    <button 
                                        onClick={() => fetchDraftContent(draft.filename)}
                                        className={`w-full text-left px-3 py-2 rounded hover:bg-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-500 ${selectedDraft?.filename === draft.filename ? 'bg-sky-100 font-semibold' : 'bg-gray-50'}`}
                                    >
                                        {draft.title}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <button onClick={fetchDrafts} disabled={isLoading} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300">
                            {isLoading ? 'Refreshing...' : 'Refresh Drafts'}
                        </button>
                    </div>

                    <div className="md:col-span-2 bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Draft Content</h2>
                        {isLoading && selectedDraft && <p>Loading content...</p>}
                        {selectedDraft ? (
                            <article className="prose lg:prose-xl max-w-none">
                                <h3 className="text-2xl font-bold mb-3">{selectedDraft.title}</h3>
                                <div dangerouslySetInnerHTML={{ __html: selectedDraft.content.replace(/\n/g, '<br />') }} /> {/* Basic rendering, consider Markdown parser */}
                                <button 
                                    onClick={() => approvePost(selectedDraft.filename)}
                                    disabled={isLoading}
                                    className="mt-6 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300 font-semibold"
                                >
                                    {isLoading ? 'Approving...' : 'Approve Post'}
                                </button>
                            </article>
                        ) : (
                            <p>Select a draft from the list to view its content and approve.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminBlogReviewPage;

