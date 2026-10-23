<script lang="ts">
  import { onFileLinkIn, term, ui } from '../state.svelte.ts';
  import { complete, clearTerm, runLine } from '../terminal.ts';

  let box: HTMLDivElement | null = $state(null);
  let input: HTMLInputElement | null = $state(null);
  let value = $state('');
  let hIndex = -1;

  // Keep the newest output in view.
  $effect(() => {
    if (box && term.lines.length) box.scrollTop = box.scrollHeight;
  });

  function keydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const line = value;
      value = '';
      runLine(line);
      if (line.trim()) hIndex = -1;
    } else if (e.key === 'ArrowUp') {
      if (hIndex < term.typed.length - 1) value = term.typed[++hIndex];
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      hIndex = Math.max(-1, hIndex - 1);
      value = hIndex < 0 ? '' : term.typed[hIndex];
      e.preventDefault();
    } else if (e.key === 'Tab' && value.trim()) {
      e.preventDefault();
      value = complete(value);
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      clearTerm();
    }
  }

  // Clicking the output puts the caret back in the prompt, unless the reader is selecting text
  // or followed a link.
  function click(e: MouseEvent) {
    if (!(e.target as Element).closest('a') && !window.getSelection()?.toString()) input?.focus({ preventScroll: true });
  }
</script>

<!-- Mouse only, like the prototype: a click in the output is a convenience that returns the
     caret to the prompt, which keyboard users reach with the input itself. -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div id="term" class="term" hidden={ui.panelTab !== 'terminal'} bind:this={box} onclick={click}>
  <!-- The links inside are real anchors; this only routes their clicks to openFile. -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <div id="term-out" role="log" aria-live="polite" onclick={onFileLinkIn}>
    {#each term.lines as line, i (i)}
      <div class="out {line.cls}">{@html line.html}</div>
    {/each}
  </div>
  <div class="term-line">
    <label class="prompt" id="term-prompt" for="term-in"
      ><span class="t-user">pandu@pandudpn.id</span>:<span class="t-path">~{term.cwd ? '/' + term.cwd : ''}</span>$</label
    >
    <input
      id="term-in"
      bind:this={input}
      bind:value
      type="text"
      autocomplete="off"
      autocapitalize="off"
      spellcheck="false"
      enterkeyhint="send"
      onkeydown={keydown}
    />
  </div>
</div>
