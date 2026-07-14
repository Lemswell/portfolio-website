import BlogPostList from "@/components/ui/BlogPostList";
import { filteredPosts } from "@/lib/posts";
import Link from "next/link";

export default function App() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <header className="my-8">
        <Link
          href="/"
          className="text-xl sm:text-2xl font-bold tracking-tight text-blue-950 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 transition-colors"
        >
          {"Lemuel's\u00A0"}
        </Link>
        <h1
          className={`pb-1 text-5xl sm:text-6xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 flex items-center`}
        >
          {`Blog\u00A0Posts`}
        </h1>
        <p className="text-sm justify-center whitespace-pre-line text-zinc-800/60 dark:text-zinc-100/60 tracking-normal font-medium font-mono mt-3">
          {`A list of some recent thoughts and experiences I've written in blog form.`}
        </p>
      </header>
      <hr className="my-8 border-black/10 dark:border-white/10"></hr>
      {/*<BlogPostFilters />*/}
      <BlogPostList posts={filteredPosts(false)} />
    </main>
  );
}
