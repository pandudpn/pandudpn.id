<script lang="ts">
  import { onMount } from 'svelte';
  import { LINKS, PATHS, base, dir, ext, fuzzy, squash, THEMES } from '../engine.ts';
  import {
    applyTheme,
    closeQuick,
    openFile,
    openThemePicker,
    setTheme,
    toggleLightDark,
    togglePanel,
    togglePreview,
    toggleSide,
    toggleWrap,
    showView,
    ui,
    useKeys,
  } from '../state.svelte.ts';
  import FileIcon from './FileIcon.svelte';

  const keys = useKeys();

  // Workbench mounts QuickOpen fresh for each `ui.quick`, so the starting text is read once.
  const startMode = ui.quick!.mode;

  type Item =
    | { path: string }
    | { theme: (typeof THEMES)[number] }
    | { label: string; key?: string; run: (back: HTMLElement | null) => void };

  type Row = { key: string; item?: Item; sep?: boolean; group?: string };

  let input: HTMLInputElement;
  let list: HTMLUListElement;
  let text = $state(ui.quick!.value);
  let index = $state(0);

  // The theme picker stays the theme picker; otherwise a leading > lists commands.
  const mode = $derived(startMode === 'themes' ? 'themes' : text.startsWith('>') ? 'commands' : 'files');

  function palette(): Item[] {
    return [
      { label: 'View: Toggle Terminal', key: '⌃`', run: () => togglePanel() },
      { label: 'View: Toggle Primary Side Bar', key: `${keys.mod}B`, run: toggleSide },
      { label: 'View: Show Explorer', run: () => showView('explorer') },
      { label: 'View: Show Search', run: () => showView('search') },
      { label: 'View: Show Source Control', run: () => showView('scm') },
      { label: 'View: Toggle Word Wrap', key: '⌥Z', run: toggleWrap },
      {
        label: 'Preferences: Color Theme',
        // Reopens as the theme picker, keeping the place focus should return to.
        run: (back) => openThemePicker(back),
      },
      { label: 'Preferences: Toggle between Light/Dark Themes', run: () => toggleLightDark() },
      ...(ui.active && ext(ui.active) === 'md'
        ? [{ label: 'Markdown: Toggle Preview', key: keys.preview, run: () => togglePreview() }]
        : []),
      { label: 'Pandu: Send an Email', run: () => (location.href = LINKS.email) },
      { label: 'Pandu: Message on WhatsApp', run: () => window.open(LINKS.whatsapp, '_blank', 'noopener') },
      { label: 'Pandu: Open LinkedIn', run: () => window.open(LINKS.linkedin, '_blank', 'noopener') },
      { label: 'Pandu: Open GitHub', run: () => window.open(LINKS.github, '_blank', 'noopener') },
    ];
  }

  const items = $derived.by<Item[]>(() => {
    if (mode === 'themes') {
      const q = squash(text);
      return THEMES.filter((t) => !q || squash(t.label).includes(q)).map((t) => ({ theme: t }));
    }
    if (mode === 'commands') {
      const q = text.slice(1).trim().toLowerCase();
      return palette().filter((c) => !q || (c as { label: string }).label.toLowerCase().includes(q));
    }
    const q = text.trim();
    return PATHS.filter((p) => !q || fuzzy(p, q)).map((p) => ({ path: p }));
  });

  // Separators and group labels sit before the first item of each theme type.
  const rows = $derived.by<Row[]>(() => {
    if (mode !== 'themes') return items.map((item, i) => ({ key: String(i), item }));
    const out: Row[] = [];
    let group: string | null = null;
    items.forEach((item, i) => {
      const t = 'theme' in item ? item.theme : null;
      if (t && t.type !== group) {
        if (i) out.push({ key: `sep-${i}`, sep: true });
        group = t.type;
        out.push({ key: String(i), item, group });
      } else {
        out.push({ key: String(i), item });
      }
    });
    return out;
  });

  // Each new list starts over: on the saved theme in the unfiltered picker, else on the first
  // row. The arrow keys move on from there.
  $effect(() => {
    index =
      mode === 'themes' && !squash(text) ? Math.max(0, items.findIndex((x) => 'theme' in x && x.theme.id === ui.theme)) : 0;
  });

  // Previewing the highlighted theme and keeping the highlight in view follow `index`.
  $effect(() => {
    const item = items[index];
    if (mode === 'themes' && item && 'theme' in item) applyTheme(item.theme.id);
    list?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
  });

  onMount(() => input.focus());

  function move(d: number) {
    if (!items.length) return;
    index = (index + d + items.length) % items.length;
  }

  function pick(i = index) {
    const item = items[i];
    if (!item) return;
    // The picker must not undo its own pick: close first without restoring the theme.
    const back = closeQuick(false);
    if ('theme' in item) {
      setTheme(item.theme.id);
      back?.focus();
    } else if ('path' in item) {
      openFile(item.path);
    } else {
      item.run(back);
    }
  }

  function onkeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      move(1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      move(-1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      pick();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      closeQuick();
    }
  }

  const placeholder = $derived(
    mode === 'themes' ? 'Select Color Theme (Up/Down Keys to Preview)' : 'Search files by name. Type > to run a command.',
  );
</script>

<!-- Backdrop click and option click close or pick; the keyboard paths live on the input. -->
<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions, a11y_no_noninteractive_element_interactions -->
<div id="qo" class="qo" onclick={(e) => e.target === e.currentTarget && closeQuick()}>
  <div class="qo-box" role="dialog" aria-modal="true" aria-label="Go to a file or run a command">
    <input
      id="qo-in"
      role="combobox"
      aria-expanded="true"
      aria-controls="qo-list"
      aria-autocomplete="list"
      aria-activedescendant={items.length ? `qo-${index}` : undefined}
      {placeholder}
      autocomplete="off"
      spellcheck="false"
      bind:this={input}
      bind:value={text}
      onkeydown={onkeydown}
    />
    <ul id="qo-list" role="listbox" aria-label="Results" bind:this={list}>
      {#if !rows.length}
        <li class="empty">
          {mode === 'commands' ? 'No matching commands' : mode === 'themes' ? 'No matching themes' : 'No matching files. Type > to run a command instead.'}
        </li>
      {:else}
        {#each rows as row (row.key)}
          {#if row.sep}
            <li class="sep" role="presentation"></li>
          {:else if row.item}
            <li role="option" id="qo-{row.key}" aria-selected={Number(row.key) === index} onclick={() => pick(Number(row.key))}>
              {#if 'path' in row.item}
                <FileIcon path={row.item.path} />
                <span class="label">{base(row.item.path)}</span>
                <span class="dim">{dir(row.item.path)}</span>
              {:else if 'theme' in row.item}
                <span class="label">{row.item.theme.label}</span>
                {#if row.group}<span class="dim group">{row.group} themes</span>{/if}
              {:else}
                <span class="label">{row.item.label}</span>
                {#if row.item.key}<kbd>{row.item.key}</kbd>{/if}
              {/if}
            </li>
          {/if}
        {/each}
      {/if}
    </ul>
  </div>
</div>
