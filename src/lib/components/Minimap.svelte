<script lang="ts">
  import { tokenize } from '../engine.ts';

  let { path, editor }: { path: string; editor: HTMLElement | null } = $props();

  // 0.6px per character, leading whitespace as an unstyled gap, exactly as the prototype did.
  const rows = $derived(
    tokenize(path).map((ln) => {
      const segs: { c: string | null; w: number }[] = [];
      for (const t of ln.toks) {
        if (!t.t.length) continue;
        const lead = t.t.match(/^\s*/)?.[0].length ?? 0;
        if (lead) segs.push({ c: null, w: lead });
        if (t.t.length > lead) segs.push({ c: t.c, w: t.t.length - lead });
      }
      return segs;
    }),
  );

  let rowsEl: HTMLElement;
  let slider: HTMLElement;

  // The editor passes itself in, so its scroll and size changes can move the slider here.
  export function sync(): void {
    if (!rowsEl || !slider || !editor) return;
    const h = rowsEl.offsetHeight;
    const ratio = editor.scrollHeight > 0 ? h / editor.scrollHeight : 0;
    slider.style.top = editor.scrollTop * ratio + 'px';
    slider.style.height = Math.max(12, editor.clientHeight * ratio) + 'px';
    slider.hidden = false;
  }

  // Measure as soon as the rows are on screen; after that the observer catches the editor
  // resizing (window, sashes) and the code growing or shrinking (word wrap).
  $effect(() => {
    if (!editor || !rows.length) return;
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(editor);
    if (editor.firstElementChild) ro.observe(editor.firstElementChild);
    return () => ro.disconnect();
  });

  function onclick(e: MouseEvent) {
    if (!rowsEl || !editor) return;
    const y = e.clientY - rowsEl.getBoundingClientRect().top;
    editor.scrollTop = (y / rowsEl.offsetHeight) * editor.scrollHeight - editor.clientHeight / 2;
  }
</script>

<div class="minimap" aria-hidden="true" {onclick}>
  <div class="mm-rows" bind:this={rowsEl}>
    {#each rows as segs, i (i)}
      <div>
        {#each segs as s, j (j)}
          {#if s.c === null}
            <i style:width="{(s.w * 0.6).toFixed(1)}px"></i>
          {:else}
            <b class={s.c || 'tx'} style:width="{(s.w * 0.6).toFixed(1)}px"></b>
          {/if}
        {/each}
      </div>
    {/each}
  </div>
  <div class="mm-slider" bind:this={slider} hidden></div>
</div>
