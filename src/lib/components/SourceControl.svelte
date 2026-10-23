<script lang="ts">
  import Icon from './Icon.svelte';
  import { GRAPH, lineOf } from '../engine.ts';
  import { ui, selectCommit, openFile, closeSide } from '../state.svelte.ts';

  // The prototype re-renders classes instead of rows so the focused button keeps keyboard focus;
  // a keyed row that never moves does the same here.
  function onRow(i: number) {
    selectCommit(i);
    openFile('experience.ts', { line: lineOf('experience.ts', GRAPH[i].find), preview: false });
  }
</script>

<section class="view view-scm" aria-labelledby="scm-title">
  <div class="view-title">
    <h2 id="scm-title">Source Control</h2>
    <button type="button" class="icon-btn close-side" onclick={closeSide} aria-label="Close source control">
      <Icon name="close" />
    </button>
  </div>
  <p class="pane-head"><span><Icon name="chevron-down" /></span>Graph</p>
  <ul id="graph" class="graph" aria-label="Career history, newest first">
    {#each GRAPH as c, i (c.msg)}
      <li class:on={i === ui.commit}>
        <button type="button" aria-current={i === ui.commit ? 'true' : undefined} onclick={() => onRow(i)}>
          <span class="node" aria-hidden="true"></span>
          <span class="commit">
            <span class="msg">{c.msg}</span>
            <span class="when">{c.when}{#if i === 0}{' '}<span class="ref">main</span>{/if}</span>
          </span>
        </button>
      </li>
    {/each}
  </ul>
</section>
