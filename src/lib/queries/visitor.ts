import { createQuery, createMutation } from '@tanstack/svelte-query';

export function createVisitorCountQuery() {
	return createQuery(() => ({
		queryKey: ['visitor-count'],
		queryFn: async () => {
			const res = await fetch('/api/visitor');
			if (!res.ok) return { unique: 0, total: 0 };
			return res.json() as Promise<{ unique: number; total: number }>;
		},
		staleTime: 1000 * 60 * 5
	}));
}

export function createTrackVisitorMutation() {
	return createMutation(() => ({
		mutationFn: async () => {
			await fetch('/api/visitor', { method: 'POST' });
		}
	}));
}
