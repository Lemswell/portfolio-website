import { Github, Linkedin, Email, FileDownload } from '@/components/ui/icons/index';
import ToggleNameWithComment from '@/components/ui/ToggleNames';
import HoverBadge from '@/components/ui/HoverBadge';
import Age from '@/components/ui/DynamicAge';
import { fetchRepos } from '@/lib/github';


export default async function Home() {
  const repos = await fetchRepos()
  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <section id="hero">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 flex items-center line-clamp-1">
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
          <span className='text-zinc-500'>|</span>
          <a className="flex items-center text-zinc-800 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors" href="mailto:lemdelac@gmail.com" target="_blank" rel="noopener noreferrer">
            <FileDownload className="w-5 h-5" />
            <HoverBadge trigger={<span className='ml-2 text-sm'>Download</span>} content={<p className="text-white text-[0.7rem]">{"Download my resum\u00e9"}</p>} />
          </a>

        </section>
      </section>
      <section id="projects" className="mt-16">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 flex items-center line-clamp-1">Projects</h2>
        <pre>{JSON.stringify(repos, null, 2)}</pre>
      </section>
      <section id="career" className="mt-16"></section>
      <section id="blog" className="mt-16"></section>
    </main>
    
  );
}