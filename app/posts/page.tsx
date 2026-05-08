import { allPosts } from "content-collections";
 
export default function App() {
  return (
    <main>
      <h1>Posts</h1>
      <ul>
        {allPosts.map((post) => (
          <li key={post._meta.path}>
            <h2>{post.title}</h2>
            {post.compiledContent}
            <hr />
          </li>
        ))}
      </ul>
    </main>
  );
}