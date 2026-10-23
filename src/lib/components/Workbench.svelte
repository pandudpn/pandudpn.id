<script lang="ts">
  import { onMount } from 'svelte';
  import { base } from '../engine.ts';
  import {
    closeSheets,
    openFromHash,
    openQuick,
    provideKeys,
    showView,
    startInBrowser,
    togglePanel,
    togglePreview,
    toggleSide,
    toggleWrap,
    ui,
  } from '../state.svelte.ts';
  import ActivityBar from './ActivityBar.svelte';
  import EditorGroup from './EditorGroup.svelte';
  import Panel from './Panel.svelte';
  import PhoneNav from './PhoneNav.svelte';
  import QuickOpen from './QuickOpen.svelte';
  import Sash from './Sash.svelte';
  import SideBar from './SideBar.svelte';
  import StatusBar from './StatusBar.svelte';
  import TitleBar from './TitleBar.svelte';

  let { mac }: { mac: boolean } = $props();
  const keys = provideKeys(() => mac);

  onMount(startInBrowser);

  $effect(() => {
    document.title = ui.active ? `${base(ui.active)} · Pandu Dwi Putra Nugroho` : 'Pandu Dwi Putra Nugroho';
  });

  // VS Code's shortcuts. ⌘ on a Mac, Ctrl elsewhere; the terminal is Ctrl+` everywhere.
  function onkeydown(e: KeyboardEvent) {
    const mod = keys.mac ? e.metaKey : e.ctrlKey;
    const k = e.key.toLowerCase();
    if (mod && e.shiftKey && k === 'p') openQuick('>');
    else if (mod && !e.shiftKey && k === 'p') openQuick('');
    else if (e.ctrlKey && (e.key === '`' || e.code === 'Backquote')) togglePanel();
    else if (mod && !e.shiftKey && k === 'b') toggleSide();
    else if (mod && e.shiftKey && k === 'v') togglePreview();
    else if (mod && e.shiftKey && k === 'f') showView('search');
    else if (e.altKey && e.code === 'KeyZ') toggleWrap();
    else {
      if (e.key === 'Escape') closeSheets();
      return;
    }
    e.preventDefault();
  }
</script>

<svelte:window {onkeydown} onhashchange={openFromHash} />

<a class="skip" href="#editor">Skip to the editor</a>

<div
  class="wb"
  id="wb"
  class:no-side={!ui.side}
  class:no-panel={!ui.panel}
  data-view={ui.view}
  style:--side-w={ui.sideSize === null ? null : `${ui.sideSize}px`}
  style:--panel-h={ui.panelSize === null ? null : `${ui.panelSize}px`}
>
  <TitleBar />
  <ActivityBar />
  <SideBar />
  <Sash part="side" />
  <main class="main">
    <EditorGroup />
    <Sash part="panel" />
    <Panel />
  </main>
  <StatusBar />
  <PhoneNav />
</div>

{#key ui.quick}
  {#if ui.quick}
    <QuickOpen />
  {/if}
{/key}
