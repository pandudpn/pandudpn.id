<script lang="ts">
	import type { SkillCategory } from '$lib/types';
	import GlassCard from '$lib/components/custom/GlassCard.svelte';
	import ScrollReveal from '$lib/components/custom/ScrollReveal.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import {
		Code2,
		Database,
		Cloud,
		Container,
		GitBranch,
		Globe,
		Terminal,
		Server,
		Cpu,
		Workflow,
		FileCode,
		Smartphone,
		Network,
		Zap,
		Blocks,
		RefreshCw,
		GitPullRequest,
		MessageSquare,
		Send,
		Radio,
		Wifi,
		Search,
		BarChart2,
		Activity
	} from 'lucide-svelte';
	import type { Component } from 'svelte';

	let {
		data
	}: {
		data: SkillCategory[];
	} = $props();

	// Map icon name strings from skill data to Lucide components
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const iconMap: Record<string, any> = {
		Code2,
		Database,
		Cloud,
		Container,
		GitBranch,
		Globe,
		Terminal,
		Server,
		Cpu,
		Workflow,
		FileCode,
		Smartphone,
		Network,
		Zap,
		Blocks,
		RefreshCw,
		GitPullRequest,
		MessageSquare,
		Send,
		Radio,
		Wifi,
		Search,
		BarChart2,
		Activity
	};
</script>

<div class="space-y-12">
	{#each data as category, catIndex}
		<ScrollReveal delay={catIndex * 100}>
			{#snippet children()}
				<section aria-label="{category.label} skills">
					<h3 class="text-lg font-semibold text-accent-foreground mb-6 font-mono">
						<span class="text-primary">//</span>
						{category.label}
					</h3>

					<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{#each category.skills as skill, i}
							<ScrollReveal delay={catIndex * 100 + i * 50}>
								{#snippet children()}
									<GlassCard
										class="p-4 rounded-xl hover:-translate-y-0.5 transition-transform duration-300"
									>
										<div class="flex items-center gap-3">
											{#if iconMap[skill.icon]}
												{@const IconComponent = iconMap[skill.icon]}
												<div
													class="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10"
												>
													<IconComponent class="h-4 w-4 text-primary" />
												</div>
											{/if}
											<div class="min-w-0 flex-1">
												<h4 class="text-sm font-semibold text-accent-foreground truncate">
													{skill.name}
												</h4>
												<Badge variant="secondary" class="mt-1 text-[10px] px-1.5 py-0">
													{skill.years}+ yrs
												</Badge>
											</div>
										</div>
									</GlassCard>
								{/snippet}
							</ScrollReveal>
						{/each}
					</div>
				</section>
			{/snippet}
		</ScrollReveal>
	{/each}
</div>
