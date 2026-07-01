import { fetchRepoByName, fetchRepoReadme } from "@/lib/github";
import {
  Github,
  Calendar,
  WebsiteLink,
  File,
  AlertCircle,
} from "@/components/ui/icons";
import Link from "next/link";
import { allProjects } from "content-collections";
import TagList from "@/components/ui/TagList";
import BlogPostList from "@/components/ui/BlogPostList";
import { filteredPosts } from "@/lib/posts";
import { formatDate } from "@/lib/formatDate";
import { notFound } from "next/navigation";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { compileMarkdown } from "@/lib/markdown";

const ProjectPageDisplay = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const project = allProjects.find((proj) => {
    return proj._meta.fileName === `${slug}.md`;
  });
  const repo = await fetchRepoByName(slug).catch((e) =>
    project ? null : notFound(),
  ); // catch error if repo not found
  const readmeRaw = await fetchRepoReadme(slug).catch((e) => {
    console.log(e);
    return null;
  });
  const readmeContent = readmeRaw ? await compileMarkdown(readmeRaw) : null;
  const heading = repo?.name
    ? repo.name
    : project
      ? project._meta.fileName.slice(0, -3)
      : ""; // prepping for non-software/github projects

  const posts = filteredPosts([slug]);

  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <header className="my-8">
        <section>
          <Link
            href="/projects"
            className="text-xl sm:text-2xl font-bold tracking-tight text-blue-950 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 transition-colors"
          >
            {"Project\u00A0"}
          </Link>
          <h1 className="pb-1 text-5xl sm:text-6xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 flex items-center line-clamp-1">
            {heading.charAt(0).toUpperCase() + heading.slice(1)}
          </h1>
        </section>
        <section className="mt-3 flex flex-col gap-2">
          {repo && (
            <div className="my-1 flex items-center gap-3 text-zinc-500/80 dark:text-zinc-400/80">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="text-xs">{formatDate(repo.pushed_at)}</span>
              </div>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-blue-950 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              {repo.homepage != "" && (
                <a
                  href={repo.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-blue-950 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 transition-colors"
                >
                  <WebsiteLink className="w-4 h-4 shrink-0" />
                </a>
              )}
            </div>
          )}
          {/* displaying locally written description over GitHub description */}
          {repo || project?.description ? (
            <p className="text-md line-clamp-2">
              {project?.description ? project?.description : repo?.description}
            </p>
          ) : null}
          {repo && (
            <TagList
              tags={
                repo.language
                  ? [repo.language].concat(repo.topics)
                  : repo.topics
              }
            />
          )}
        </section>
      </header>

      <hr className="border-black/10 dark:border-white/10" />
      <section className="flex flex-col gap-10 my-10">
        {project && (
          <article
            dangerouslySetInnerHTML={{ __html: project.compiledContent }}
            className="prose sm:prose-lg dark:prose-invert mx-auto max-w-6xl
        prose-headings:font-semibold"
          />
        )}

        {(readmeContent || project?.status || repo?.archived) && (
          <article className=" mx-0 md:mx-10 flex flex-col rounded-md border border-black/10 dark:border-white/10">
            {/* README LINK */}
            {readmeContent && (
              <div
                className="py-2 px-3 text-sm line-clamp-1 text-zinc-600 font-medium font-mono overflow-x-auto whitespace-nowrap no-scrollbar hover:underline
              border-b border-black/10 dark:border-white/10"
              >
                <a
                  href={repo?.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {`${repo?.full_name}`}
                </a>
                <a
                  href={repo?.html_url + "/blob/main/README.md"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {`/README.md`}
                </a>
              </div>
            )}
            {readmeContent && (
              <MarkdownRenderer
                compiledHtml={readmeContent ?? "No README.md found."}
                className="prose dark:prose-invert p-8 max-w-6xl py-6
          text-zinc-600 dark:text-zinc-400 max-h-80 overflow-y-scroll
          prose-headings:font-semibold prose-headings:text-zinc-600 dark:prose-headings:text-zinc-400 prose-a:text-zinc-600 dark:prose-a:text-zinc-400"
              />
            )}
            {/* STATUS */}
            {(project?.status || repo?.archived) && (
              <div
                className="max-w-full flex items-center text-sm line-clamp-1 text-zinc-600 font-medium font-mono
                border-t border-black/10 dark:border-white/10"
              >
                <span className="hidden sm:flex py-2 px-4 items-center gap-2 border-r border-black/10 dark:border-white/10">
                  <AlertCircle />
                  <span>{`NOTE`}</span>
                </span>
                <span className="py-2 px-4 text-sm line-clamp-1 overflow-x-auto whitespace-nowrap no-scrollbar">{`This project is ${project?.status ? (project.status === "wip" ? "a work in progress" : project.status) : "archived"}.`}</span>
              </div>
            )}
          </article>
        )}
      </section>

      {posts.length > 0 && (
        <header className="border-t border-black/10 dark:border-white/10 py-8 flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 flex items-center line-clamp-1">
              <File className="mr-3 text-blue-950 dark:text-blue-400 shrink-0" />
              <Link
                href="/blog"
                className="hover:text-blue-900 dark:hover:text-blue-300 transition-colors line-clamp-1 min-w-fit"
              >
                {`Blog Posts\u00a0`}
              </Link>
              <span className="text-lg sm:text-xl text-zinc-800/60 dark:text-zinc-100/60">
                {`(related to ${repo?.name ? repo?.name : [slug]})`}
              </span>
            </h2>
            {/*<Link
            href="/blog"
            className="hidden sm:inline text-sm text-zinc-800/60 dark:text-zinc-100/60 tracking-normal font-medium font-mono hover:text-blue-900 dark:hover:text-blue-300 transition-colors"
          >{`see all \u2192`}</Link>*/}
          </div>
          <p className="mb-3 text-sm justify-center whitespace-pre-line  text-zinc-800/60 dark:text-zinc-100/60 tracking-normal font-medium font-mono">
            {`Here are my latest thoughts when documenting this project.`}
          </p>
          <BlogPostList displayLim={4} posts={posts} />
        </header>
      )}
    </main>
  );
};

export default ProjectPageDisplay;
