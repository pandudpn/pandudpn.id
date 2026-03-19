<script lang="ts">
	import { fly } from 'svelte/transition';
	import { personal } from '$lib/data/personal';
	import { parallax } from '$lib/actions/parallax';
	import TerminalText from '$lib/components/custom/TerminalText.svelte';
	import TextScramble from '$lib/components/custom/TextScramble.svelte';
	import MagneticButton from '$lib/components/custom/MagneticButton.svelte';
	import AnimatedCounter from '$lib/components/custom/AnimatedCounter.svelte';
	import GlassCard from '$lib/components/custom/GlassCard.svelte';
	import { ArrowDown, Download, ChevronDown } from 'lucide-svelte';

	let mounted = $state(false);

	$effect(() => {
		mounted = true;
	});

	function scrollToProjects() {
		document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
	}

	function parseStatValue(val: string): { num: number; suffix: string } {
		const match = val.match(/^(\d+)(.*)$/);
		if (match) return { num: parseInt(match[1]), suffix: match[2] };
		return { num: 0, suffix: val };
	}
</script>

<section
	id="hero"
	class="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
	aria-label="Introduction"
>
	<!-- Background gradient -->
	<div
		class="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20 pointer-events-none"
		aria-hidden="true"
	></div>

	<!-- Floating decorative panels -->
	<div
		class="hidden md:block absolute top-[20%] left-[8%] opacity-40"
		aria-hidden="true"
		use:parallax={{ speed: 0.15 }}
	>
		<GlassCard class="px-4 py-3 rounded-lg text-xs font-mono text-muted-foreground max-w-[180px]">
			<span class="text-primary">func</span> main() &#123;<br />
			&nbsp;&nbsp;server.<span class="text-secondary">Start</span>()<br />
			&#125;
		</GlassCard>
	</div>

	<div
		class="hidden md:block absolute top-[35%] right-[6%] opacity-30"
		aria-hidden="true"
		use:parallax={{ speed: -0.1 }}
	>
		<GlassCard class="px-4 py-3 rounded-lg text-xs font-mono text-muted-foreground max-w-[200px]">
			<span class="text-primary">type</span> Service <span class="text-primary">struct</span>
			&#123;<br />
			&nbsp;&nbsp;db &nbsp;&nbsp;*sql.<span class="text-secondary">DB</span><br />
			&nbsp;&nbsp;cache *redis.<span class="text-secondary">Client</span><br />
			&#125;
		</GlassCard>
	</div>

	<div
		class="hidden lg:block absolute bottom-[30%] left-[12%] opacity-25"
		aria-hidden="true"
		use:parallax={{ speed: 0.2 }}
	>
		<GlassCard class="px-4 py-3 rounded-lg text-xs font-mono text-muted-foreground max-w-[160px]">
			<span class="text-green-400">// 300+ TPS</span><br />
			<span class="text-primary">deploy</span>: production<br />
			<span class="text-primary">status</span>: <span class="text-green-400">healthy</span>
		</GlassCard>
	</div>

	<!-- Main Content -->
	<div class="relative z-10 max-w-4xl mx-auto text-center space-y-6">
		<!-- Terminal -->
		{#if mounted}
			<div in:fly={{ y: -20, duration: 600, delay: 0 }}>
				<TerminalText command="whoami" result={personal.role} class="justify-center mb-6" />
			</div>
		{/if}

		<!-- Name -->
		{#if mounted}
			<div in:fly={{ y: 30, duration: 600, delay: 0 }}>
				<h1 class="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
					<span
						class="text-muted-foreground font-medium text-2xl md:text-3xl lg:text-4xl block mb-2"
					>
						Hi, I'm
					</span>
					<TextScramble
						text={personal.shortName}
						speed={40}
						delay={600}
						class="text-accent-foreground"
					/>
				</h1>
			</div>
		{/if}

		<!-- Tagline -->
		{#if mounted}
			<div in:fly={{ y: 30, duration: 600, delay: 200 }}>
				<p class="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
					{personal.tagline}
				</p>
			</div>
		{/if}

		<!-- CTA Buttons -->
		{#if mounted}
			<div
				in:fly={{ y: 30, duration: 600, delay: 400 }}
				class="flex flex-wrap items-center justify-center gap-4 pt-4"
			>
				<MagneticButton
					variant="default"
					size="lg"
					class="rounded-full cursor-pointer gap-2"
					strength={0.2}
				>
					{#snippet children()}
						<button onclick={scrollToProjects} class="flex items-center gap-2 cursor-pointer">
							View Portfolio
							<ArrowDown class="h-4 w-4" />
						</button>
					{/snippet}
				</MagneticButton>

				<a
					href="/CV-Pandu-Dwi-Putra-Nugroho.pdf"
					download
					class="inline-flex items-center gap-2 h-11 rounded-full px-8 text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
				>
					Download Resume
					<Download class="h-4 w-4" />
				</a>
			</div>
		{/if}

		<!-- Stats Strip -->
		{#if mounted}
			<div in:fly={{ y: 30, duration: 600, delay: 600 }} class="pt-12">
				<GlassCard
					class="inline-flex flex-wrap items-center justify-center gap-6 md:gap-10 px-8 py-5 rounded-2xl"
				>
					{#each personal.stats as stat, i}
						{@const parsed = parseStatValue(stat.value)}
						<div class="text-center">
							<div class="text-2xl md:text-3xl font-extrabold text-accent-foreground">
								<AnimatedCounter
									value={parsed.num}
									suffix={parsed.suffix}
									duration={1500 + i * 200}
								/>
							</div>
							<div class="text-xs md:text-sm text-muted-foreground font-mono mt-1">
								{stat.label}
							</div>
						</div>
						{#if i < personal.stats.length - 1}
							<div class="hidden md:block w-px h-10 bg-border" aria-hidden="true"></div>
						{/if}
					{/each}
				</GlassCard>
			</div>
		{/if}
	</div>

	<!-- Scroll Indicator -->
	{#if mounted}
		<div
			in:fly={{ y: 20, duration: 600, delay: 1000 }}
			class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
		>
			<span class="text-xs font-mono">scroll</span>
			<ChevronDown class="h-5 w-5 animate-bounce" />
		</div>
	{/if}
</section>
