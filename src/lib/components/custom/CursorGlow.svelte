<script lang="ts">
	let x = $state(0);
	let y = $state(0);
	let visible = $state(false);

	$effect(() => {
		// Only show on non-touch devices with fine pointer
		const mediaQuery = window.matchMedia('(pointer: fine)');
		if (!mediaQuery.matches) return;

		visible = true;

		const handleMouseMove = (e: MouseEvent) => {
			x = e.clientX;
			y = e.clientY;
		};

		window.addEventListener('mousemove', handleMouseMove, { passive: true });

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	});
</script>

{#if visible}
	<div
		class="pointer-events-none fixed inset-0 z-[9998] transition-opacity duration-300"
		aria-hidden="true"
		style="
			background: radial-gradient(
				600px circle at {x}px {y}px,
				var(--glow-primary),
				transparent 40%
			);
		"
	></div>
{/if}
