<script lang="ts">
	import { inview } from '$lib/actions/inview';
	import type { Snippet } from 'svelte';

	let {
		children,
		delay = 0,
		class: className = '',
		threshold = 0.15
	}: {
		children: Snippet;
		delay?: number;
		class?: string;
		threshold?: number;
	} = $props();

	let visible = $state(false);

	$effect(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			visible = true;
		}
	});
</script>

<div
	use:inview={{ threshold, once: true }}
	oninview={() => (visible = true)}
	class="reveal-hidden {visible ? 'reveal-visible' : ''} {className}"
	style="transition-delay: {delay}ms"
>
	{@render children()}
</div>
