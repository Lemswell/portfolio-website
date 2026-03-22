const Navbar = () => {
  return (
    <nav className="w-full py-4 px-6 flex justify-end gap-4">
      <a href="#hero" className="text-sm text-zinc-800 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors">Home</a>
      <a href="#career" className="text-sm text-zinc-800 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors">Career</a>
      <a href="#featured-projects" className="text-sm text-zinc-800 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors">Projects</a>
      <a href="#latest-blog" className="text-sm text-zinc-800 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors">Blog</a>
    </nav>
  )
}

export default Navbar