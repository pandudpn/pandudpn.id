<script lang="ts">
	let {
		command,
		result,
		typingSpeed = 50,
		class: className = ''
	}: {
		command: string;
		result: string;
		typingSpeed?: number;
		class?: string;
	} = $props();

	let displayedCommand = $state('');
	let showResult = $state(false);
	let charIndex = $state(0);

	$effect(() => {
		// Reset on command change
		displayedCommand = '';
		showResult = false;
		charIndex = 0;

		const interval = setInterval(() => {
			if (charIndex < command.length) {
				displayedCommand = command.slice(0, charIndex + 1);
				charIndex++;
			} else {
				clearInterval(interval);
				setTimeout(() => {
					showResult = true;
				}, 300);
			}
		}, typingSpeed);

		return () => clearInterval(interval);
	});
</script>

<div class="font-mono text-sm {className}" role="img" aria-label="Terminal: {command} → {result}">
	<div class="flex items-center gap-2">
		<span class="text-primary" aria-hidden="true">$</span>
		<span class="text-foreground">{displayedCommand}</span>
		{#if charIndex < command.length}
			<span class="inline-block h-4 w-2 animate-pulse bg-primary" aria-hidden="true"></span>
		{/if}
	</div>
	{#if showResult}
		<div class="mt-1 text-muted-foreground">{result}</div>
	{/if}
</div>
