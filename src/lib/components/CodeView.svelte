<script lang="ts">
  import { tokenize, type Token, type TokenLine } from '../engine.ts';
  import { onFileLink, ui } from '../state.svelte.ts';

  // `flash` is the line to highlight briefly after a reveal; 0 for none.
  let { path, flash = 0 }: { path: string; flash?: number } = $props();

  const lines: TokenLine[] = $derived(tokenize(path));

  function indentOf(ln: TokenLine): number {
    const raw = ln.toks.map((t) => t.t).join('');
    return raw.length - raw.trimStart().length;
  }

  // The prototype's editor rows are deliberately mouse-only: clicking a code line just moves
  // the cursor there.
  function clickLine(e: MouseEvent, n: number) {
    if ((e.target as Element).closest('a')) return;
    ui.cursor = n;
  }
</script>

{#snippet toks(list: Token[])}
  {#each list as t, j (j)}
    {#if t.link?.path}
      <a class={t.c || undefined} href="#/{t.link.path}" onclick={(e) => onFileLink(e, t.link!.path!)}>{t.t}</a>
    {:else if t.link?.external}
      {@const external = !t.link.external.startsWith('mailto:')}
      <a class={t.c || undefined} href={t.link.external} target={external ? '_blank' : undefined} rel={external ? 'noopener' : undefined}>{t.t}</a>
    {:else if t.c}
      <span class={t.c}>{t.t}</span>
    {:else}
      {t.t}
    {/if}
  {/each}
{/snippet}

<div class="lines" aria-label={path}>
  {#each lines as ln, i (i + 1)}
    <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
    <div class="l" class:cur={i + 1 === ui.cursor} class:flash={i + 1 === flash} data-n={i + 1} onclick={(e) => clickLine(e, i + 1)}>
      <span class="n" aria-hidden="true">{i + 1}</span>
      <span class="t" style:--i={indentOf(ln)}>
        {#if ln.tag}
          <svelte:element this={ln.tag} class="hd">{@render toks(ln.toks)}</svelte:element>
        {:else if ln.toks.length === 0}
          {' '}
        {:else}
          {@render toks(ln.toks)}
        {/if}
      </span>
    </div>
  {/each}
</div>
