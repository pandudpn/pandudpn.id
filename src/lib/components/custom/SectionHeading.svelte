<script lang="ts">
	let {
		number,
		title,
		description
	}: {
		number: string;
		title: string;
		description?: string;
	} = $props();
</script>

<div class="mb-12 space-y-3">
	<div class="flex items-center gap-4">
		<span class="font-mono text-sm font-medium text-primary" aria-hidden="true">{number}.</span>
		<h2 class="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
	</div>
	<div class="ml-[2.5rem] h-px w-16 bg-primary/30" aria-hidden="true"></div>
	{#if description}
		<p class="ml-[2.5rem] max-w-2xl text-muted-foreground">{description}</p>
	{/if}
</div>
