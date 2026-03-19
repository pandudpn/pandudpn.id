<script lang="ts">
	import type { Experience } from '$lib/types';
	import { Badge } from '$lib/components/ui/badge';

	let {
		data
	}: {
		data: Experience;
	} = $props();
</script>

<article
	class="glass-card glass-glow rounded-xl p-6 hover:-translate-y-0.5 transition-all duration-300"
	aria-label="{data.role} at {data.company}"
>
	<!-- Role & Company -->
	<div class="mb-3">
		<h3 class="text-base md:text-lg font-bold text-accent-foreground leading-tight break-words">
			{data.role}
		</h3>
		<p class="text-primary font-medium text-sm mt-1">{data.company}</p>
		{#if data.location}
			<p class="text-xs text-muted-foreground mt-0.5 font-mono">{data.location}</p>
		{/if}
	</div>

	<!-- Description -->
	<p class="text-sm text-muted-foreground leading-relaxed mb-4">
		{data.description}
	</p>

	<!-- Metrics Row -->
	{#if data.metrics && data.metrics.length > 0}
		<div class="flex flex-wrap gap-x-6 gap-y-2 mb-4 py-3 border-t border-b border-border/50">
			{#each data.metrics as metric}
				<div class="text-center">
					<span class="block text-sm font-bold text-accent-foreground font-mono">
						{metric.value}
					</span>
					<span class="block text-[11px] text-muted-foreground">{metric.label}</span>
				</div>
			{/each}
		</div>
	{/if}

	<!-- Tech Stack -->
	<div class="flex flex-wrap gap-1.5">
		{#each data.techStack as tech}
			<Badge variant="secondary" class="text-[11px] px-2 py-0.5">{tech}</Badge>
		{/each}
	</div>
</article>
