import { Github, Linkedin, Email, Download } from '@/components/ui/icons/index';
import ToggleName from '@/components/ui/ToggleNames';

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
        {"Hi, I'm "}<ToggleName />
      </h1>
      <p className="mt-4 text-lg  fill-zinc-800 dark:fill-zinc-100 leading-6">
        {"25 yo software engineer student from Sydney, Australia"}
        <br />
        {"I like learning about things so that I can build cool, useful software. Currently exploring web development."}
      </p>
      <section className="mt-6 flex gap-5 m-auto">
        <a className="flex items-center" href="https://www.linkedin.com/in/lemdc/" target="_blank" rel="noopener noreferrer" title='LinkedIn'>
          <Linkedin className="w-6 h-6 fill-zinc-800 dark:fill-zinc-100 hover:fill-zinc-600 dark:hover:fill-zinc-400 transition-colors" />
        </a>
        <a className="flex items-center" href="https://github.com/Lemswell" target="_blank" rel="noopener noreferrer" title='GitHub'>
          <Github className="w-6 h-6 fill-zinc-800 dark:fill-zinc-100 hover:fill-zinc-600 dark:hover:fill-zinc-400 transition-colors" />
        </a>
        <a className="flex items-center" href="mailto:lemdelac@gmail.com" target="_blank" rel="noopener noreferrer">
          <Email className="w-6 h-6 stroke-zinc-800 dark:stroke-zinc-100 hover:stroke-zinc-600 dark:hover:stroke-zinc-400 " />
        </a>
        <a className="flex items-center" href="" target="_blank" rel="noopener noreferrer">
          <Download className="w-6 h-6 stroke-zinc-800 dark:stroke-zinc-100 hover:stroke-zinc-600 dark:hover:stroke-zinc-400 " />
        </a>
      </section>
    </main>
    
  );
}