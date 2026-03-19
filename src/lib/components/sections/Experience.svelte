<script lang="ts">
	import { experiences } from '$lib/data/experience';
	import SectionHeading from '$lib/components/custom/SectionHeading.svelte';
	import ScrollReveal from '$lib/components/custom/ScrollReveal.svelte';
	import ExperienceCard from '$lib/components/custom/ExperienceCard.svelte';
	import { FileText } from 'lucide-svelte';
</script>

<section id="experience" class="relative py-20 md:py-32 px-4" aria-label="Work experience">
	<div class="mx-auto max-w-6xl">
		<!-- Section Heading -->
		<ScrollReveal>
			{#snippet children()}
				<SectionHeading
					number="03"
					title="Experience"
					description="A journey through building scalable backend systems and leading engineering teams."
				/>
			{/snippet}
		</ScrollReveal>

		<!-- Timeline -->
		<div class="relative">
			<!-- Vertical connector line -->
			<div
				class="absolute left-[200px] top-0 bottom-0 w-px bg-border max-md:left-3"
				aria-hidden="true"
			></div>

			{#each experiences as exp, i}
				<ScrollReveal delay={i * 100}>
					{#snippet children()}
						<div
							class="grid grid-cols-[200px_1fr] gap-8 mb-16 max-md:grid-cols-1 max-md:gap-2 max-md:pl-8"
						>
							<!-- Left: Date column -->
							<div
								class="text-right font-mono text-sm text-muted-foreground pt-2 whitespace-nowrap pr-6 max-md:text-left max-md:text-xs max-md:whitespace-normal max-md:pr-0"
							>
								{exp.period.start} — {exp.period.end}
							</div>

							<!-- Right: Card with dot -->
							<div class="relative">
								<!-- Timeline dot -->
								<div
									class="absolute -left-[calc(2rem+5px)] top-3.5 h-2.5 w-2.5 rounded-full bg-primary border-2 border-background max-md:-left-[21px]"
									aria-hidden="true"
								></div>

								<ExperienceCard data={exp} />
							</div>
						</div>
					{/snippet}
				</ScrollReveal>
			{/each}
		</div>

		<!-- View Full Resume Link -->
		<ScrollReveal delay={experiences.length * 100 + 100}>
			{#snippet children()}
				<div class="flex justify-center mt-8">
					<a
						href="/resume.pdf"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium
							   text-primary border border-primary/30 hover:bg-primary/10
							   transition-colors duration-200"
					>
						<FileText class="h-4 w-4" />
						View Full Resume
					</a>
				</div>
			{/snippet}
		</ScrollReveal>
	</div>
</section>
