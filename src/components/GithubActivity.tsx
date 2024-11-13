import React, { useEffect, useState } from "react";

interface Repository {
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  fork: boolean;
}

interface Contribution {
  repo: string;
  type: string;
  title: string;
  url: string;
}

export default function GithubActivity() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
          .filter((repo: Repository) => !repo.fork)
          .sort(
            (a: Repository, b: Repository) =>
              b.stargazers_count - a.stargazers_count
          )
          .slice(0, 3);

        setRepos(significantRepos);

        // Fetch user's recent activity
        const eventsResponse = await fetch(
          "https://api.github.com/users/xamey/events/public"
        );
        const eventsData = await eventsResponse.json();

        // Process events into contributions, filtering for external repos only
        const recentContributions = eventsData
          .filter((event: any) => {
            // Check if the event is a contribution type we're interested in
            const isValidType = [
              "PushEvent",
              "PullRequestEvent",
              "IssuesEvent",
            ].includes(event.type);
            // Check if the repo is not owned by the user
            const isExternalRepo = !event.repo.name.startsWith("xamey/");
            return isValidType && isExternalRepo;
          })
          .slice(0, 3)
          .map((event: any) => ({
            repo: event.repo.name,
            type:
              event.type === "PushEvent"
                ? "Commit"
                : event.type === "PullRequestEvent"
                ? "PR"
                : "Issue",
            title:
              event.type === "PushEvent"
                ? event.payload.commits?.[0]?.message
                : event.payload.pull_request?.title ||
                  event.payload.issue?.title,
            url:
              event.type === "PushEvent"
                ? `https://github.com/${event.repo.name}/commit/${event.payload.commits?.[0]?.sha}`
                : event.payload.pull_request?.html_url ||
                  event.payload.issue?.html_url,
          }));

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
        {/* {repos.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-violet-400 uppercase tracking-wider">
              Top Repositories
            </h3>
            <div className="grid gap-4">
              {repos.map((repo) => (
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={repo.full_name}
                  className="p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 
                    transition-colors duration-200 group"
                >
                  <div className="flex items-start justify-between">
                    <h4 className="font-semibold group-hover:text-violet-400 transition-colors">
                      {repo.name}
                    </h4>
                    <span className="text-xs bg-white/5 px-2 py-1 rounded-full">
                      ★ {repo.stargazers_count}
                    </span>
                  </div>
                  {repo.description && (
                    <p className="text-gray-400 text-sm mt-2">{repo.description}</p>
                  )}
                </a>
              ))}
            </div>
          </div>
        )} */}

        {contributions.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-violet-400 uppercase tracking-wider">
              External Contributions
            </h3>
            <div className="grid gap-4">
              {contributions.map((contrib) => (
                <a
                  href={contrib.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={contrib.url}
                  className="p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 
                    transition-colors duration-200 group"
                >
                  <div className="flex items-start justify-between">
                    <h4 className="font-semibold group-hover:text-violet-400 transition-colors">
                      {contrib.repo}
                    </h4>
                    <span className="text-xs bg-violet-500/10 text-violet-400 px-2 py-1 rounded-full">
                      {contrib.type}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mt-2">{contrib.title}</p>
                </a>
              ))}
            </div>
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
