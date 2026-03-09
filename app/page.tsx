
import ToggleName from '../components/ToggleNames';

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
      <div className="mt-6 flex space-x-4">
        <a className='flex items-center mx-4' href="https://www.linkedin.com/in/lemuel-delacruz/" target="_blank" rel="noopener noreferrer">
          <img src='/linkedin-svgrepo-com.svg' alt="LinkedIn" className="w-5 h-5 mr-2" />
          | LinkedIn
        </a>
        <a className='flex items-center mx-4' href="https://github.com/Lemswell" target="_blank" rel="noopener noreferrer">
          <img src='/github-142-svgrepo-com.svg' alt="GitHub" className="w-5 h-5 mr-2" />
          | GitHub
        </a>
      </div>
    </main>
    
  );
}