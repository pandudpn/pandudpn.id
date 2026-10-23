<script lang="ts">
  import Icon from './Icon.svelte';
  import { base, dir, find } from '../engine.ts';
  import FileIcon from './FileIcon.svelte';
  import { openFile, closeSide } from '../state.svelte.ts';

  let q = $state('');
  const groups = $derived(find(q.trim()));
  const total = $derived(groups.reduce((n, g) => n + g.hits.length, 0));

  // The same window `snippet()` uses, split into its three pieces so the match stays real markup.
  function parts(text: string, at: number, len: number) {
    const start = Math.max(0, at - 24);
    return {
      pre: (start > 0 ? '…' : '') + text.slice(start, at).trimStart(),
      hit: text.slice(at, at + len),
      post: text.slice(at + len, at + len + 90),
    };
  }
</script>

<section class="view view-search" aria-labelledby="search-title">
  <div class="view-title">
    <h2 id="search-title">Search</h2>
    <button type="button" class="icon-btn close-side" onclick={closeSide} aria-label="Close search">
      <Icon name="close" />
    </button>
  </div>
  <div class="search-box">
    <label class="sr-only" for="search-input">Search every file</label>
    <input
      id="search-input"
      type="search"
      placeholder="Search"
      autocomplete="off"
      spellcheck="false"
      bind:value={q}
    />
  </div>
  <div id="search-results" aria-live="polite">
    {#if !q.trim()}
      <p class="hint">Search every file in the workspace: try Kafka, Kubernetes or 14M.</p>
    {:else if !total}
      <p class="hint">No results for “{q.trim()}”. Check the spelling, or search a shorter word.</p>
    {:else}
      <p class="count" role="status">
        {total} result{total === 1 ? '' : 's'} in {groups.length} file{groups.length === 1 ? '' : 's'}
      </p>
      {#each groups as g (g.path)}
        <div class="group">
          <p class="ghead">
            <FileIcon path={g.path} /><span class="label">{base(g.path)}</span><span class="dim">{dir(g.path)}</span
            ><span class="badge">{g.hits.length}</span>
          </p>
          <ul>
            {#each g.hits as h (h.line)}
              {@const s = parts(h.text, h.at, q.trim().length)}
              <li>
                <button type="button" onclick={() => openFile(g.path, { line: h.line, preview: false })}
                  >{s.pre}<mark>{s.hit}</mark>{s.post}</button
                >
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    {/if}
  </div>
</section>
