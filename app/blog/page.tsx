import BlogPostList from "@/components/ui/BlogPostList";
import Link from 'next/link';

export default function App() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <header className="my-8">
        <Link href="/" className="text-xl sm:text-2xl font-bold tracking-tight text-blue-950 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 transition-colors">
          {"Lemuel's\u00A0"}<span></span>
        </Link>
        <h1 className={`pb-1 text-5xl sm:text-6xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 flex items-center line-clamp-1`}>
          Blog
        </h1>
        <p className='text-sm justify-center whitespace-pre-line text-zinc-600 tracking-normal font-medium font-mono mt-3 line-clamp-1'>
          {`A list of some recent thoughts and experiences I've written in blog form.`}
        </p>
      </header>
      <hr className='my-8 border-black/10 dark:border-white/10'></hr>
      < BlogPostList />
    </main>
  );
}
