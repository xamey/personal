import React, { useEffect, useState } from "react";
import Line from "./Line";

interface Post {
  title: string;
  sha: string;
}

export default function Blogposts() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("https://api.github.com/repos/xamey/blogposts/contents/posts")
      .then((response) => response.json())
      .then((data) => {
        const parsedPosts = data.map((item: any) => ({
          title: decodeURIComponent(item.name.replace(".md", "")),
          sha: item.sha,
        }));

        setPosts(parsedPosts.reverse());
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  return (
    <section className="space-y-8">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold">Posts</h2>
        <p className="text-gray-400">Some of my thoughts on various topics</p>
      </div>
      <div className="grid gap-4">
        {posts.map((post) => (
          <Line
            href={`/post?sha=${post.sha}&title=${post.title}`}
            key={post.sha}
            title={post.title}
            thisWindow={true}
          />
        ))}
      </div>
    </section>
  );
}
