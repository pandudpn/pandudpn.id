<script lang="ts">
  import { tick } from 'svelte';
  import Icon from './Icon.svelte';
  import FileIcon from './FileIcon.svelte';
  import { PATHS, base, dir, symbols } from '../engine.ts';
  import { ui, collapsed, toggleFolder, toggleOutline, revealLine, onFileLink, closeSide } from '../state.svelte.ts';

  const dirs = [...new Set(PATHS.filter((p) => p.includes('/')).map(dir))].sort();
  const rootFiles = PATHS.filter((p) => !p.includes('/')).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  const filesIn = (d: string) => PATHS.filter((p) => dir(p) === d).sort();

  let treeEl: HTMLUListElement;

  // Roving tabindex: one row is in the tab order. Arrow keys pin it to the row they moved to;
  // otherwise it is the active file's row, else the first row, as the prototype's rovingFocus did.
  let roving = $state<string | null>(null);

  // Every focusable row, in tree order: folders as `d:path`, files as `f:path`.
  const rows = $derived.by(() => {
    const out: string[] = [];
    for (const d of dirs) {
      out.push(`d:${d}`);
      if (!collapsed.has(d)) for (const p of filesIn(d)) out.push(`f:${p}`);
    }
    for (const f of rootFiles) out.push(`f:${f}`);
    return out;
  });
  const current = $derived(
    roving && rows.includes(roving) ? roving : ui.active && rows.includes(`f:${ui.active}`) ? `f:${ui.active}` : rows[0],
  );
  const tab = (key: string) => (key === current ? 0 : -1);

  const syms = $derived(ui.active ? symbols(ui.active) : []);

  async function moveTo(key: string) {
    roving = key;
    await tick();
    treeEl.querySelector<HTMLElement>('[tabindex="0"]')?.focus();
  }

  const keyOf = (el: HTMLElement) => (el.dataset.folder ? `d:${el.dataset.folder}` : `f:${el.dataset.open}`);

  function onTreeKeydown(e: KeyboardEvent) {
    const target = e.target as HTMLElement;
    const focusables = [...treeEl.querySelectorAll<HTMLElement>('a, button')];
    const i = focusables.indexOf(target);
    if (i < 0) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      const next = focusables[i + (e.key === 'ArrowDown' ? 1 : -1)];
      if (next) void moveTo(keyOf(next));
      e.preventDefault();
    } else if (e.key === 'Home' || e.key === 'End') {
      const next = e.key === 'Home' ? focusables[0] : focusables[focusables.length - 1];
      if (next) void moveTo(keyOf(next));
      e.preventDefault();
    } else if ((e.key === 'ArrowRight' || e.key === 'ArrowLeft') && target.dataset.folder) {
      const d = target.dataset.folder;
      if ((e.key === 'ArrowRight') === collapsed.has(d)) void onFolder(d);
      e.preventDefault();
    }
  }

  // The tree re-renders on a toggle, so focus is put back on the same folder button.
  async function onFolder(d: string) {
    const btn = treeEl.querySelector<HTMLElement>(`[data-folder="${CSS.escape(d)}"]`);
    toggleFolder(d);
    await tick();
    btn?.focus();
  }

  function onFile(e: MouseEvent, path: string) {
    onFileLink(e, path);
    // A click re-renders nothing, but the default tabindex now belongs to the file opened.
    roving = null;
  }
</script>

<section class="view view-explorer" aria-labelledby="explorer-title">
  <div class="view-title">
    <h2 id="explorer-title">Explorer</h2>
    <button type="button" class="icon-btn close-side" onclick={closeSide} aria-label="Close the explorer">
      <Icon name="close" />
    </button>
  </div>
  <div class="pane pane-files">
    <p class="pane-head"><span><Icon name="chevron-down" /></span>pandudpn</p>
    <ul id="tree" role="tree" aria-label="Files" bind:this={treeEl} onkeydown={onTreeKeydown}>
      {#each dirs as d (d)}
        {@const shut = collapsed.has(d)}
        <li role="treeitem" aria-expanded={!shut} aria-selected="false" class="row dir" style="--d:0">
          <button type="button" data-folder={d} tabindex={tab(`d:${d}`)} onclick={() => onFolder(d)}>
            <Icon name={shut ? 'chevron-right' : 'chevron-down'} class="chev" /><span class="label">{d}</span>
          </button>
          {#if !shut}
            <ul role="group">
              {#each filesIn(d) as p (p)}
                <li role="treeitem" aria-selected={p === ui.active} class="row{p === ui.active ? ' on' : ''}" style="--d:1">
                  <a href="#/{p}" data-open={p} tabindex={tab(`f:${p}`)} onclick={(e) => onFile(e, p)}>
                    <FileIcon path={p} /><span class="label">{base(p)}</span>
                  </a>
                </li>
              {/each}
            </ul>
          {/if}
        </li>
      {/each}
      {#each rootFiles as p (p)}
        <li role="treeitem" aria-selected={p === ui.active} class="row{p === ui.active ? ' on' : ''}" style="--d:0">
          <a href="#/{p}" data-open={p} tabindex={tab(`f:${p}`)} onclick={(e) => onFile(e, p)}>
            <FileIcon path={p} /><span class="label">{base(p)}</span>
          </a>
        </li>
      {/each}
    </ul>
  </div>
  <div class="pane-outline">
    <button
      type="button"
      class="pane-head"
      id="outline-head"
      onclick={toggleOutline}
      aria-expanded={ui.outlineOpen}
      aria-controls="outline"
    >
      <Icon name={ui.outlineOpen ? 'chevron-down' : 'chevron-right'} class="chev" />Outline
    </button>
    <ul id="outline" aria-label="Outline of the open file" hidden={!ui.outlineOpen}>
      {#if !ui.active}
        <li class="empty">No editor is open, so there is no outline to show.</li>
      {:else if syms.length === 0}
        <li class="empty">This file has no symbols.</li>
      {:else}
        {#each syms as s (s.line)}
          <li class="row" style="--d:{s.depth}">
            <button type="button" onclick={() => revealLine(s.line)}>
              <Icon name={s.kind} class="sym {s.kind}" /><span class="label">{s.name}</span>
            </button>
          </li>
        {/each}
      {/if}
    </ul>
  </div>
</section>
