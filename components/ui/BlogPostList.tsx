import { allPosts } from "content-collections";
import BlogPostCard from "./BlogPostCard";
 
export default function App() {
  return (
      <ul className="rounded-md border border-black/10 dark:border-white/10 hover:border-blue-300/50 transition-colors duration-200">
        {allPosts.map((post, index: number) => (
          <>
            <BlogPostCard post={post} key={post._meta.fileName}/>
            {index !== allPosts.length - 1 && <hr className="border-black/10 dark:border-white/10" />}
          </>
        ))}
      </ul>
  );
}