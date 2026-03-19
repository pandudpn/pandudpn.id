<script lang="ts">
	import { scramble } from '$lib/actions/scramble';

	let {
		text,
		speed = 50,
		delay = 0,
		class: className = ''
	}: {
		text: string;
		speed?: number;
		delay?: number;
		class?: string;
	} = $props();
</script>

<span use:scramble={{ text, speed, delay }} class={className} aria-label={text}></span>
