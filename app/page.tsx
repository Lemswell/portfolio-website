import LinkedInSVG from '../public/linkedin-svgrepo-com.svg';
import GithubSVG from '../public/github-142-svgrepo-com.svg';
import ToggleName from '../components/ToggleNames';

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
        {"Hi, I'm "}<ToggleName />
      </h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 leading-6">
        {"25 yo software engineer student from Sydney, Australia"}
      </p>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 leading-6">
        {"I like learning about things so that I can build cool, useful software. Currently exploring web development."}
      </p>
    </main>
    
  );
}