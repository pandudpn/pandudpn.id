<script lang="ts">
	import { setMode, resetMode, mode } from 'mode-watcher';
	import { Sun, Moon, Monitor } from 'lucide-svelte';
</script>

<div class="relative inline-flex items-center gap-1 rounded-lg border border-border bg-muted/50 p-1">
	<button
		onclick={() => setMode('light')}
		class="rounded-md p-1.5 transition-colors hover:bg-background {$mode === 'light'
			? 'bg-background text-foreground shadow-sm'
			: 'text-muted-foreground'}"
		aria-label="Light theme"
	>
		<Sun class="h-4 w-4" />
	</button>
	<button
		onclick={() => setMode('dark')}
		class="rounded-md p-1.5 transition-colors hover:bg-background {$mode === 'dark'
			? 'bg-background text-foreground shadow-sm'
			: 'text-muted-foreground'}"
		aria-label="Dark theme"
	>
		<Moon class="h-4 w-4" />
	</button>
	<button
		onclick={() => resetMode()}
		class="rounded-md p-1.5 transition-colors hover:bg-background {$mode === undefined
			? 'bg-background text-foreground shadow-sm'
			: 'text-muted-foreground'}"
		aria-label="System theme"
	>
		<Monitor class="h-4 w-4" />
	</button>
</div>
