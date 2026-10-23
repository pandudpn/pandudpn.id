<script lang="ts">
  import type { View } from '../state.svelte.ts';
  import { showView, togglePanel, ui } from '../state.svelte.ts';
  import Icon from './Icon.svelte';

  const views: { view: View; label: string; icon: string }[] = [
    { view: 'explorer', label: 'Files', icon: 'files' },
    { view: 'search', label: 'Search', icon: 'search' },
    { view: 'scm', label: 'History', icon: 'source-control' },
  ];
</script>

<nav class="mnav" aria-label="Views">
  {#each views as v (v.view)}
    <button
      type="button"
      class:on={ui.side && ui.view === v.view}
      aria-pressed={ui.side && ui.view === v.view}
      onclick={() => showView(v.view)}
    ><span><Icon name={v.icon} /></span>{v.label}</button>
  {/each}
  <button type="button" aria-pressed={ui.panel} onclick={() => togglePanel()}>
    <span><Icon name="terminal" /></span>Terminal
  </button>
</nav>
