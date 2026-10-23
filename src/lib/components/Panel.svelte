<script lang="ts">
  import Icon from './Icon.svelte';
  import Terminal from './Terminal.svelte';
  import { showPanelTab, togglePanel, ui } from '../state.svelte.ts';
  import { clearTerm } from '../terminal.ts';

  function clearAndFocus() {
    clearTerm();
    document.getElementById('term-in')?.focus({ preventScroll: true });
  }
</script>

<section class="panel" id="panel" aria-label="Panel">
  <div class="panel-head">
    <div class="panel-tabs" role="tablist" aria-label="Panel">
      <button
        type="button"
        role="tab"
        class:on={ui.panelTab === 'problems'}
        aria-selected={ui.panelTab === 'problems'}
        onclick={() => showPanelTab('problems')}
      >
        Problems
      </button>
      <button
        type="button"
        role="tab"
        class:on={ui.panelTab === 'terminal'}
        aria-selected={ui.panelTab === 'terminal'}
        onclick={() => showPanelTab('terminal')}
      >
        Terminal
      </button>
    </div>
    <div class="panel-actions">
      <button
        type="button"
        id="term-clear"
        class="icon-btn"
        hidden={ui.panelTab !== 'terminal'}
        onclick={clearAndFocus}
        aria-label="Clear the terminal"
        title="Clear"
      >
        <Icon name="trash" />
      </button>
      <button type="button" class="icon-btn" onclick={() => togglePanel()} aria-label="Close the panel" title="Close Panel">
        <Icon name="close" />
      </button>
    </div>
  </div>
  <div id="problems" class="problems" hidden={ui.panelTab !== 'problems'}>
    <p>No problems have been detected in the workspace.</p>
  </div>
  <Terminal />
</section>
