<script lang="ts">
  import type { View } from '../state.svelte.ts';
  import { showView, ui } from '../state.svelte.ts';
  import Icon from './Icon.svelte';

  const views: { view: View; label: string; title: string; icon: string }[] = [
    { view: 'explorer', label: 'Explorer', title: 'Explorer', icon: 'files' },
    { view: 'search', label: 'Search', title: 'Search', icon: 'search' },
    { view: 'scm', label: 'Source Control: career history', title: 'Source Control', icon: 'source-control' },
  ];
</script>

<nav class="activity" aria-label="Views">
  {#each views as v (v.view)}
    <button
      type="button"
      class:on={ui.side && ui.view === v.view}
      aria-pressed={ui.side && ui.view === v.view}
      aria-label={v.label}
      title={v.title}
      onclick={() => showView(v.view)}
    ><Icon name={v.icon} /></button>
  {/each}
  <span class="spacer"></span>
  <a href="https://github.com/pandudpn" target="_blank" rel="noopener" aria-label="GitHub profile" title="github.com/pandudpn">
    <Icon name="account" />
  </a>
  <a href="mailto:pandu@pandudpn.id" aria-label="Email pandu@pandudpn.id" title="pandu@pandudpn.id">
    <Icon name="mail" />
  </a>
</nav>
