<script lang="ts">
	import { projects } from '$lib/data/projects';
	import { createGitHubStarsQuery } from '$lib/queries/github';
	import SectionHeading from '$lib/components/custom/SectionHeading.svelte';
	import ScrollReveal from '$lib/components/custom/ScrollReveal.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import {
		Star,
		ExternalLink,
		Smartphone,
		Building2,
		ShoppingCart,
		Globe,
		BarChart3,
		TrendingUp,
		Calendar,
		Wallet,
		Recycle,
		Coffee,
		Users,
		Lock,
		Code2,
		Pill,
		Briefcase
	} from 'lucide-svelte';

	// ── Category config ──────────────────────────────────────────────────────────
	const categories = [
		{ id: 'all', label: 'All' },
		{ id: 'fintech', label: 'Financial Technology' },
		{ id: 'telecom', label: 'Telecommunications' },
		{ id: 'envtech', label: 'Environmental Tech' },
		{ id: 'enterprise', label: 'Enterprise' },
		{ id: 'erp', label: 'Enterprise Software' },
		{ id: 'healthcare', label: 'Healthcare' },
		{ id: 'ecommerce', label: 'E-Commerce' },
		{ id: 'banking', label: 'Banking' },
		{ id: 'coffee', label: 'Coffee' },
		{ id: 'web', label: 'Web' }
	] as const;

	// Category label lookup for filled badge in "All Projects"
	const categoryLabel: Record<string, string> = {
		fintech: 'Financial Technology',
		telecom: 'Telecommunications',
		envtech: 'Environmental Tech',
		enterprise: 'Enterprise',
		erp: 'Enterprise Software',
		healthcare: 'Healthcare',
		ecommerce: 'E-Commerce',
		banking: 'Banking',
		coffee: 'E-Commerce',
		web: 'Web Development',
		oss: 'Open Source',
		iot: 'IoT'
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const categoryIcons: Record<string, any> = {
		fintech: Wallet,
		telecom: Smartphone,
		envtech: Recycle,
		enterprise: Building2,
		erp: Building2,
		ecommerce: ShoppingCart,
		banking: BarChart3,
		healthcare: Pill,
		oss: Code2,
		web: Globe,
		iot: BarChart3,
		coffee: Coffee
	};

	// ── State ────────────────────────────────────────────────────────────────────
	let activeFilter = $state<string>('all');

	let filteredProjects = $derived(
		activeFilter === 'all' ? projects : projects.filter((p) => p.category === activeFilter)
	);

	let featuredProjects = $derived(filteredProjects.filter((p) => p.featured));
	let otherProjects = $derived(filteredProjects.filter((p) => !p.featured));

	// ── GitHub stars ─────────────────────────────────────────────────────────────
	const githubRepos = projects.filter((p) => p.githubRepo).map((p) => p.githubRepo!);
	const starsQuery = createGitHubStarsQuery(githubRepos);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function getCategoryIcon(category: string): any {
		return categoryIcons[category] || Briefcase;
	}

	function getCategoryLabel(category: string): string {
		return categoryLabel[category] || category;
	}

	function getStars(repo: string): number | undefined {
		const data = $starsQuery.data as Record<string, number> | undefined;
		return data?.[repo];
	}
</script>

<section id="projects" class="relative px-4 py-20 md:py-32" aria-label="Projects">
	<div class="mx-auto max-w-6xl">
		<!-- Section Heading -->
		<ScrollReveal>
			{#snippet children()}
				<SectionHeading
					number="04"
					title="Project Portfolio"
					description="Enterprise-grade systems and applications built across diverse industries, from fintech serving millions to environmental platforms making real impact."
				/>
			{/snippet}
		</ScrollReveal>

		<!-- Filter Tabs -->
		<ScrollReveal delay={100}>
			{#snippet children()}
				<div
					class="mb-10 flex flex-wrap gap-2"
					role="tablist"
					aria-label="Filter projects by category"
				>
					{#each categories as cat}
						<button
							role="tab"
							aria-selected={activeFilter === cat.id}
							class="cursor-pointer rounded-full px-4 py-1.5 font-mono text-xs font-medium transition-all {activeFilter ===
							cat.id
								? 'bg-primary text-primary-foreground'
								: 'border border-border bg-transparent text-muted-foreground hover:border-primary/40 hover:text-foreground'}"
							onclick={() => (activeFilter = cat.id)}
						>
							{cat.label}
						</button>
					{/each}
				</div>
			{/snippet}
		</ScrollReveal>

		<!-- ── FEATURED ENTERPRISE PROJECTS ──────────────────────────────────────── -->
		{#if featuredProjects.length > 0}
			<div class="mb-16">
				<!-- Sub-heading with Star icon -->
				<ScrollReveal delay={50}>
					{#snippet children()}
						<div class="mb-6 flex items-center gap-2">
							<Star class="h-4 w-4 text-primary" />
							<h3 class="font-mono text-sm font-semibold uppercase tracking-wider text-foreground">
								Featured Enterprise Projects
							</h3>
						</div>
					{/snippet}
				</ScrollReveal>

				<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{#each featuredProjects as project, i (project.id)}
						<ScrollReveal delay={i * 100}>
							{#snippet children()}
								{@const CategoryIcon = getCategoryIcon(project.category)}
								<div
									class="glass-card glass-glow relative flex flex-col gap-4 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1"
								>
									<!-- TOP ROW: icon + role badge -->
									<div class="flex items-start justify-between gap-3">
										<div
											class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10"
										>
											<CategoryIcon class="h-5 w-5 text-primary" />
										</div>
										<span
											class="shrink-0 rounded-full border border-border px-2.5 py-0.5 font-mono text-[10px] text-muted-foreground"
										>
											{project.role}
										</span>
									</div>

									<!-- PROJECT TITLE -->
									<div>
										<h4 class="text-base font-bold leading-snug text-foreground">
											{project.title}
										</h4>
									</div>

									<!-- META ROW: Calendar + period + bullet + category -->
									<div class="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
										<Calendar class="h-3 w-3 shrink-0" />
										<span>{project.period}</span>
										<span aria-hidden="true" class="mx-0.5">·</span>
										<span>{project.subtitle}</span>
									</div>

									<!-- METRICS ROW -->
									{#if project.metricsText}
										<div class="flex items-center gap-2">
											<TrendingUp class="h-3.5 w-3.5 shrink-0 text-primary" />
											<span class="font-mono text-xs font-medium text-primary">
												{project.metricsText}
											</span>
										</div>
									{/if}

									<!-- DESCRIPTION -->
									<p class="text-sm leading-relaxed text-muted-foreground">
										{project.description}
									</p>

									<!-- TECH BADGES: plain text, max 4 + "+N" -->
									<div class="flex flex-wrap items-center gap-x-2 gap-y-1">
										{#each project.techStack.slice(0, 4) as tech}
											<span class="font-mono text-xs text-muted-foreground">{tech}</span>
										{/each}
										{#if project.techStack.length > 4}
											<span class="font-mono text-xs text-muted-foreground/60">
												+{project.techStack.length - 4}
											</span>
										{/if}
									</div>

									<!-- BOTTOM: Enterprise + Confidential buttons -->
									<div class="mt-auto flex gap-2 pt-3 border-t border-border/50">
										{#if project.isEnterprise}
											<button
												class="flex flex-1 cursor-default items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 font-mono text-xs text-muted-foreground"
												aria-label="Enterprise project"
											>
												<Users class="h-3 w-3" />
												Enterprise
											</button>
										{/if}
										{#if project.isConfidential}
											<button
												class="flex flex-1 cursor-default items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 font-mono text-xs text-muted-foreground"
												aria-label="Confidential project"
											>
												<Lock class="h-3 w-3" />
												Confidential
											</button>
										{/if}
										{#if project.githubRepo}
											<a
												href="https://github.com/{project.githubRepo}"
												target="_blank"
												rel="noopener noreferrer"
												class="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
												aria-label="View {project.title} on GitHub"
											>
												<Code2 class="h-3 w-3" />
												Source
												{#if getStars(project.githubRepo)}
													<span class="flex items-center gap-0.5">
														<Star class="h-2.5 w-2.5" />
														{getStars(project.githubRepo)}
													</span>
												{:else if $starsQuery.isLoading}
													<Skeleton class="h-3 w-6 rounded" />
												{/if}
											</a>
										{/if}
										{#if project.liveUrl && !project.isEnterprise && !project.isConfidential}
											<a
												href={project.liveUrl}
												target="_blank"
												rel="noopener noreferrer"
												class="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
												aria-label="Visit {project.title}"
											>
												<ExternalLink class="h-3 w-3" />
												Live
											</a>
										{/if}
									</div>
								</div>
							{/snippet}
						</ScrollReveal>
					{/each}
				</div>
			</div>
		{/if}

		<!-- ── ALL PROJECTS ──────────────────────────────────────────────────────── -->
		{#if otherProjects.length > 0}
			<div>
				<!-- Sub-heading -->
				<ScrollReveal delay={50}>
					{#snippet children()}
						<h3
							class="mb-6 font-mono text-sm font-semibold uppercase tracking-wider text-foreground"
						>
							All Projects
						</h3>
					{/snippet}
				</ScrollReveal>

				<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{#each otherProjects as project, i (project.id)}
						<ScrollReveal delay={i * 80}>
							{#snippet children()}
								{@const CategoryIcon = getCategoryIcon(project.category)}
								<div
									class="glass-card glass-glow relative flex flex-col gap-3 rounded-xl p-5 transition-all duration-300 hover:-translate-y-1"
								>
									<!-- TOP ROW: icon + role badge -->
									<div class="flex items-start justify-between gap-2">
										<div
											class="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10"
										>
											<CategoryIcon class="h-4 w-4 text-primary" />
										</div>
										<span
											class="shrink-0 rounded-full border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
										>
											{project.role}
										</span>
									</div>

									<!-- TITLE -->
									<h4 class="text-sm font-bold leading-snug text-foreground">
										{project.title}
									</h4>

									<!-- META: filled category badge + bullet + period -->
									<div class="flex items-center gap-1.5 font-mono text-xs">
										<Badge class="px-2 py-0 text-[10px] font-normal">
											{getCategoryLabel(project.category)}
										</Badge>
										<span class="text-muted-foreground" aria-hidden="true">·</span>
										<span class="text-muted-foreground">{project.period}</span>
									</div>

									<!-- DESCRIPTION: truncated -->
									<p class="line-clamp-3 text-xs leading-relaxed text-muted-foreground">
										{project.description}
									</p>

									<!-- METRICS -->
									{#if project.metricsText}
										<div class="flex items-start gap-2">
											<TrendingUp class="mt-0.5 h-3 w-3 shrink-0 text-primary" />
											<span class="font-mono text-xs font-medium text-primary leading-snug">
												{project.metricsText}
											</span>
										</div>
									{/if}

									<!-- TECH BADGES: plain text, max 3 + "+N" -->
									<div class="flex flex-wrap items-center gap-x-2 gap-y-1">
										{#each project.techStack.slice(0, 3) as tech}
											<span class="font-mono text-xs text-muted-foreground">{tech}</span>
										{/each}
										{#if project.techStack.length > 3}
											<span class="font-mono text-xs text-muted-foreground/60">
												+{project.techStack.length - 3}
											</span>
										{/if}
									</div>

									<!-- BOTTOM: Enterprise/Confidential buttons or live/source links -->
									<div class="mt-auto flex gap-2 border-t border-border/50 pt-3">
										{#if project.isEnterprise}
											<button
												class="flex flex-1 cursor-default items-center justify-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 font-mono text-[10px] text-muted-foreground"
												aria-label="Enterprise project"
											>
												<Users class="h-3 w-3" />
												Enterprise
											</button>
										{/if}
										{#if project.isConfidential}
											<button
												class="flex flex-1 cursor-default items-center justify-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 font-mono text-[10px] text-muted-foreground"
												aria-label="Confidential project"
											>
												<Lock class="h-3 w-3" />
												Confidential
											</button>
										{/if}
										{#if project.githubRepo}
											<a
												href="https://github.com/{project.githubRepo}"
												target="_blank"
												rel="noopener noreferrer"
												class="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 font-mono text-[10px] text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
												aria-label="View {project.title} on GitHub"
											>
												<Code2 class="h-3 w-3" />
												Source
												{#if getStars(project.githubRepo)}
													<span class="flex items-center gap-0.5">
														<Star class="h-2.5 w-2.5" />
														{getStars(project.githubRepo)}
													</span>
												{:else if $starsQuery.isLoading}
													<Skeleton class="h-2.5 w-5 rounded" />
												{/if}
											</a>
										{/if}
										{#if project.liveUrl && !project.isEnterprise && !project.isConfidential}
											<a
												href={project.liveUrl}
												target="_blank"
												rel="noopener noreferrer"
												class="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 font-mono text-[10px] text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
												aria-label="Visit {project.title}"
											>
												<ExternalLink class="h-3 w-3" />
												Live
											</a>
										{/if}
									</div>
								</div>
							{/snippet}
						</ScrollReveal>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Empty state -->
		{#if filteredProjects.length === 0}
			<div class="py-16 text-center">
				<Briefcase class="mx-auto mb-4 h-12 w-12 text-muted-foreground/30" />
				<p class="text-muted-foreground">No projects found in this category.</p>
			</div>
		{/if}
	</div>
</section>
