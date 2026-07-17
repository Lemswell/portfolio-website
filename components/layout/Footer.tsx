import { Github, Linkedin, Email } from '@/components/ui/icons/index';
import Link from 'next/link';

const Footer = () => {

  const version = 'v0.7' // todo: replace with commit id

  return (
    <footer className='w-full pt-12'>
      <div className="mx-auto flex max-w-4xl sm:flex-row-reverse sm:justify-between flex-col items-center justify-center px-8 pb-32 text-zinc-800/60 dark:text-zinc-100/60">
        <section className="flex gap-4">
          <Link className="hover:text-zinc-500/90 transition-colors" href="https://www.linkedin.com/in/lemdc" title='home'>
            <Linkedin className="w-5 h-5" />
          </Link>
          <Link className="hover:text-zinc-500/90 transition-colors" href="https://github.com/Lemswell" title='projects'>
            <Github className="w-5 h-5" />
          </Link>
          <Link className="hover:text-zinc-500/90 transition-colors" href="mailto:lemdelac+website@gmail.com" title="blog">
            <Email className="w-5 h-5" />
          </Link>
        </section>
        <section className="">
          <span className='font-mono text-xs'>{version}</span>
        </section>
      </div>
    </footer>
  )
}

export default Footer
