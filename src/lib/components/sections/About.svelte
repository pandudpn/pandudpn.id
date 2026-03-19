<script lang="ts">
	import { personal } from '$lib/data/personal';
	import SectionHeading from '$lib/components/custom/SectionHeading.svelte';
	import ScrollReveal from '$lib/components/custom/ScrollReveal.svelte';
	import GlassCard from '$lib/components/custom/GlassCard.svelte';
	import AnimatedCounter from '$lib/components/custom/AnimatedCounter.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Badge } from '$lib/components/ui/badge';
	import { Separator } from '$lib/components/ui/separator';
	import { Briefcase, MapPin, Award, Code2, Users, TrendingUp, Zap, Check } from 'lucide-svelte';

	const quickInfo = [
		{ icon: Briefcase, label: 'Experience', value: '8+ Years' },
		{ icon: MapPin, label: 'Location', value: 'Jakarta, Indonesia' },
		{ icon: Award, label: 'Role', value: 'Technical Lead' },
		{ icon: Code2, label: 'Focus', value: 'Backend Engineering' }
	];

	const highlightCards = [
		{
			icon: Users,
			title: 'Technical Leadership',
			value: 100,
			suffix: '+',
			unit: 'microservices',
			description: 'Architected and maintained'
		},
		{
			icon: TrendingUp,
			title: 'Scale Impact',
			value: 5,
			suffix: 'M+',
			unit: 'monthly users',
			description: 'Systems serving'
		},
		{
			icon: Zap,
			title: 'Performance',
			value: 50,
			suffix: '-60%',
			unit: 'improvement',
			description: 'System optimization'
		}
	];
</script>

<section id="about" class="relative py-20 md:py-32 px-4" aria-label="About me">
	<div class="mx-auto max-w-6xl">
		<ScrollReveal>
			{#snippet children()}
				<SectionHeading number="01" title="About Me" />
			{/snippet}
		</ScrollReveal>

		<!-- Two-column layout -->
		<div class="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-12 md:gap-16">
			<!-- LEFT column (40%) — Profile & Quick Info -->
			<div class="space-y-8">
				<!-- Profile Photo -->
				<ScrollReveal delay={100}>
					{#snippet children()}
						<div class="flex flex-col items-center md:items-start gap-4">
							<Avatar.Root class="h-48 w-48 md:h-56 md:w-56 border-2 border-border">
								<Avatar.Image src="/images/pandu.jpg" alt="Profile photo of {personal.name}" />
								<Avatar.Fallback class="text-4xl font-bold bg-muted text-muted-foreground">
									PDP
								</Avatar.Fallback>
							</Avatar.Root>
							<div class="text-center md:text-left">
								<h3 class="text-xl font-bold text-accent-foreground">{personal.shortName}</h3>
								<Badge variant="secondary" class="mt-2">{personal.aboutRole}</Badge>
								<div class="flex items-center gap-1.5 mt-2 text-sm text-muted-foreground">
									<MapPin class="h-3.5 w-3.5" />
									<span>{personal.location}</span>
								</div>
							</div>
						</div>
					{/snippet}
				</ScrollReveal>

				<!-- Quick Info Cards -->
				<ScrollReveal delay={200}>
					{#snippet children()}
						<div class="grid grid-cols-2 gap-3">
							{#each quickInfo as info}
								<GlassCard class="p-4 rounded-lg">
									<div class="flex items-center gap-2 mb-1.5">
										<info.icon class="h-4 w-4 text-primary" />
										<span class="text-xs text-muted-foreground font-mono">{info.label}</span>
									</div>
									<p class="text-sm font-semibold text-accent-foreground">{info.value}</p>
								</GlassCard>
							{/each}
						</div>
					{/snippet}
				</ScrollReveal>
			</div>

			<!-- RIGHT column (60%) — Bio & Highlights -->
			<div class="space-y-8">
				<!-- Bio heading -->
				<ScrollReveal delay={100}>
					{#snippet children()}
						<div>
							<h3 class="text-2xl md:text-3xl font-bold text-accent-foreground mb-4">
								Hello! I'm {personal.name}
							</h3>
							<p class="text-muted-foreground leading-relaxed mb-4">
								{personal.bio}
							</p>
							<p class="text-muted-foreground leading-relaxed">
								{personal.bioExtended}
							</p>
						</div>
					{/snippet}
				</ScrollReveal>

				<Separator />

				<!-- Highlight Metric Cards -->
				<ScrollReveal delay={200}>
					{#snippet children()}
						<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
							{#each highlightCards as card}
								<GlassCard class="p-5 rounded-xl text-center">
									<card.icon class="h-6 w-6 text-primary mx-auto mb-2" />
									<div class="text-2xl font-extrabold text-accent-foreground">
										<AnimatedCounter value={card.value} suffix={card.suffix} duration={1500} />
									</div>
									<p class="text-xs text-muted-foreground font-mono mt-1">{card.unit}</p>
									<p class="text-xs text-muted-foreground mt-0.5">{card.description}</p>
								</GlassCard>
							{/each}
						</div>
					{/snippet}
				</ScrollReveal>

				<!-- Key Highlights -->
				<ScrollReveal delay={300}>
					{#snippet children()}
						<div>
							<h4 class="text-lg font-semibold text-accent-foreground mb-4">Key Highlights</h4>
							<ul class="space-y-3" role="list">
								{#each personal.highlights as highlight}
									<li class="flex items-start gap-3">
										<span
											class="mt-0.5 flex-shrink-0 inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary/10"
										>
											<Check class="h-3 w-3 text-primary" />
										</span>
										<span class="text-sm text-muted-foreground leading-relaxed">{highlight}</span>
									</li>
								{/each}
							</ul>
						</div>
					{/snippet}
				</ScrollReveal>

				<!-- Quote -->
				<ScrollReveal delay={400}>
					{#snippet children()}
						<blockquote
							class="border-l-2 border-primary/40 pl-6 py-2"
							role="figure"
							aria-label="Personal quote"
						>
							<p class="text-muted-foreground italic leading-relaxed text-sm">
								"{personal.quote}"
							</p>
							<footer class="mt-2 text-xs text-muted-foreground font-mono">
								— {personal.shortName}
							</footer>
						</blockquote>
					{/snippet}
				</ScrollReveal>
			</div>
		</div>
	</div>
</section>
