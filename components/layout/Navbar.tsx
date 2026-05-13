import { File, Folders, Home } from '@/components/ui/icons/index';

const Navbar = () => {
  return (
    <nav className="fixed left-1/2 transform -translate-x-1/2 max-w-4xl w-full py-2 px-5 flex gap-4 backdrop-blur-md rounded-b-lg">
      <section id="links" className="my-4 ml-0 flex gap-5 m-auto">
          <a className="flex items-center text-zinc-800 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors" href="/" target="_blank" rel="noopener noreferrer" title='home'>
            <Home className="w-5 h-5" />
            <span className='ml-2 text-sm'>Home</span>
          </a>
          <a className="flex items-center text-zinc-800 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors" href="/projects" target="_blank" rel="noopener noreferrer" title='projects'>
            <Folders className="w-5 h-5" />
            <span className='ml-2 text-sm'>Projects</span>
          </a>
          <a className="flex items-center text-zinc-800 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors" href="/blog" target="_blank" rel="noopener noreferrer" title="blog">
            <File className="w-5 h-5" />
            <span className='ml-2 text-sm'>Blog</span>
          </a>
        </section>
    </nav>
  )
}

export default Navbar