// The workbench's state and every action that changes it. Components read `ui`, `preview`,
// `collapsed` and `term`, and change them through these functions, so the rules from the
// prototype (Markdown opens as a preview, phones show one sheet at a time, focus moves to the
// part that opened) live in one place.
//
// The server renders these defaults for every request and never changes them. Anything that
// depends on the browser (stored settings, the phone layout, the hash) is applied in
// `startInBrowser`, which the workbench calls on mount.
import { getContext, setContext, tick } from 'svelte';
import { SvelteSet } from 'svelte/reactivity';
import { goto } from '$app/navigation';
import { FILES, ext, themeById, type Theme } from './engine.ts';

export type View = 'explorer' | 'search' | 'scm';
export type PanelTab = 'problems' | 'terminal';
export type OpenOptions = { line?: number; preview?: boolean };
export type TermLine = { html: string; cls: string };

export const ui = $state({
  /** Open editors, in tab order. */
  open: ['README.md', 'experience.ts'],
  active: 'README.md' as string | null,
  /** 1-based line of the cursor in the code view. */
  cursor: 1,
  /** Set by `revealLine`; the editor scrolls to it once `path` is on screen. */
  reveal: null as { path: string; line: number; seq: number } | null,
  wrap: true,
  view: 'explorer' as View,
  side: true,
  panel: true,
  panelTab: 'terminal' as PanelTab,
  outlineOpen: true,
  /** Selected row in the Source Control graph. */
  commit: 0,
  /** The saved theme. The theme picker previews others without touching this. */
  theme: 'dark-modern',
  phone: false,
  /** Quick open, or null when closed. `value` is the text the input starts with. */
  quick: null as { mode: 'files' | 'themes'; value: string } | null,
  /** Side bar width and panel height in px, or null for the stylesheet's defaults. */
  sideSize: null as number | null,
  panelSize: null as number | null,
});

/** Markdown files shown as the rendered preview rather than the source. */
export const preview = new SvelteSet<string>(['README.md']);
/** Folded explorer folders. */
export const collapsed = new SvelteSet<string>();

export const term = $state({
  cwd: '',
  /** Commands typed so far, newest first. */
  typed: [] as string[],
  lines: [{ html: 'Type <span class="t-cmd">help</span> to see what you can run here.', cls: 't-dim' }] as TermLine[],
});

/* ---------- shortcut labels ---------- */

export type Keys = {
  mac: boolean;
  /** Prefix for single-key shortcuts: ⌘P or Ctrl+P. */
  mod: string;
  palette: string;
  preview: string;
};

const KEYS = Symbol('keys');

/** Called once by the workbench. The server works out `mac` from the user agent, so the page
 *  arrives with the right labels: ⌘P on a Mac, Ctrl+P elsewhere. */
export function provideKeys(mac: () => boolean): Keys {
  return setContext(KEYS, {
    get mac() {
      return mac();
    },
    get mod() {
      return mac() ? '⌘' : 'Ctrl+';
    },
    get palette() {
      return mac() ? '⇧⌘P' : 'Ctrl+Shift+P';
    },
    get preview() {
      return mac() ? '⇧⌘V' : 'Ctrl+Shift+V';
    },
  });
}

export const useKeys = (): Keys => getContext<Keys>(KEYS);

/* ---------- stored settings ---------- */

export function stored(key: string, fallback: string): string {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

export function save(key: string, value: string | null): void {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
    /* private mode: the choice lasts this visit only */
  }
}

/* ---------- editors ---------- */

// Keeps the address bar on the open file without adding history entries, as the prototype did.
function setHash(path: string | null) {
  if (location.hash === (path ? '#/' + path : '')) return;
  void goto(path ? '#/' + path : location.pathname, { shallow: true, replace: true });
}

export function openFile(path: string, { line, preview: asPreview }: OpenOptions = {}): boolean {
  if (FILES[path] === undefined) return false;
  const fresh = !ui.open.includes(path);
  if (fresh) ui.open.splice(ui.open.indexOf(ui.active ?? '') + 1, 0, path);
  ui.active = path;
  // A newly opened Markdown file shows its preview; an open tab keeps the mode it's in.
  if (asPreview === true || (asPreview === undefined && fresh && ext(path) === 'md')) preview.add(path);
  if (asPreview === false) preview.delete(path);
  ui.cursor = line || 1;
  if (ui.phone) ui.side = false;
  setHash(path);
  if (line) revealLine(line);
  return true;
}

export function closeFile(path: string): void {
  const i = ui.open.indexOf(path);
  if (i < 0) return;
  ui.open.splice(i, 1);
  preview.delete(path);
  if (ui.active === path) {
    ui.active = ui.open[Math.min(i, ui.open.length - 1)] ?? null;
    ui.cursor = 1;
    setHash(ui.active);
  }
}

let revealSeq = 0;

/** Scrolls the active editor to a line: a third of the way down in the code view with a flash,
 *  or the heading that starts on that line to the top of the preview. */
export function revealLine(line: number): void {
  if (!ui.active) return;
  if (!preview.has(ui.active)) ui.cursor = line;
  ui.reveal = { path: ui.active, line, seq: ++revealSeq };
}

export function togglePreview(): void {
  const p = ui.active;
  if (!p || ext(p) !== 'md') return;
  if (preview.has(p)) preview.delete(p);
  else preview.add(p);
}

/** Click handler for a link to a workspace file. A modified click (new tab, new window) is left
 *  to the browser, which opens the `#/path` deep link. */
export function onFileLink(e: MouseEvent, path: string, opts?: OpenOptions): void {
  if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  e.preventDefault();
  openFile(path, opts);
}

/** The same for HTML built as a string (the Markdown preview, terminal output). File links there
 *  carry `data-open`, plus `data-line` and `data-source` when they point into the source, like
 *  grep's results. Put it on the container. */
export function onFileLinkIn(e: MouseEvent): void {
  const a = (e.target as Element).closest<HTMLElement>('a[data-open]');
  if (!a) return;
  const { open, line, source } = a.dataset;
  onFileLink(e, open!, { line: line ? Number(line) : undefined, preview: source ? false : undefined });
}

/* ---------- side bar and panel ---------- */

/** The activity bar: a click on the open view closes the side bar. */
export function showView(view: View): void {
  if (ui.side && ui.view === view) {
    ui.side = false;
  } else {
    ui.view = view;
    ui.side = true;
    if (ui.phone) ui.panel = false;
  }
  if (ui.side && view === 'search') void tick().then(() => document.getElementById('search-input')?.focus());
}

/** Opens a view without the toggle, for the status bar's branch button. */
export function openView(view: View): void {
  ui.view = view;
  ui.side = true;
  if (ui.phone) ui.panel = false;
}

export function toggleSide(): void {
  ui.side = !ui.side;
  if (ui.side && ui.phone) ui.panel = false;
}

export function closeSide(): void {
  ui.side = false;
}

export function togglePanel(force?: boolean): void {
  ui.panel = typeof force === 'boolean' ? force : !ui.panel;
  if (ui.panel && ui.phone) ui.side = false;
  if (ui.panel && ui.panelTab === 'terminal') void tick().then(() => document.getElementById('term-in')?.focus({ preventScroll: true }));
}

export function showPanelTab(tab: PanelTab): void {
  ui.panelTab = tab;
  ui.panel = true;
}

/** Escape on a phone closes whichever sheet is open. */
export function closeSheets(): boolean {
  if (!ui.phone || ui.quick || !(ui.side || ui.panel)) return false;
  ui.side = false;
  ui.panel = false;
  return true;
}

export function toggleWrap(): void {
  ui.wrap = !ui.wrap;
  save('wrap', ui.wrap ? 'on' : 'off');
}

export function toggleFolder(dir: string): void {
  if (collapsed.has(dir)) collapsed.delete(dir);
  else collapsed.add(dir);
}

export function toggleOutline(): void {
  ui.outlineOpen = !ui.outlineOpen;
}

export function selectCommit(i: number): void {
  ui.commit = i;
}

/* ---------- color themes ---------- */

/** Paints a theme without saving it: the picker's preview. */
export function applyTheme(id: string): void {
  const root = document.documentElement;
  root.dataset.theme = id;
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (meta) meta.content = getComputedStyle(root).getPropertyValue('--chrome').trim();
}

export function setTheme(id: string): Theme | null {
  const t = themeById(id);
  if (!t) return null;
  ui.theme = t.id;
  save('theme', t.id);
  save(t.type === 'light' ? 'lightTheme' : 'darkTheme', t.id);
  applyTheme(t.id);
  return t;
}

/** Swaps between the last light and the last dark theme used. */
export function toggleLightDark(): Theme | null {
  const light = themeById(ui.theme)!.type === 'light';
  const next = themeById(stored(light ? 'darkTheme' : 'lightTheme', ''));
  return setTheme(next ? next.id : light ? 'dark-modern' : 'light-modern');
}

/* ---------- quick open ---------- */

// Where focus goes back to when quick open closes.
let quickBack: HTMLElement | null = null;

/** Go to File (⌘P), or the command palette when `value` starts with `>`. */
export function openQuick(value = '', back = document.activeElement as HTMLElement | null): void {
  // Pressing ⌘P with quick open already up keeps the original place to return to.
  if (!ui.quick) quickBack = back;
  ui.quick = { mode: 'files', value };
}

/** VS Code's color theme picker: arrows preview, Enter keeps, Escape puts the saved theme back. */
export function openThemePicker(back = document.activeElement as HTMLElement | null): void {
  if (!ui.quick) quickBack = back;
  ui.quick = { mode: 'themes', value: '' };
}

/** Closes quick open, putting back the saved theme if the picker was previewing another.
 *  Returns the element focus came from, which it refocuses unless `refocus` is false. */
export function closeQuick(refocus = true): HTMLElement | null {
  if (ui.quick?.mode === 'themes') applyTheme(ui.theme);
  ui.quick = null;
  const back = quickBack;
  quickBack = null;
  if (refocus) back?.focus();
  return back;
}

/* ---------- start ---------- */

/** Applies what only the browser knows. Returns a cleanup function. */
export function startInBrowser(): () => void {
  // The inline script in app.html already painted the stored theme; take it from there.
  ui.theme = (themeById(document.documentElement.dataset.theme ?? '') ?? themeById('dark-modern')!).id;
  applyTheme(ui.theme);
  ui.wrap = stored('wrap', 'on') === 'on';

  const phone = matchMedia('(max-width: 760px)');
  const layout = () => {
    ui.phone = phone.matches;
    ui.side = !phone.matches;
    ui.panel = !phone.matches;
  };
  layout();
  phone.addEventListener('change', layout);

  const start = decodeURIComponent(location.hash.replace(/^#\/?/, ''));
  if (start && FILES[start] !== undefined) {
    if (!ui.open.includes(start)) {
      ui.open.push(start);
      if (ext(start) === 'md') preview.add(start);
    }
    ui.active = start;
  }

  void tick().then(() => document.documentElement.classList.add('hydrated'));
  return () => phone.removeEventListener('change', layout);
}

/** A hash typed into the address bar, or a link someone followed, opens that file. */
export function openFromHash(): void {
  const p = decodeURIComponent(location.hash.replace(/^#\/?/, ''));
  if (p && FILES[p] !== undefined && p !== ui.active) openFile(p);
}
