<script lang="ts">
  import { onMount } from 'svelte';
  import { save, stored, ui } from '../state.svelte.ts';

  // Drag (or use the arrow keys on) the side bar's right edge and the panel's top edge, as in
  // VS Code. Dragging past half the minimum size collapses the part; dragging back brings it back.
  let { part }: { part: 'side' | 'panel' } = $props();

  const horizontal = $derived(part === 'side');
  const min = $derived(horizontal ? 170 : 100);
  const key = $derived(horizontal ? 'sideWidth' : 'panelHeight');
  const open = $derived(horizontal ? ui.side : ui.panel);

  let el: HTMLDivElement;
  // The size asked for, before clamping to the window; null means the stylesheet's default.
  let want: number | null = null;
  let now = $state<number | null>(null);
  let max = $state<number | null>(null);

  const size = () => {
    const target = document.getElementById(part);
    return target ? (horizontal ? target.offsetWidth : target.offsetHeight) : 0;
  };

  function sashMax(): number {
    if (horizontal) return Math.max(min, Math.min(innerWidth * 0.6, innerWidth - 40 - 320));
    const main = document.querySelector<HTMLElement>('.main');
    return Math.max(min, (main?.clientHeight ?? 0) - 35 - 22 - 120);
  }

  const clamp = (v: number) => Math.round(Math.min(sashMax(), Math.max(min, v)));

  // Applies the wanted size, held inside the window.
  function apply() {
    const applied = want === null ? null : clamp(want);
    if (horizontal) ui.sideSize = applied;
    else ui.panelSize = applied;
  }

  function setOpen(next: boolean) {
    if (horizontal) ui.side = next;
    else ui.panel = next;
  }

  // aria-valuenow and aria-valuemax describe the part as laid out: the applied size, or the
  // stylesheet's default as measured.
  function measure(applied: number | null) {
    now = open ? (applied ?? size()) || null : null;
    max = Math.round(sashMax());
  }

  $effect(() => measure(horizontal ? ui.sideSize : ui.panelSize));

  onMount(() => {
    const kept = Number(stored(key, ''));
    want = kept > 0 ? kept : null;
    apply();
    const onResize = () => {
      apply();
      measure(horizontal ? ui.sideSize : ui.panelSize);
    };
    addEventListener('resize', onResize);
    return () => removeEventListener('resize', onResize);
  });

  function onpointerdown(e: PointerEvent) {
    if (e.button !== 0) return;
    e.preventDefault();
    const start = horizontal ? e.clientX : e.clientY;
    const from = open ? size() : 0;
    const before = want;
    el.setPointerCapture(e.pointerId);
    el.classList.add('active');
    document.documentElement.classList.add(horizontal ? 'sash-x' : 'sash-y');
    const move = (ev: PointerEvent) => {
      const delta = (horizontal ? ev.clientX : ev.clientY) - start;
      const next = horizontal ? from + delta : from - delta;
      setOpen(next >= min / 2);
      if (next < min / 2) return;
      want = clamp(next);
      apply();
    };
    const end = () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', end);
      el.removeEventListener('pointercancel', end);
      el.classList.remove('active');
      document.documentElement.classList.remove('sash-x', 'sash-y');
      // Dragged shut: reopening brings back the size it had before this drag.
      if (!open) want = before;
      apply();
      save(key, want === null ? null : String(want));
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', end);
  }

  // Double-click puts the default size back, as in VS Code.
  function ondblclick() {
    want = null;
    apply();
    save(key, null);
  }

  function onkeydown(e: KeyboardEvent) {
    const step = e.shiftKey ? 50 : 10;
    if (e.key === (horizontal ? 'ArrowRight' : 'ArrowUp')) want = clamp(size() + step);
    else if (e.key === (horizontal ? 'ArrowLeft' : 'ArrowDown')) want = clamp(size() - step);
    else if (e.key === 'Home') want = min;
    else if (e.key === 'End') want = clamp(sashMax());
    else if (e.key === 'Enter') want = null;
    else return;
    e.preventDefault();
    apply();
    save(key, want === null ? null : String(want));
  }
</script>

<!-- A focusable separator is a widget (it takes arrow keys), which Svelte's a11y rules don't model. -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex, a11y_no_noninteractive_element_interactions -->
<div
  class="sash sash-{part}"
  id="sash-{part}"
  role="separator"
  aria-orientation={horizontal ? 'vertical' : 'horizontal'}
  aria-controls={part}
  aria-label={horizontal ? 'Resize the side bar' : 'Resize the panel'}
  aria-valuemin={min}
  aria-valuemax={max}
  aria-valuenow={now}
  tabindex="0"
  bind:this={el}
  {onpointerdown}
  {ondblclick}
  {onkeydown}
></div>
