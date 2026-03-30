const Navbar = () => {
  return (
    <nav className="max-w-4xl mx-auto w-full py-4 px-6 flex gap-4">
      <a href="/" className="text-sm text-zinc-800 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors">Home</a>
      {/* <a href="#career" className="text-sm text-zinc-800 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors">Career</a> */}
      <a href="#projects" className="text-sm text-zinc-800 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors">Projects</a>
      <a href="#blog" className="text-sm text-zinc-800 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors">Blog</a>
    </nav>
  )
}

export default Navbar