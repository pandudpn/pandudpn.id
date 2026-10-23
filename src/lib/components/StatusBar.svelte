<script lang="ts">
  import Icon from './Icon.svelte';
  import { LANG, ext } from '../engine.ts';
  import { openQuick, openView, preview, showPanelTab, togglePanel, toggleWrap, ui } from '../state.svelte.ts';

  const lang = $derived(ui.active ? (preview.has(ui.active) ? 'Markdown Preview' : LANG[ext(ui.active)] || 'Plain Text') : '');
  const pos = $derived(ui.active && !preview.has(ui.active) ? `Ln ${ui.cursor}, Col 1` : '');

  function showProblems() {
    showPanelTab('problems');
    togglePanel(true);
  }
</script>

<footer class="status">
  <div class="st-group">
    <button type="button" class="st remote" onclick={() => openQuick('>')} title="Show all commands"><span><Icon name="remote" /></span>pandudpn.id</button>
    <button type="button" class="st" onclick={() => openView('scm')} title="Career history"><span><Icon name="git-branch" /></span>main</button>
    <button type="button" class="st" onclick={showProblems} title="No problems">
      <span><Icon name="error" /></span>0<span><Icon name="warning" /></span>0
    </button>
  </div>
  <div class="st-group">
    <span class="st" id="st-pos">{pos}</span>
    <button type="button" class="st" id="st-wrap" aria-pressed={ui.wrap} onclick={toggleWrap} title="Toggle word wrap (⌥Z)">Wrap</button>
    <span class="st">UTF-8</span>
    <span class="st" id="st-lang">{lang}</span>
    <a class="st" href="mailto:pandu@pandudpn.id"><span><Icon name="mail" /></span>pandu@pandudpn.id</a>
  </div>
</footer>
