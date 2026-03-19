<script lang="ts">
	import { cn } from '$lib/utils';
	import { magnetic } from '$lib/actions/magnetic';
	import type { Snippet } from 'svelte';

	let {
		children,
		variant = 'default',
		size = 'default',
		href,
		strength = 0.3,
		class: className = ''
	}: {
		children: Snippet;
		variant?: 'default' | 'outline' | 'ghost' | 'link' | 'secondary' | 'destructive';
		size?: 'default' | 'sm' | 'lg' | 'icon';
		href?: string;
		strength?: number;
		class?: string;
	} = $props();

	const baseClasses =
		'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

	const variantClasses: Record<string, string> = {
		default: 'bg-primary text-primary-foreground hover:bg-primary/90',
		outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
		ghost: 'hover:bg-accent hover:text-accent-foreground',
		link: 'text-primary underline-offset-4 hover:underline',
		secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
		destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
	};

	const sizeClasses: Record<string, string> = {
		default: 'h-10 px-4 py-2',
		sm: 'h-9 rounded-md px-3',
		lg: 'h-11 rounded-md px-8',
		icon: 'h-10 w-10'
	};
</script>

{#if href}
	<a
		{href}
		use:magnetic={{ strength }}
		class={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
	>
		{@render children()}
	</a>
{:else}
	<button
		use:magnetic={{ strength }}
		class={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
	>
		{@render children()}
	</button>
{/if}
