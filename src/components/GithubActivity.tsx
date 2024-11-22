import React, { useEffect, useState } from "react";
import Line from "./Line";

interface Repository {
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  fork: boolean;
}

interface Contribution {
  url: string;
  repo_name: string;
  title: string;
  state: string;
}

export default function GithubActivity() {
  const chunks = 5;
  const [repos, setRepos] = useState<Repository[]>([]);
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reposToShow, setReposToShow] = useState(chunks);
  const [contributionsToShow, setContributionsToShow] = useState(chunks);

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        // Fetch user's repositories
        const reposResponse = await fetch(
          "https://api.github.com/users/xamey/repos?sort=updated&per_page=100"
        );
        const reposData = await reposResponse.json();

        // Filter out forks and get the most relevant repos
        const significantRepos = reposData
          .filter((repo: Repository) => !repo.fork && repo.description)
          .sort(
            (a: Repository, b: Repository) =>
              b.stargazers_count - a.stargazers_count
          );

        setRepos(significantRepos);

        // Fetch user's recent activity
        const eventsResponse = await fetch(
          "https://api.github.com/search/issues?q=type:pr+author:xamey&per_page=100"
        );
        const eventsData = await eventsResponse.json();

        const prs = eventsData.items;
        // Process events into contributions, filtering for external repos only
        const recentContributions = prs
          .filter((pr) => !pr.repository_url.includes("/xamey/"))
          .map((pr: any) => {
            const repoParts = pr.repository_url.split("/");
            const repoName = `${repoParts[4]}/${repoParts[5]}`;
            return {
              url: pr.html_url,
              repo_name: repoName,
              title: pr.title,
              state: pr.state,
            };
          });

        setContributions(recentContributions);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch GitHub data");
        setLoading(false);
      }
    };

    fetchGithubData();
  }, []);

  if (loading) {
    return (
      <section className="space-y-8">
        <h2 className="text-2xl font-bold">Open Source</h2>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-white/5 rounded-lg" />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="space-y-8">
        <h2 className="text-2xl font-bold">Open Source</h2>
        <p className="text-red-400">{error}</p>
      </section>
    );
  }

  return (
    <section className="space-y-8">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold">Open Source</h2>
        <p className="text-gray-400">My contributions to the community</p>
      </div>

      <div className="space-y-8">
        {repos.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-violet-400 uppercase tracking-wider">
              Repositories
            </h3>
            <div className="grid gap-4">
              {repos.slice(0, reposToShow).map((repo) => (
                <Line
                  href={repo.html_url}
                  key={repo.full_name}
                  title={repo.name}
                  subtitle={`★ ${repo.stargazers_count}`}
                  description={repo.description}
                />
              ))}
            </div>
            {reposToShow < repos.length && (
              <button
                onClick={() => setReposToShow(reposToShow + chunks)}
                className="text-violet-400 hover:underline"
              >
                View More
              </button>
            )}
          </div>
        )}

        {contributions.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-violet-400 uppercase tracking-wider">
              External Contributions
            </h3>
            <div className="grid gap-4">
              {contributions.slice(0, contributionsToShow).map((contrib) => (
                <Line
                  href={contrib.url}
                  key={contrib.url}
                  title={contrib.repo_name}
                  subtitle={contrib.state}
                  description={contrib.title}
                />
              ))}
            </div>
            {contributionsToShow < contributions.length && (
              <button
                onClick={() =>
                  setContributionsToShow(contributionsToShow + chunks)
                }
                className="text-violet-400 hover:underline"
              >
                View More
              </button>
            )}
          </div>
        )}

        {contributions.length === 0 && (
          <p className="text-gray-400 text-sm">
            No external contributions found in recent activity.
          </p>
        )}
      </div>
    </section>
  );
}
