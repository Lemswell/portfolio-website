import { Github, Linkedin, Email, FileDownload, Folders, File } from '@/components/ui/icons/index';
import ToggleNameWithComment from '@/components/ui/ToggleNames';
import HoverBadge from '@/components/ui/HoverBadge';
import Age from '@/components/ui/DynamicAge';
import Link from 'next/link';
import { fetchRepos } from '@/lib/github';
import { RepoList } from '@/components/ui/RepoList';
import BlogPostList from '@/components/ui/BlogPostList';


export default async function Home() {
  
  const repos = await fetchRepos().catch((e) => []); // in case of error, return empty array to avoid breaking the page
  
  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <header className="my-8">
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 flex items-center line-clamp-1">
          <ToggleNameWithComment />
        </h1>
        <div className="mt-3 text-lg fill-zinc-800 dark:fill-zinc-100 leading-6">
          {"A "}<Age />{" year old developer based in "}
          <HoverBadge trigger={<span className="underline hover:opacity-50 transition-opacity">{"Sydney, Australia 🇦🇺"}</span>} content={<p className="text-white text-[0.7rem]">Down under mate</p>} />
        </div>
        <p className="mt-3 text-lg  fill-zinc-800 dark:fill-zinc-100 leading-6">
          {"I like learning about things so that I can build cool, useful software. Currently exploring web development."}
        </p>
        <section id="links" className="mt-7 flex gap-5 m-auto">
          <a className="flex items-center text-zinc-800 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors" href="https://www.linkedin.com/in/lemdc/" target="_blank" rel="noopener noreferrer" title='LinkedIn'>
            <Linkedin className="w-5 h-5" />
            <span className='ml-2 text-sm'>LinkedIn</span>
          </a>
          <span className='text-zinc-500'>|</span>
          <a className="flex items-center text-zinc-800 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors" href="https://github.com/Lemswell" target="_blank" rel="noopener noreferrer" title='GitHub'>
            <Github className="w-5 h-5" />
            <span className='ml-2 text-sm'>GitHub</span>
          </a>
          <span className='text-zinc-500'>|</span>
          <a className="flex items-center text-zinc-800 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors" href="mailto:lemdelac@gmail.com" target="_blank" rel="noopener noreferrer" title="Email me">
            <Email className="w-5 h-5" />
            <span className='ml-2 text-sm'>Email</span>
          </a>
          <span className='hidden text-zinc-500'>|</span>
          <a className="hidden items-center text-zinc-800 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors" href="mailto:lemdelac@gmail.com" target="_blank" rel="noopener noreferrer">
            <FileDownload className="w-5 h-5" />
            <HoverBadge trigger={<span className='ml-2 text-sm'>Download</span>} content={<p className="text-white text-[0.7rem]">{"Download my resum\u00e9"}</p>} />
          </a>

        </section>
      </header>
      <hr className='border-black/10 dark:border-white/10'></hr>
      <section id="projects" className="my-8 flex flex-col">
        <header className="mb-8 flex flex-col gap-3">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 flex items-center line-clamp-1">
            <Folders className='mr-3 text-blue-950 dark:text-blue-400' />
            <Link href="/projects" className="hover:text-blue-900 dark:hover:text-blue-300 transition-colors">Projects</Link>
          </h2>
          <p className='text-sm justify-center whitespace-pre-line text-zinc-600 tracking-normal font-medium font-mono mt-3'>
            {`Here are some recent projects I've worked on from my Github.`}
          </p>
        </header>
        <RepoList repos={repos} displayLim={5} />
      </section>
      <hr className='border-black/10 dark:border-white/10'></hr>

      <section id="blog" className="my-8 flex flex-col">
        <header className="mb-8 flex flex-col gap-3">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 flex items-center line-clamp-1">
            <File className='mr-3 text-blue-950 dark:text-blue-400' />
            <Link href="/blog" className="hover:text-blue-900 dark:hover:text-blue-300 transition-colors">Blog Posts</Link>
          </h2>
          <p className='text-sm justify-center whitespace-pre-line text-zinc-600 tracking-normal font-medium font-mono mt-3'>
            {`Here are some recent thoughts I've written up on my blog.`}
          </p>
        </header>
        <BlogPostList displayLim={2} />
      </section>
    </main>
    
  );
}