<script lang="ts">
  import { ext } from '../engine.ts';
  import Icon from './Icon.svelte';

  let { path }: { path: string } = $props();
  const kind = $derived(ext(path));
</script>

{#if kind === 'md'}
  <span class="fi fi-md"><Icon name="markdown" /></span>
{:else if kind === 'ts'}
  <span class="fi fi-ts" aria-hidden="true">TS</span>
{:else if kind === 'json'}
  <span class="fi fi-json" aria-hidden="true">{'{}'}</span>
{:else}
  <span class="fi"><Icon name="files" /></span>
{/if}
