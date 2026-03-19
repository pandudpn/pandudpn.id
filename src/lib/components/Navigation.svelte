<script lang="ts">
	import { navigation } from '$lib/data/navigation';
	import { personal } from '$lib/data/personal';
	import { getActiveSection } from '$lib/stores/activeSection.svelte';
	import ThemeToggle from '$lib/components/custom/ThemeToggle.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Sheet from '$lib/components/ui/sheet';
	import { Separator } from '$lib/components/ui/separator';
	import { Menu, Github, Linkedin, Mail, X } from 'lucide-svelte';

	const section = getActiveSection();

	let scrollY = $state(0);
	let lastScrollY = $state(0);
	let isVisible = $derived(scrollY < 100 || scrollY < lastScrollY);
	let mobileOpen = $state(false);

	$effect(() => {
		const handleScroll = () => {
			lastScrollY = scrollY;
			scrollY = window.scrollY;
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});

	function scrollToSection(id: string) {
		mobileOpen = false;
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
	}

	// Filter out 'hero' from nav links (it's the home/logo target)
	const navLinks = navigation.filter((n) => n.id !== 'hero');
</script>

<nav
	class="fixed top-4 left-4 right-4 z-50 transition-all duration-300 {isVisible
		? 'translate-y-0 opacity-100'
		: '-translate-y-full opacity-0'}"
	aria-label="Main navigation"
>
	<div class="mx-auto max-w-6xl glass-card rounded-full px-4 py-2 md:px-6 md:py-2.5">
		<div class="flex items-center justify-between gap-4">
			<!-- Logo -->
			<button
				onclick={() => scrollToSection('hero')}
				class="flex items-center gap-0 cursor-pointer shrink-0"
				aria-label="Scroll to top"
			>
				<span class="text-lg font-extrabold tracking-tight text-accent-foreground">pandudpn</span>
				<span class="inline-block w-[2px] h-5 bg-primary cursor-blink ml-0.5" aria-hidden="true"
				></span>
			</button>

			<!-- Desktop Nav Links -->
			<div class="hidden md:flex items-center gap-1">
				{#each navLinks as item}
					<button
						onclick={() => scrollToSection(item.id)}
						class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-mono transition-colors cursor-pointer
							{section.current === item.id
							? 'text-primary bg-primary/10'
							: 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}"
						aria-label="Navigate to {item.label}"
						aria-current={section.current === item.id ? 'true' : undefined}
					>
						<span class="text-xs opacity-60">{item.number}</span>
						<span>{item.label}</span>
						{#if section.current === item.id}
							<span
								class="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary rounded-full"
								aria-hidden="true"
							></span>
						{/if}
					</button>
				{/each}
			</div>

			<!-- Right Section -->
			<div class="flex items-center gap-2 shrink-0">
				<!-- Social icons (desktop only) -->
				<div class="hidden lg:flex items-center gap-1">
					<a
						href={personal.social.github}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center justify-center h-8 w-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
						aria-label="GitHub profile"
					>
						<Github class="h-4 w-4" />
					</a>
					<a
						href={personal.social.linkedin}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center justify-center h-8 w-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
						aria-label="LinkedIn profile"
					>
						<Linkedin class="h-4 w-4" />
					</a>
					<a
						href={personal.social.email}
						class="inline-flex items-center justify-center h-8 w-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
						aria-label="Send email"
					>
						<Mail class="h-4 w-4" />
					</a>
				</div>

				<!-- Theme Toggle (desktop only) -->
				<div class="hidden md:block">
					<ThemeToggle />
				</div>

				<!-- Hire Me CTA (desktop only) -->
				<Button
					variant="default"
					size="sm"
					class="hidden md:inline-flex rounded-full cursor-pointer"
					onclick={() => scrollToSection('contact')}
				>
					Hire Me
				</Button>

				<!-- Mobile Hamburger -->
				<Sheet.Root bind:open={mobileOpen}>
					<Sheet.Trigger
						class="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-full text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
						aria-label="Open menu"
					>
						<Menu class="h-5 w-5" />
					</Sheet.Trigger>

					<Sheet.Content side="right" class="w-[300px] bg-card border-border">
						<Sheet.Header class="pb-4">
							<Sheet.Title class="flex items-center gap-0">
								<span class="text-xl font-extrabold tracking-tight text-accent-foreground"
									>pandudpn</span
								>
								<span
									class="inline-block w-[2px] h-5 bg-primary cursor-blink ml-0.5"
									aria-hidden="true"
								></span>
							</Sheet.Title>
							<Sheet.Description class="text-sm text-muted-foreground">
								Navigation
							</Sheet.Description>
						</Sheet.Header>

						<div class="flex flex-col gap-1 py-4">
							{#each navigation as item}
								<button
									onclick={() => scrollToSection(item.id)}
									class="flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors cursor-pointer
										{section.current === item.id
										? 'text-primary bg-primary/10'
										: 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}"
									aria-label="Navigate to {item.label}"
								>
									<span class="font-mono text-xs opacity-60 w-6">{item.number}.</span>
									<span class="text-sm font-medium">{item.label}</span>
								</button>
							{/each}
						</div>

						<Separator class="my-2" />

						<!-- Social Links -->
						<div class="flex items-center gap-3 px-4 py-4">
							<a
								href={personal.social.github}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center justify-center h-9 w-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
								aria-label="GitHub profile"
							>
								<Github class="h-5 w-5" />
							</a>
							<a
								href={personal.social.linkedin}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center justify-center h-9 w-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
								aria-label="LinkedIn profile"
							>
								<Linkedin class="h-5 w-5" />
							</a>
							<a
								href={personal.social.email}
								class="inline-flex items-center justify-center h-9 w-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
								aria-label="Send email"
							>
								<Mail class="h-5 w-5" />
							</a>
						</div>

						<Separator class="my-2" />

						<!-- Theme Toggle -->
						<div class="px-4 py-4">
							<p class="text-xs text-muted-foreground mb-3 font-mono">Theme</p>
							<ThemeToggle />
						</div>

						<div class="px-4 pt-2">
							<Button
								variant="default"
								class="w-full rounded-full cursor-pointer"
								onclick={() => scrollToSection('contact')}
							>
								Hire Me
							</Button>
						</div>
					</Sheet.Content>
				</Sheet.Root>
			</div>
		</div>
	</div>
</nav>
