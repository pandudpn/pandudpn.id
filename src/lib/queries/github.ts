import { createQuery } from '@tanstack/svelte-query';

export function createGitHubStarsQuery(repos: string[]) {
	return createQuery(() => ({
		queryKey: ['github-stars', repos],
		queryFn: async () => {
			const results = await Promise.all(
				repos.map(async (repo) => {
					try {
						const res = await fetch(`https://api.github.com/repos/${repo}`);
						if (!res.ok) return { repo, stars: 0 };
						const data = await res.json();
						return { repo, stars: data.stargazers_count as number };
					} catch {
						return { repo, stars: 0 };
					}
				})
			);
			return Object.fromEntries(results.map((r) => [r.repo, r.stars]));
		},
		staleTime: 1000 * 60 * 60,
		gcTime: 1000 * 60 * 60 * 24
	}));
}
