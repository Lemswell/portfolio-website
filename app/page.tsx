import { Github, Linkedin, Email } from '@/components/ui/icons/index';
import ToggleName from '@/components/ui/ToggleNames';
import Age from '@/components/ui/DynamicAge';

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <section id="hero">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 flex items-center">
          {"Hi, I'm"}<ToggleName />
        </h1>
        <p className="mt-4 text-lg  fill-zinc-800 dark:fill-zinc-100 leading-6">
          {"A "}<Age />{" year old developer based in Sydney, Australia 🇦🇺"}
        </p>
        <p className="mt-1 text-lg  fill-zinc-800 dark:fill-zinc-100 leading-6">
          {"I like learning about things so that I can build cool, useful software. Currently exploring web development."}
        </p>
        <section id="links" className="mt-6 flex gap-5 m-auto">
          <a className="flex items-center" href="https://www.linkedin.com/in/lemdc/" target="_blank" rel="noopener noreferrer" title='LinkedIn'>
            <Linkedin className="w-5 h-5 fill-zinc-800 dark:fill-zinc-100 hover:fill-zinc-600 dark:hover:fill-zinc-400 transition-colors" />
            <span className='ml-2 text-sm'>LinkedIn</span>
          </a>
          <a className="flex items-center" href="https://github.com/Lemswell" target="_blank" rel="noopener noreferrer" title='GitHub'>
            <Github className="w-5 h-5 fill-zinc-800 dark:fill-zinc-100 hover:fill-zinc-600 dark:hover:fill-zinc-400 transition-colors" />
            <span className='ml-2 text-sm'>GitHub</span>
          </a>
          <a className="flex items-center" href="mailto:lemdelac@gmail.com" target="_blank" rel="noopener noreferrer">
            <Email className="w-5 h-5 stroke-zinc-800 dark:stroke-zinc-100 hover:stroke-zinc-600 dark:hover:stroke-zinc-400 " />
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