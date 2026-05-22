import { compileMarkdown } from "@/lib/markdown";

const MarkdownRenderer = async ({ rawMarkdown, className }: { rawMarkdown: string; className?: string }) => {
    const compiledContent = await compileMarkdown(rawMarkdown);

    return (
        <article className={className} dangerouslySetInnerHTML={{ __html: compiledContent }} />
    )
}

export default MarkdownRenderer;