import { fetchRepoByName, fetchRepoReadme } from "@/lib/github";
import { Github, Calendar, WebsiteLink, File } from "@/components/ui/icons";
import Link from "next/link";
import { allProjects } from "content-collections";
import TagList from "@/components/ui/TagList";
import BlogPostList from "@/components/ui/BlogPostList";
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

      <section className="flex flex-col gap-3">
        {project && (
          <article
            dangerouslySetInnerHTML={{ __html: project.compiledContent }}
            className="prose sm:prose-lg dark:prose-invert mt-3 mx-auto max-w-6xl py-6
        prose-headings:font-semibold"
          />
        )}

        {readmeContent && (
          <section
            suppressHydrationWarning
            className="my-10 mx-0 md:m-10 mt-5 flex flex-col rounded-md border border-black/10 dark:border-white/10"
          >
            <div className="p-3 text-sm line-clamp-1 justify-center text-zinc-600 font-medium font-mono overflow-x-auto whitespace-nowrap no-scrollbar">
              <a
                href={repo?.html_url + "/blob/main/README.md"}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {`${repo?.full_name}/README.md`}
              </a>
            </div>
            <hr className="border-black/10 dark:border-white/10" />
            <MarkdownRenderer
              compiledHtml={readmeContent}
              className="prose dark:prose-invert p-8 mx-auto max-w-6xl py-6
          text-zinc-600 dark:text-zinc-400 max-h-80 overflow-y-scroll
          prose-headings:font-semibold prose-headings:text-zinc-600 dark:prose-headings:text-zinc-400 prose-a:text-zinc-600 dark:prose-a:text-zinc-400"
            />
          </section>
        )}
      </section>
      {(project || readmeContent) && (
        <hr className="border-black/10 dark:border-white/10" />
      )}

      <section id="relevant-blog" className="my-8 flex flex-col gap-5">
        <div className="mb-4 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 flex items-center line-clamp-1">
              <File className="mr-3 text-blue-950 dark:text-blue-400 shrink-0" />
              <Link
                href="/blog"
                className="hover:text-blue-900 dark:hover:text-blue-300 transition-colors"
              >
                {`Blog Posts\u00a0`}
              </Link>
              <span className="text-lg sm:text-xl text-zinc-800/60 dark:text-zinc-100/60">
                {`(that are related to ${repo?.name ? repo?.name : [slug]})`}
              </span>
            </h2>
            <Link
              href="/blog"
              className="text-sm sm:text-base text-zinc-800/60 dark:text-zinc-100/60 hover:text-blue-900 dark:hover:text-blue-300 transition-colors"
            >{`see all \u2192`}</Link>
          </div>
        </div>
        <BlogPostList displayLim={5} tags={[slug]} />
        {/* TODO: add expand button */}
      </section>
    </main>
  );
};

export default ProjectPageDisplay;
