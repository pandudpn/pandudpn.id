<script lang="ts">
	let {
		text = 'Available for projects',
		class: className = ''
	}: {
		text?: string;
		class?: string;
	} = $props();
</script>

<div
	class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary {className}"
	role="status"
>
	<span class="relative flex h-2 w-2" aria-hidden="true">
		<span
			class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"
		></span>
		<span class="animate-pulse-dot relative inline-flex h-2 w-2 rounded-full bg-green-400"></span>
	</span>
	{text}
</div>
