import AnimateName from '../components/AnimateName';

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
        {"Hi, I'm "}<AnimateName />
      </h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 leading-6">
        {"25 yo software engineer student from Sydney, Australia"}
      </p>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 leading-6">
        {"I like learning about software so that I can build useful applications. Currently exploring web development."}
      </p>
    </main>
  );
}