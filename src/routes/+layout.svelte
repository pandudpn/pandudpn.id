<script lang="ts">
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { ModeWatcher } from 'mode-watcher';
	import { onMount } from 'svelte';
	import GrainOverlay from '$lib/components/custom/GrainOverlay.svelte';
	import CursorGlow from '$lib/components/custom/CursorGlow.svelte';
	import '../app.css';

	let { children, data } = $props();

	onMount(() => {
		fetch('/api/visitor', { method: 'POST' }).catch(() => {});
	});
</script>

<a
	href="#main-content"
	class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:rounded-lg focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:outline-none"
>
	Skip to content
</a>

<ModeWatcher defaultMode="dark" />
<QueryClientProvider client={data.queryClient}>
	<GrainOverlay />
	<CursorGlow />
	{@render children()}
</QueryClientProvider>
