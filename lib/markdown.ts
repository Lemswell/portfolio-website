import rehypeStringify from "rehype-stringify";
import rehypeExternalLinks from "rehype-external-links";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export async function compileMarkdown(
  rawMarkdownString: string,
): Promise<string> {
  if (!rawMarkdownString || rawMarkdownString.trim() === "") return "";
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeExternalLinks, {
      target: "_blank",
      rel: ["noopener", "noreferrer", "nofollow"],
    })
    .use(rehypeStringify)
    .process(rawMarkdownString)
    .catch((e) => {
      console.error("Error compiling markdown:", e);
      return null; // return null if there's an error during compilation
    });

  const compiledContent = String(file);

  return compiledContent;
}
