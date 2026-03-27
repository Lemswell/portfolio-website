import { Github, Linkedin, Email } from '@/components/ui/icons/index';
import ToggleNameWithComment from '@/components/ui/ToggleNames';
import HoverBadge from '@/components/ui/HoverBadge';
import Age from '@/components/ui/DynamicAge';

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <section id="hero">
        <h1 className="text-6xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 flex items-center">
          <ToggleNameWithComment />
        </h1>
        <div className="mt-3 text-lg fill-zinc-800 dark:fill-zinc-100 leading-6">
          {"A "}<Age />{" year old developer based in "}<HoverBadge trigger={<span className="hover:underline">{"Sydney, Australia 🇦🇺"}</span>} content={<p>Down under mate</p>} />
        </div>
        <p className="mt-3 text-lg  fill-zinc-800 dark:fill-zinc-100 leading-6">
          {"I like learning about things so that I can build cool, useful software. Currently exploring web development."}
        </p>
        <section id="links" className="mt-6 flex gap-5 m-auto">
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
          <a className="flex items-center text-zinc-800 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors" href="mailto:lemdelac@gmail.com" target="_blank" rel="noopener noreferrer">
            <Email className="w-5 h-5" />
            <span className='ml-2 text-sm'>Email</span>
          </a>

        </section>
      </section>
      <section id="career" className="mt-16"></section>
      <section id="featured-projects" className="mt-16"></section>
      <section id="latest-blog" className="mt-16"></section>
    </main>
    
  );
}