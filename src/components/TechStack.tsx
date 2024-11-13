import React from "react";

const technologies = {
  languages: ["TypeScript", "JavaScript", "Ruby", "Kotlin"],
  frameworks: ["Ember.js", "Ruby on Rails", "React", "Astro.build"],
  cicd: ["GitHub Actions", "CircleCI"],
  monitoring: ["Sentry", "Datadog"],
  databases: ["PostgreSQL", "Redis"],
  ide: ["Cursor", "VSCode"],
};

export default function TechStack() {
  return (
    <section className="space-y-8">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold">Technical Expertise</h2>
        <p className="text-gray-400">
          Technologies I work with on a daily basis
        </p>
      </div>
      <div className="space-y-8">
        {Object.entries(technologies).map(([category, techs]) => (
          <div key={category}>
            <h3 className="text-sm font-medium text-violet-400 uppercase tracking-wider mb-3">
              {category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {techs.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm
                    hover:bg-white/10 transition-colors duration-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
