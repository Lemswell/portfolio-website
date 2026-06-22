import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export async function compileMarkdown(
  rawMarkdownString: string,
): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(rawMarkdownString)
    .catch((e) => {
      console.error("Error compiling markdown:", e);
      return null; // return null if there's an error during compilation
    });

  const compiledContent = outsideLinkFormatter(String(file));

  return compiledContent;
}

export function outsideLinkFormatter(compiledMarkdown: string): string {
  let compiledContent: string = compiledMarkdown;

  let index_of_last_closing_bracket: number = -1;
  for (let i = compiledContent.length - 1; i >= 0; i--) {
    if (compiledContent[i] === `>`) {
      index_of_last_closing_bracket = i;
    }
    if (i + 10 <= compiledContent.length) {
      if (compiledContent.substring(i, i + 10) === `href="http`) {
        // for every outside link
        if (index_of_last_closing_bracket !== -1) {
          compiledContent =
            compiledContent.substring(0, index_of_last_closing_bracket) +
            ` target="_blank" rel="noopener noreferrer"` +
            compiledContent.substring(index_of_last_closing_bracket);
          index_of_last_closing_bracket = -1;
        }
      }
    }
  }
  // target="_blank" rel="noopener noreferrer"

  return compiledContent;
}
