'use client';

const MarkdownRenderer = ({ compiledHtml, className }: { compiledHtml: string; className?: string }) => {
    return (
        <article className={className} dangerouslySetInnerHTML={{ __html: compiledHtml }} />
    )
}

export default MarkdownRenderer;
