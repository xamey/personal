import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Blogpost() {
  const [content, setContent] = useState(null);
  const sha = new URLSearchParams(window.location.search).get("sha");
  const title = new URLSearchParams(window.location.search).get("title");

  console.log(sha);
  useEffect(() => {
    fetch(`https://api.github.com/repos/xamey/blogposts/git/blobs/${sha}`)
      .then((response) => response.json())
      .then((data) => setContent(atob(data.content)));
  }, []);

  return (
    <div className="text-white mx-auto p-12 space-y-8 prose">
      <h4 className="text-violet-500 text-4xl font-semibold">{title}</h4>
      <span className="text-xs bg-white/5 px-2 py-1 rounded-full"></span>
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-3xl mb-4" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-2xl mb-4 text-purple-300" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-xl mb-4" {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 className="text-lg mb-4" {...props} />
          ),
          h5: ({ node, ...props }) => (
            <h5 className="text-base mb-4" {...props} />
          ),
          h6: ({ node, ...props }) => (
            <h6 className="text-sm mb-4" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc mb-4" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal ml-4 mb-4" {...props} />
          ),
          li: ({ node, ...props }) => <li className="ml-4" {...props} />,
          a: ({ node, ...props }) => (
            <a className="text-violet-500" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
