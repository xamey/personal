import React from "react";

const books = [
  {
    title:
      "Grokking Simplicity: Taming complex software with functional thinking",
    author: "Eric Normand",
    url: "https://grokkingsimplicity.com/",
  },
  {
    title: "Domain-Driven Rails",
    author: "Arkency",
    url: "https://products.arkency.com/domain-driven-rails/",
  },
  {
    title: "High Performance PostgreSQL for Rails",
    author: "Andrew Atkinson",
    url: "https://pragprog.com/titles/aapsql/high-performance-postgresql-for-rails/",
  },
  {
    title: "Obversability Engineering",
    author: "Charity Majors - Liz Fong-Jones - George Miranda",
    url: "https://www.oreilly.com/library/view/observability-engineering/9781492076438/",
  },
];

export default function Books() {
  return (
    <section className="space-y-8">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold">Technical Reading</h2>
        <p className="text-gray-400">
          Books that shaped my engineering mindset
        </p>
      </div>
      <div className="grid gap-4">
        {books.map((book) => (
          <a
            href={book.url}
            target="_blank"
            rel="noopener noreferrer"
            key={book.url}
            className="p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 
            transition-colors duration-200 group"
          >
            <div
              key={book.title}
              className="p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 
              transition-colors duration-200"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold">{book.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">by {book.author}</p>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
