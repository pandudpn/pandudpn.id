<script lang="ts">
	import { z } from 'zod';
	import { personal } from '$lib/data/personal';
	import SectionHeading from '$lib/components/custom/SectionHeading.svelte';
	import ScrollReveal from '$lib/components/custom/ScrollReveal.svelte';
	import GlassCard from '$lib/components/custom/GlassCard.svelte';
	import AvailabilityBadge from '$lib/components/custom/AvailabilityBadge.svelte';
	import MagneticButton from '$lib/components/custom/MagneticButton.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Label } from '$lib/components/ui/label';
	import { Alert, AlertDescription } from '$lib/components/ui/alert';
	import {
		Mail,
		MessageCircle,
		MapPin,
		Linkedin,
		Send,
		Loader2,
		CheckCircle2,
		AlertCircle
	} from 'lucide-svelte';

	// Contact form validation schema
	const contactSchema = z.object({
		name: z.string().min(2, 'Name must be at least 2 characters'),
		email: z.string().email('Please enter a valid email address'),
		company: z.string().optional(),
		message: z
			.string()
			.min(10, 'Message must be at least 10 characters')
			.max(1000, 'Message cannot exceed 1000 characters')
	});

	// Form state
	let name = $state('');
	let email = $state('');
	let company = $state('');
	let message = $state('');
	let status = $state<'idle' | 'loading' | 'success' | 'error'>('idle');
	let errors = $state<Record<string, string>>({});
	let serverError = $state('');

	// Derived
	let messageLength = $derived(message.length);

	// Contact info items
	const contactInfo = [
		{
			icon: Mail,
			label: 'Email',
			value: personal.email,
			href: personal.social.email
		},
		{
			icon: MessageCircle,
			label: 'WhatsApp',
			value: personal.phone,
			href: personal.whatsapp
		},
		{
			icon: MapPin,
			label: 'Location',
			value: personal.location,
			href: 'https://maps.google.com/?q=Jakarta,Indonesia'
		},
		{
			icon: Linkedin,
			label: 'LinkedIn',
			value: 'linkedin.com/in/pandudpn',
			href: personal.social.linkedin
		}
	];

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();

		// Reset errors
		errors = {};
		serverError = '';

		// Validate
		const result = contactSchema.safeParse({ name, email, company, message });
		if (!result.success) {
			const fieldErrors: Record<string, string> = {};
			for (const issue of result.error.issues) {
				const field = issue.path[0] as string;
				if (!fieldErrors[field]) {
					fieldErrors[field] = issue.message;
				}
			}
			errors = fieldErrors;
			return;
		}

		// Submit
		status = 'loading';
		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, email, company: company || undefined, message })
			});

			if (!res.ok) {
				const data = await res.json();
				throw new Error(data.error || 'Failed to send message');
			}

			status = 'success';
			// Reset form
			name = '';
			email = '';
			company = '';
			message = '';
		} catch (err) {
			status = 'error';
			serverError = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
		}
	}
</script>

<section id="contact" class="relative px-4 py-20 md:py-32" aria-label="Contact">
	<div class="mx-auto max-w-6xl">
		<!-- Section Heading -->
		<ScrollReveal>
			{#snippet children()}
				<SectionHeading
					number="05"
					title="Contact"
					description="Have a project in mind or want to discuss potential collaboration? Let's connect."
				/>
			{/snippet}
		</ScrollReveal>

		<!-- Two-column layout -->
		<div class="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
			<!-- LEFT: Contact Info -->
			<ScrollReveal delay={100}>
				{#snippet children()}
					<div class="flex flex-col gap-6">
						<AvailabilityBadge text="Available for Projects" />

						<p class="max-w-md text-muted-foreground">
							I'm currently available for {personal.availableFor}. Whether you need a
							senior backend engineer or a technical consultant, I'd love to hear about your
							project.
						</p>

						<!-- Contact Info Cards -->
						<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
							{#each contactInfo as item}
								{@const Icon = item.icon}
								<a
									href={item.href}
									target={item.href.startsWith('http') ? '_blank' : undefined}
									rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
									class="group cursor-pointer"
									aria-label="Contact via {item.label}: {item.value}"
								>
									<GlassCard
										class="flex items-center gap-3 p-4 transition-all duration-200 group-hover:-translate-y-0.5"
									>
										<div
											class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20"
										>
											<Icon class="h-4 w-4 text-primary" />
										</div>
										<div class="min-w-0">
											<p class="text-xs text-muted-foreground">{item.label}</p>
											<p
												class="truncate text-sm font-medium text-foreground transition-colors group-hover:text-primary"
											>
												{item.value}
											</p>
										</div>
									</GlassCard>
								</a>
							{/each}
						</div>
					</div>
				{/snippet}
			</ScrollReveal>

			<!-- RIGHT: Contact Form -->
			<ScrollReveal delay={200}>
				{#snippet children()}
					<GlassCard class="p-6 md:p-8">
						<form onsubmit={handleSubmit} class="flex flex-col gap-5" novalidate>
							<!-- Name -->
							<div class="flex flex-col gap-1.5">
								<Label for="contact-name">
									Name <span class="text-destructive" aria-hidden="true">*</span>
								</Label>
								<Input
									id="contact-name"
									type="text"
									placeholder="Your name"
									bind:value={name}
									aria-required="true"
									aria-invalid={!!errors.name}
									aria-describedby={errors.name ? 'name-error' : undefined}
								/>
								{#if errors.name}
									<p id="name-error" class="text-xs text-destructive">{errors.name}</p>
								{/if}
							</div>

							<!-- Email -->
							<div class="flex flex-col gap-1.5">
								<Label for="contact-email">
									Email <span class="text-destructive" aria-hidden="true">*</span>
								</Label>
								<Input
									id="contact-email"
									type="email"
									placeholder="your@email.com"
									bind:value={email}
									aria-required="true"
									aria-invalid={!!errors.email}
									aria-describedby={errors.email ? 'email-error' : undefined}
								/>
								{#if errors.email}
									<p id="email-error" class="text-xs text-destructive">{errors.email}</p>
								{/if}
							</div>

							<!-- Company (optional) -->
							<div class="flex flex-col gap-1.5">
								<Label for="contact-company">
									Company <span class="text-xs text-muted-foreground">(optional)</span>
								</Label>
								<Input
									id="contact-company"
									type="text"
									placeholder="Your company"
									bind:value={company}
								/>
							</div>

							<!-- Message -->
							<div class="flex flex-col gap-1.5">
								<div class="flex items-center justify-between">
									<Label for="contact-message">
										Message <span class="text-destructive" aria-hidden="true">*</span>
									</Label>
									<span
										class="font-mono text-xs {messageLength > 900
											? messageLength > 1000
												? 'text-destructive'
												: 'text-secondary'
											: 'text-muted-foreground'}"
										aria-live="polite"
									>
										{messageLength}/1000
									</span>
								</div>
								<Textarea
									id="contact-message"
									placeholder="Tell me about your project..."
									rows={5}
									bind:value={message}
									aria-required="true"
									aria-invalid={!!errors.message}
									aria-describedby={errors.message ? 'message-error' : undefined}
								/>
								{#if errors.message}
									<p id="message-error" class="text-xs text-destructive">{errors.message}</p>
								{/if}
							</div>

							<!-- Status Alerts -->
							{#if status === 'success'}
								<Alert>
									<CheckCircle2 class="h-4 w-4" />
									<AlertDescription>
										Message sent successfully! I'll get back to you soon.
									</AlertDescription>
								</Alert>
							{/if}

							{#if status === 'error'}
								<Alert variant="destructive">
									<AlertCircle class="h-4 w-4" />
									<AlertDescription>
										{serverError}
									</AlertDescription>
								</Alert>
							{/if}

							<!-- Submit Button -->
							<MagneticButton
								variant="default"
								size="lg"
								class="w-full cursor-pointer gap-2"
							>
								{#snippet children()}
									{#if status === 'loading'}
										<Loader2 class="h-4 w-4 animate-spin" />
										Sending...
									{:else}
										<Send class="h-4 w-4" />
										Send Message
									{/if}
								{/snippet}
							</MagneticButton>
						</form>
					</GlassCard>
				{/snippet}
			</ScrollReveal>
		</div>

		<!-- CTA Section -->
		<ScrollReveal delay={300}>
			{#snippet children()}
				<div class="mt-20 text-center">
					<h3 class="mb-4 text-2xl font-bold md:text-3xl">
						Ready to Build Something Amazing?
					</h3>
					<p class="mx-auto mb-8 max-w-lg text-muted-foreground">
						Let's discuss how I can help architect and build your next high-performance system.
					</p>
					<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
						<MagneticButton
							href={personal.whatsapp}
							variant="default"
							size="lg"
							class="cursor-pointer gap-2"
						>
							{#snippet children()}
								<MessageCircle class="h-4 w-4" />
								Chat via WhatsApp
							{/snippet}
						</MagneticButton>
						<MagneticButton
							href={personal.social.email}
							variant="outline"
							size="lg"
							class="cursor-pointer gap-2"
						>
							{#snippet children()}
								<Mail class="h-4 w-4" />
								Send Email
							{/snippet}
						</MagneticButton>
					</div>
				</div>
			{/snippet}
		</ScrollReveal>
	</div>
</section>
