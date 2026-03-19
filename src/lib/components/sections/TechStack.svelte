<script lang="ts">
	import { skillCategories } from '$lib/data/skills';
	import SectionHeading from '$lib/components/custom/SectionHeading.svelte';
	import ScrollReveal from '$lib/components/custom/ScrollReveal.svelte';
	import GlassCard from '$lib/components/custom/GlassCard.svelte';
	import AnimatedCounter from '$lib/components/custom/AnimatedCounter.svelte';
	import TechCategoryGrid from '$lib/components/custom/TechCategoryGrid.svelte';
	import { Server, Gauge, TrendingUp, Users } from 'lucide-svelte';

	// Stats data
	const stats = [
		{ icon: Server, value: 100, suffix: '+', label: 'Microservices' },
		{ icon: Gauge, value: 300, suffix: '+', label: 'TPS Throughput' },
		{ icon: TrendingUp, value: 60, suffix: '%', label: 'Perf. Improvement' },
		{ icon: Users, value: 5, suffix: 'M+', label: 'Users Served' }
	];
</script>

<section id="tech-stack" class="relative py-20 md:py-32 px-4" aria-label="Skills and technologies">
	<div class="mx-auto max-w-6xl">
		<!-- Section Heading -->
		<ScrollReveal>
			{#snippet children()}
				<SectionHeading
					number="02"
					title="Skills & Technologies"
					description="Building production-grade distributed systems with a focus on performance, reliability, and developer experience."
				/>
			{/snippet}
		</ScrollReveal>

		<!-- Category Grid -->
		<TechCategoryGrid data={skillCategories} />

		<!-- Stats Strip -->
		<ScrollReveal delay={300}>
			{#snippet children()}
				<div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
					{#each stats as stat}
						<GlassCard class="p-5 rounded-xl text-center">
							<stat.icon class="h-5 w-5 text-primary mx-auto mb-2" />
							<div class="text-2xl font-extrabold text-accent-foreground font-mono">
								<AnimatedCounter value={stat.value} suffix={stat.suffix} duration={1500} />
							</div>
							<p class="text-xs text-muted-foreground font-mono mt-1">{stat.label}</p>
						</GlassCard>
					{/each}
				</div>
			{/snippet}
		</ScrollReveal>
	</div>
</section>
