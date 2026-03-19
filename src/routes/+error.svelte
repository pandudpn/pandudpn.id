<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>Error {page.status} — pandudpn.id</title>
</svelte:head>

<main class="min-h-screen flex items-center justify-center bg-background">
	<div class="text-center font-mono">
		<p class="text-primary text-sm mb-2">$ cat /error</p>
		<h1 class="text-6xl font-bold text-accent-foreground mb-4">{page.status}</h1>
		<p class="text-muted-foreground mb-8">{page.error?.message || 'Something went wrong'}</p>
		<a
			href="/"
			class="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium transition-colors hover:bg-primary/90"
		>
			<span>←</span>
			<span>cd /home</span>
		</a>
	</div>
</main>
