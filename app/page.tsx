import { Github } from '@/components/ui/icons/index';
import ToggleName from '@/components/ui/ToggleNames';

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
        {"Hi, I'm "}<ToggleName />
      </h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 leading-6">
        {"25 yo software engineer student from Sydney, Australia"}
      </p>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 leading-6">
        {"I like learning about things so that I can build cool, useful software. Currently exploring web development."}
      </p>
      <section className="mt-6 flex gap-5 m-auto">
        <a className="flex items-center" href="https://www.linkedin.com/in/lemdc/" target="_blank" rel="noopener noreferrer">
        </a>
        <a className="flex items-center" href="https://github.com/Lemswell" target="_blank" rel="noopener noreferrer">
          <Github className="w-6 h-6 fill-zinc-800 dark:fill-zinc-100 hover:fill-zinc-600 dark:hover:fill-zinc-400 transition-colors" />
        </a>
      </section>
    </main>
    
  );
}