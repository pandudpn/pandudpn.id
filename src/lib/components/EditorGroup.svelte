<script lang="ts">
  import { untrack } from 'svelte';
  import { base, ext, mdToHtml } from '../engine.ts';
  import { closeFile, onFileLink, onFileLinkIn, preview, togglePreview, ui, useKeys } from '../state.svelte.ts';
  import CodeView from './CodeView.svelte';
  import FileIcon from './FileIcon.svelte';
  import Icon from './Icon.svelte';
  import Minimap from './Minimap.svelte';

  const keys = useKeys();

  const active = $derived(ui.active);
  const isPreview = $derived(!!ui.active && preview.has(ui.active));
  // What the editor shows: a file, in source or preview.
  const showing = $derived(active ? `${active}:${isPreview}` : '');

  let editor: HTMLDivElement | null = $state(null);
  let tabs: HTMLDivElement | null = $state(null);
  let minimap: ReturnType<typeof Minimap> | null = $state(null);
  // The line that flashes after a reveal, or 0. CodeView turns it into the `flash` class, so a
  // row reused for another file never keeps it.
  let flashLine = $state(0);
  let flashTimer: ReturnType<typeof setTimeout> | undefined;

  // Something new on screen starts at the top, with no flash left over. Declared before the
  // reveal effect, so a reveal that arrives in the same update still lands on its line.
  $effect(() => {
    if (!editor || !showing) return;
    editor.scrollTop = 0;
    clearTimeout(flashTimer);
    flashLine = 0;
  });

  $effect(() => {
    const rev = ui.reveal;
    if (!rev || !editor) return;
    untrack(() => {
      const ed = editor!;
      if (rev.path !== active) return;
      if (isPreview) {
        ed.querySelector<HTMLElement>(`[data-line="${rev.line}"]`)?.scrollIntoView({ block: 'start' });
        return;
      }
      const row = ed.querySelector<HTMLElement>(`.l[data-n="${rev.line}"]`);
      if (!row) return;
      ed.scrollTop = row.getBoundingClientRect().top - ed.getBoundingClientRect().top + ed.scrollTop - ed.clientHeight / 3;
      clearTimeout(flashTimer);
      flashLine = rev.line;
      flashTimer = setTimeout(() => (flashLine = 0), 900);
    });
  });

  // Keep the active tab in view. The strip is scrolled directly because scrollIntoView also moves
  // the browser's Tab starting point: on load it sent the first Tab past the skip link, the title
  // bar and the explorer, straight to this tab.
  $effect(() => {
    const tab = active ? tabs?.querySelector<HTMLElement>('.tab.on') : null;
    if (!tabs || !tab) return;
    const strip = tabs.getBoundingClientRect();
    const box = tab.getBoundingClientRect();
    if (box.left < strip.left) tabs.scrollLeft += box.left - strip.left;
    else if (box.right > strip.right) tabs.scrollLeft += box.right - strip.right;
  });

  function onScroll() {
    minimap?.sync();
  }

  function middleClick(e: MouseEvent, path: string) {
    if (e.button !== 1) return;
    e.preventDefault();
    closeFile(path);
  }
</script>

<div class="tabbar">
  <div id="tabs" class="tabs" role="tablist" aria-label="Open editors" bind:this={tabs}>
    {#each ui.open as p (p)}
      {@const on = p === ui.active}
      {@const pv = preview.has(p)}
      <div class="tab" class:on role="presentation" onauxclick={(e) => middleClick(e, p)}>
        <a role="tab" aria-selected={on} href="#/{p}" title={p} onclick={(e) => onFileLink(e, p)}>
          {#if pv}
            <span class="fi fi-md"><Icon name="open-preview" /></span>
          {:else}
            <FileIcon path={p} />
          {/if}
          <span>{pv ? 'Preview ' : ''}{base(p)}</span>
        </a>
        <button type="button" class="tab-close" aria-label={`Close ${base(p)}`} onclick={() => closeFile(p)}>
          <Icon name="close" />
        </button>
      </div>
    {/each}
  </div>
  <div id="editor-actions" class="editor-actions">
    {#if active && ext(active) === 'md'}
      {#if preview.has(active)}
        <button type="button" class="icon-btn" title="Show the Markdown source" aria-label="Show the Markdown source" onclick={togglePreview}>
          <Icon name="go-to-file" />
        </button>
      {:else}
        <button
          type="button"
          class="icon-btn"
          title={`Open Preview (${keys.preview})`}
          aria-label="Open the Markdown preview"
          onclick={togglePreview}
        >
          <Icon name="open-preview" />
        </button>
      {/if}
    {/if}
  </div>
</div>

<nav id="crumbs" class="crumbs" aria-label="Breadcrumbs">
  {#if active}
    {#each ['pandudpn', ...active.split('/')] as p, i (i)}
      {#if i > 0}
        <Icon name="chevron-right" class="sep" />
      {/if}
      <span class="crumb">
        {#if i === active.split('/').length}
          <FileIcon path={active} />
        {/if}
        {p}
      </span>
    {/each}
  {/if}
</nav>

<div class="editor-wrap">
  <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_tabindex, a11y_no_noninteractive_element_interactions -->
  <!-- The skip link focuses the editor and the click handler only forwards file links, which
       keyboard users activate themselves; clicking a code line is mouse-only by design. -->
  <div
    id="editor"
    class="editor"
    class:nowrap={!ui.wrap}
    tabindex="0"
    role="region"
    aria-label="Editor"
    bind:this={editor}
    onscroll={onScroll}
    onclick={onFileLinkIn}
  >
    {#if !active}
      <div class="watermark">
        <dl>
          <div><dt>Show All Commands</dt><dd><kbd>{keys.palette}</kbd></dd></div>
          <div><dt>Go to File</dt><dd><kbd>{keys.mod}P</kbd></dd></div>
          <div><dt>Toggle Terminal</dt><dd><kbd>{'⌃`'}</kbd></dd></div>
        </dl>
        <p><a href="#/README.md" onclick={(e) => onFileLink(e, 'README.md')}>Open README.md</a></p>
      </div>
    {:else if isPreview}
      <article class="preview">{@html mdToHtml(active)}</article>
    {:else}
      <CodeView path={active} flash={flashLine} />
    {/if}
  </div>
  {#if active && !isPreview}
    <Minimap path={active} editor={editor} bind:this={minimap} />
  {/if}
</div>
