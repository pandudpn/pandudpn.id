<script lang="ts">
  import { ICONS } from '../icons.ts';

  // Each codicon keeps its own viewBox: some are drawn on a 24px grid, the rest on 16px.
  let { name, class: extra = '' }: { name: string; class?: string } = $props();
  const icon = $derived(ICONS[name] ?? ['0 0 16 16', '']);
</script>

<svg class="ic {extra}" viewBox={icon[0]} fill="currentColor" aria-hidden="true">{@html icon[1]}</svg>
