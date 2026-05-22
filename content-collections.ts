import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMarkdown } from "@content-collections/markdown";
import { z } from "zod";

// for more information on configuration, visit:
// https://www.content-collections.dev/docs/configuration

const posts = defineCollection({
  name: "posts",
  directory: "content/blog",
  include: "**/*.md",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.string().array(),
    grouping: z.string(),
    tldr: z.string().optional()
  }),
  transform: async (document, context) => {
  const compiledContent = await compileMarkdown(context, document);
    return {
      ...document,
      compiledContent
    };
  }
});

const projects = defineCollection({
  name: "projects",
  directory: "content/projects",
  include: "**/*.md",
  schema: z.object({
    description: z.string().optional(),
  }),
  transform: async (document, context) => {
    const compiledContent = await compileMarkdown(context, document);
    return {
      ...document,
      compiledContent
    };
  }
});

export default defineConfig({
  collections: [posts, projects],
});
