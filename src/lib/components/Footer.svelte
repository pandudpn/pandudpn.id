<script lang="ts">
	import { personal } from '$lib/data/personal';
	import { createVisitorCountQuery } from '$lib/queries/visitor';
	import { Separator } from '$lib/components/ui/separator';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { Github, Linkedin, Mail, Heart, ArrowUp, Eye } from 'lucide-svelte';

	const visitorQuery = createVisitorCountQuery();

	let visitorCount = $derived(
		($visitorQuery.data as { unique: number; total: number } | undefined)?.total ?? 0
	);

	const socialLinks = [
		{
			icon: Github,
			href: personal.social.github,
			label: 'GitHub'
		},
		{
			icon: Linkedin,
			href: personal.social.linkedin,
			label: 'LinkedIn'
		},
		{
			icon: Mail,
			href: personal.social.email,
			label: 'Email'
		}
	];

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<footer class="relative bg-card px-4 py-12" aria-label="Site footer">
	<Separator class="absolute top-0 left-0 right-0" />

	<div class="mx-auto max-w-6xl">
		<div class="flex flex-col items-center gap-8">
			<!-- Social Links -->
			<nav aria-label="Social links" class="flex items-center gap-4">
				{#each socialLinks as link}
					{@const Icon = link.icon}
					<a
						href={link.href}
						target="_blank"
						rel="noopener noreferrer"
						class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-border bg-background transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
						aria-label={link.label}
					>
						<Icon class="h-4 w-4" />
					</a>
				{/each}
			</nav>

			<!-- Made with -->
			<p class="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
				Made with
				<Heart class="h-3.5 w-3.5 text-destructive" aria-label="love" />
				using SvelteKit & Tailwind CSS
			</p>

			<!-- Visitor Count -->
			<div class="flex items-center gap-2 font-mono text-xs text-muted-foreground">
				<Eye class="h-3.5 w-3.5" aria-hidden="true" />
				{#if $visitorQuery.isLoading}
					<span>Visitors: </span>
					<Skeleton class="h-3 w-10 rounded" />
				{:else if $visitorQuery.data}
					<span>
						Visitors: {visitorCount.toLocaleString()}
					</span>
				{:else}
					<span>Visitors: --</span>
				{/if}
			</div>

			<!-- Copyright -->
			<p class="font-mono text-xs text-muted-foreground">
				&copy; {new Date().getFullYear()} {personal.handle}. All rights reserved.
			</p>
		</div>

		<!-- Back to Top -->
		<button
			onclick={scrollToTop}
			class="absolute right-4 bottom-8 flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-border bg-background transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary md:right-8"
			aria-label="Back to top"
		>
			<ArrowUp class="h-4 w-4" />
		</button>
	</div>
</footer>
