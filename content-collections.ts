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
  }),
});

const projects = defineCollection({
  name: "projects",
  directory: "content/projects",
  include: "**/*.mdx",
  schema: z.object({
    description: z.string(),
  }),
  transform: async (project) => {
    const compiledContent = await compileMarkdown(project.content);
    return {
      ...project,
      slug: project._meta.path, // Automatically create a slug from the filename
    };
  }
});

export default defineConfig({
  collections: [posts, projects],
});
