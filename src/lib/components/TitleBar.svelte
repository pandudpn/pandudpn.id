<script lang="ts">
  import { base } from '../engine.ts';
  import { onFileLink, openQuick, openThemePicker, preview, togglePanel, toggleSide, ui, useKeys } from '../state.svelte.ts';
  import Icon from './Icon.svelte';

  const keys = useKeys();
  const title = $derived(
    ui.active ? `${preview.has(ui.active) ? 'Preview ' : ''}${base(ui.active)} - pandudpn` : 'pandudpn',
  );
</script>

<header class="titlebar">
  <div class="tb-left">
    <a class="mark" href="#/README.md" onclick={(e) => onFileLink(e, 'README.md')} aria-label="pandudpn, open README.md">pd</a>
    <span class="win-title" id="window-title">{title}</span>
  </div>
  <button type="button" class="cc" onclick={() => openQuick('')} aria-label="Go to a file or run a command">
    <span><Icon name="search" /></span><span>pandudpn</span><kbd id="kbd-qo">{keys.mod}P</kbd>
  </button>
  <div class="tb-actions">
    <button
      type="button"
      class="icon-btn"
      data-toggle="side"
      aria-pressed={ui.side}
      aria-label="Toggle the side bar"
      title="Toggle Primary Side Bar"
      onclick={toggleSide}
    ><Icon name="layout-sidebar-left" /></button>
    <button
      type="button"
      class="icon-btn"
      data-toggle="panel"
      aria-pressed={ui.panel}
      aria-label="Toggle the terminal"
      title="Toggle Panel"
      onclick={() => togglePanel()}
    ><Icon name="layout-panel" /></button>
    <button type="button" class="icon-btn" onclick={() => openThemePicker()} aria-label="Choose a color theme" title="Color Theme">
      <Icon name="color-mode" />
    </button>
    <a class="btn" href="mailto:pandu@pandudpn.id">Email me</a>
  </div>
</header>
