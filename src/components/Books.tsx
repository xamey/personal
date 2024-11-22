import React from "react";
import Line from "./Line";

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
          <Line
            href={book.url}
            key={book.url}
            title={book.title}
            subtitle={book.author}
            description={book.url}
          />
        ))}
      </div>
    </section>
  );
}
