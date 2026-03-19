<script lang="ts">
	import { Tween } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { inview } from '$lib/actions/inview';

	let {
		value,
		suffix = '',
		duration = 1500,
		class: className = ''
	}: {
		value: number;
		suffix?: string;
		duration?: number;
		class?: string;
	} = $props();

	let started = $state(false);
	const tweened = new Tween(0, { duration, easing: cubicOut });
	let wrapperEl: HTMLSpanElement | undefined = $state();

	$effect(() => {
		if (!wrapperEl) return;
		const handler = () => {
			if (!started) {
				started = true;
				tweened.set(value);
			}
		};
		wrapperEl.addEventListener('inview', handler);
		return () => wrapperEl?.removeEventListener('inview', handler);
	});
</script>

<span bind:this={wrapperEl} use:inview={{ threshold: 0.5, once: true }} class={className}>
	{Math.round(tweened.current)}{suffix}
</span>
