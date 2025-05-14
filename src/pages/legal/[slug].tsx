import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import Head from "next/head";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const legalDir = path.join(process.cwd(), "content/legal");

export async function getStaticPaths() {
  const filenames = fs.readdirSync(legalDir);
  const paths = filenames.map((filename) => ({
    params: { slug: filename.replace(/\.md$/, "") },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const fullPath = path.join(legalDir, `${params.slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    props: {
      slug: params.slug,
      frontmatter: data,
      contentHtml,
    },
  };
}

interface LegalPageProps {
  slug: string;
  frontmatter: { [key: string]: any };
  contentHtml: string;
}

export default function LegalPage({ slug, frontmatter, contentHtml }: LegalPageProps) {
  const pageTitle = frontmatter.title || slug.replace(/-/g, " ").split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

  return (
    <>
      <Head>
        <title>{`${pageTitle} - EdPsych Connect`}</title>
        <meta name="description" content={`Read the ${pageTitle} for EdPsych Connect.`} />
      </Head>
      <Navbar />
      <main className="container mx-auto px-4 py-8 lg:py-16">
        <article className="prose lg:prose-xl max-w-none mx-auto bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-md">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800 border-b pb-4">{pageTitle}</h1>
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </article>
      </main>
      <Footer />
    </>
  );
}

