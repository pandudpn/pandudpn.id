<script lang="ts">
	/**
	 * IconPlaceholder — resolves shadcn-svelte icon references to lucide-svelte equivalents.
	 * shadcn-svelte generates components that reference multiple icon libraries.
	 * This bridge component renders the lucide icon when available.
	 */
	import { X, Check, ChevronRight, Circle } from 'lucide-svelte';

	let {
		lucide = '',
		class: className = '',
		...restProps
	}: {
		lucide?: string;
		tabler?: string;
		hugeicons?: string;
		phosphor?: string;
		remixicon?: string;
		class?: string;
		[key: string]: unknown;
	} = $props();

	const iconMap: Record<string, typeof X> = {
		XIcon: X,
		CheckIcon: Check,
		ChevronRightIcon: ChevronRight,
		CircleIcon: Circle
	};

	const IconComponent = $derived(iconMap[lucide]);
</script>

{#if IconComponent}
	<IconComponent class="h-4 w-4 {className}" {...restProps} />
{:else}
	<X class="h-4 w-4 {className}" {...restProps} />
{/if}
