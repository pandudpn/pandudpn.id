import { FILES, GRAPH } from './workspace.ts';

export { FILES, GRAPH };

export type Link = { path?: string; external?: string };

export type Token = { c: string; t: string; link?: Link };
export type TokenLine = { tag?: string; toks: Token[] };

export const PATHS = Object.keys(FILES);
export const EMAIL = 'pandu@pandudpn.id';
export const LINKS = {
  email: 'mailto:' + EMAIL,
  whatsapp: 'https://wa.me/6282122274139',
  linkedin: 'https://www.linkedin.com/in/pandudpn',
  github: 'https://github.com/pandudpn',
};
export const LANG: Record<string, string> = { md: 'Markdown', ts: 'TypeScript', json: 'JSON' };

export const esc = (s: string): string =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export const ext = (p: string): string => p.slice(p.lastIndexOf('.') + 1);
export const base = (p: string): string => p.slice(p.lastIndexOf('/') + 1);
export const dir = (p: string): string => (p.includes('/') ? p.slice(0, p.lastIndexOf('/')) : '');

export const fileLink = (path: string, label: string = path): string =>
  `<a href="#/${esc(path)}" data-open="${esc(path)}">${esc(label)}</a>`;

/* ---------- links between files ---------- */

function resolve(from: string, href: string): Link {
  if (/^(https?:|mailto:)/.test(href)) return { external: href };
  const parts = dir(from) ? dir(from).split('/') : [];
  for (const seg of href.split('/')) {
    if (seg === '..') parts.pop();
    else if (seg && seg !== '.') parts.push(seg);
  }
  const path = parts.join('/');
  return FILES[path] !== undefined ? { path } : { external: href };
}

function linkAttrs(link: Link): string {
  if (link.path) return `href="#/${esc(link.path)}" data-open="${esc(link.path)}"`;
  const external = !link.external!.startsWith('mailto:');
  return `href="${esc(link.external!)}"${external ? ' target="_blank" rel="noopener"' : ''}`;
}

/* ---------- tokenizers: each returns { tag?, toks: [{ c, t, link? }] } ---------- */

function mdInline(s: string, from: string, plainClass = ''): Token[] {
  const out: Token[] = [];
  const re = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|`([^`]+)`/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(s))) {
    if (m.index > last) out.push({ c: plainClass, t: s.slice(last, m.index) });
    if (m[1] !== undefined) {
      const link = resolve(from, m[2]);
      out.push({ c: 'p', t: '[' }, { c: 'lk', t: m[1], link }, { c: 'p', t: '](' }, { c: 'url', t: m[2], link }, { c: 'p', t: ')' });
    } else if (m[3] !== undefined) out.push({ c: 'b', t: m[0] });
    else out.push({ c: 'code', t: m[0] });
    last = re.lastIndex;
  }
  if (last < s.length) out.push({ c: plainClass, t: s.slice(last) });
  return out;
}

function tokMd(line: string, from: string): TokenLine {
  let m: RegExpMatchArray | null;
  if ((m = line.match(/^(#{1,6})\s/))) return { tag: 'h' + m[1].length, toks: [{ c: 'h', t: line }] };
  if ((m = line.match(/^(\s*)([-*]|\d+\.)(\s+)(.*)$/)))
    return { toks: [{ c: '', t: m[1] }, { c: 'li', t: m[2] }, { c: '', t: m[3] }, ...mdInline(m[4], from)] };
  if ((m = line.match(/^(>\s?)(.*)$/))) return { toks: [{ c: 'q', t: m[1] }, ...mdInline(m[2], from, 'q')] };
  return { toks: mdInline(line, from) };
}

const TS_KW = new Set(['export', 'const', 'type', 'let', 'import', 'from', 'as', 'readonly', 'interface', 'true', 'false', 'null', 'undefined']);
const TS_PRIM = new Set(['string', 'number', 'boolean']);

function tokTs(line: string): TokenLine {
  const out: Token[] = [];
  const re = /(\/\/.*$)|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")|(\b\d+(?:\.\d+)?\b)|([A-Za-z_$][\w$]*)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(line))) {
    if (m.index > last) out.push({ c: 'p', t: line.slice(last, m.index) });
    if (m[1]) out.push({ c: 'cmt', t: m[1] });
    else if (m[2]) {
      const inner = m[2].slice(1, -1);
      out.push(FILES[inner] !== undefined ? { c: 'str', t: m[2], link: { path: inner } } : { c: 'str', t: m[2] });
    } else if (m[3]) out.push({ c: 'num', t: m[3] });
    else {
      const w = m[4];
      const rest = line.slice(re.lastIndex);
      let c = 'var';
      if (TS_KW.has(w)) c = 'kw';
      else if (TS_PRIM.has(w) || /^[A-Z]/.test(w)) c = 'type';
      else if (/^\s*\(/.test(rest)) c = 'fn';
      out.push({ c, t: w });
    }
    last = re.lastIndex;
  }
  if (last < line.length) out.push({ c: 'p', t: line.slice(last) });
  return { toks: out };
}

function tokJson(line: string): TokenLine {
  const out: Token[] = [];
  const re = /("(?:[^"\\]|\\.)*")(\s*:)?|(-?\b\d+(?:\.\d+)?\b)|\b(true|false|null)\b/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(line))) {
    if (m.index > last) out.push({ c: 'p', t: line.slice(last, m.index) });
    if (m[1]) {
      out.push({ c: m[2] ? 'var' : 'str', t: m[1] });
      if (m[2]) out.push({ c: 'p', t: m[2] });
    } else if (m[3]) out.push({ c: 'num', t: m[3] });
    else out.push({ c: 'kw', t: m[4]! });
    last = re.lastIndex;
  }
  if (last < line.length) out.push({ c: 'p', t: line.slice(last) });
  return { toks: out };
}

const cache = new Map<string, TokenLine[]>();
export function tokenize(path: string): TokenLine[] {
  const hit = cache.get(path);
  if (hit) return hit;
  const src = FILES[path].replace(/\n$/, '');
  const e = ext(path);
  const fn = (l: string): TokenLine =>
    e === 'md' ? tokMd(l, path) : e === 'ts' ? tokTs(l) : e === 'json' ? tokJson(l) : { toks: [{ c: '', t: l }] };
  const lines = src.split('\n').map(fn);
  cache.set(path, lines);
  return lines;
}

/* ---------- markdown preview ---------- */

function slug(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function inlineHtml(s: string, from: string): string {
  let out = '';
  const re = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|`([^`]+)`/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(s))) {
    out += esc(s.slice(last, m.index));
    if (m[1] !== undefined) out += `<a ${linkAttrs(resolve(from, m[2]))}>${esc(m[1])}</a>`;
    else if (m[3] !== undefined) out += `<strong>${esc(m[3])}</strong>`;
    else out += `<code>${esc(m[4])}</code>`;
    last = re.lastIndex;
  }
  return out + esc(s.slice(last));
}

export function mdToHtml(path: string): string {
  const lines = FILES[path].split('\n');
  const out: string[] = [];
  let i = 0;
  const isBlock = (l: string) => /^(#{1,6}\s|\s*[-*]\s|\s*\d+\.\s|>)/.test(l);
  while (i < lines.length) {
    const l = lines[i];
    let m: RegExpMatchArray | null;
    if (!l.trim()) {
      i++;
    } else if ((m = l.match(/^(#{1,6})\s+(.*)$/))) {
      const n = m[1].length;
      out.push(`<h${n} id="${slug(m[2])}" data-line="${i + 1}">${inlineHtml(m[2], path)}</h${n}>`);
      i++;
    } else if (/^\s*[-*]\s+/.test(l)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) items.push(`<li>${inlineHtml(lines[i++].replace(/^\s*[-*]\s+/, ''), path)}</li>`);
      out.push(`<ul>${items.join('')}</ul>`);
    } else if (/^>/.test(l)) {
      const q: string[] = [];
      while (i < lines.length && /^>/.test(lines[i])) q.push(lines[i++].replace(/^>\s?/, ''));
      out.push(`<blockquote><p>${inlineHtml(q.join(' '), path)}</p></blockquote>`);
    } else {
      const p: string[] = [];
      while (i < lines.length && lines[i].trim() && !isBlock(lines[i])) p.push(lines[i++]);
      out.push(`<p>${inlineHtml(p.join(' '), path)}</p>`);
    }
  }
  return out.join('\n');
}

/* ---------- outline symbols ---------- */

export type Sym = { name: string; depth: number; line: number; kind: string };

export function symbols(path: string): Sym[] {
  const e = ext(path);
  const lines = FILES[path].split('\n');
  const out: Sym[] = [];
  lines.forEach((l, i) => {
    let m: RegExpMatchArray | null;
    if (e === 'md' && (m = l.match(/^(#{1,6})\s+(.*)$/))) out.push({ name: m[2], depth: m[1].length - 1, line: i + 1, kind: 'symbol-string' });
    if (e === 'ts' && (m = l.match(/^(?:export )?(?:const|type) (\w+)/))) out.push({ name: m[1], depth: 0, line: i + 1, kind: 'symbol-class' });
    if (e === 'ts' && (m = l.match(/^\s+(?:company|school): '([^']+)'/))) out.push({ name: m[1], depth: 1, line: i + 1, kind: 'symbol-field' });
    if (e === 'json' && (m = l.match(/^ {2}"([^"]+)":/))) out.push({ name: m[1], depth: 0, line: i + 1, kind: 'symbol-key' });
  });
  return out;
}

/* ---------- search ---------- */

export type Hit = { line: number; text: string; at: number };
export type Group = { path: string; hits: Hit[] };

export function find(q: string): Group[] {
  const needle = q.toLowerCase();
  const groups: Group[] = [];
  if (!needle) return groups;
  for (const path of PATHS) {
    const hits: Hit[] = [];
    FILES[path].split('\n').forEach((text, i) => {
      const at = text.toLowerCase().indexOf(needle);
      if (at >= 0) hits.push({ line: i + 1, text, at });
    });
    if (hits.length) groups.push({ path, hits });
  }
  return groups;
}

export function snippet(text: string, at: number, len: number): string {
  const start = Math.max(0, at - 24);
  const pre = (start > 0 ? '…' : '') + text.slice(start, at).trimStart();
  return `${esc(pre)}<mark>${esc(text.slice(at, at + len))}</mark>${esc(text.slice(at + len, at + len + 90))}`;
}

/* ---------- source control graph ---------- */

export function lineOf(path: string, needle: string): number {
  const i = FILES[path].split('\n').findIndex((l) => l.includes(needle));
  return i < 0 ? 1 : i + 1;
}

/* ---------- themes ---------- */

export type Theme = { id: string; label: string; type: 'light' | 'dark' };

// Light themes first, then dark, each sorted by name, as VS Code's picker lists them. The colors live in themes.css.
export const THEMES: Theme[] = [
  { id: 'catppuccin-latte', label: 'Catppuccin Latte', type: 'light' },
  { id: 'github-light', label: 'GitHub Light', type: 'light' },
  { id: 'light-modern', label: 'Light Modern', type: 'light' },
  { id: 'catppuccin-frappe', label: 'Catppuccin Frappé', type: 'dark' },
  { id: 'catppuccin-macchiato', label: 'Catppuccin Macchiato', type: 'dark' },
  { id: 'catppuccin-mocha', label: 'Catppuccin Mocha', type: 'dark' },
  { id: 'dark-modern', label: 'Dark Modern', type: 'dark' },
  { id: 'dracula', label: 'Dracula', type: 'dark' },
  { id: 'github-dark', label: 'GitHub Dark', type: 'dark' },
  { id: 'gruvbox-dark', label: 'Gruvbox Dark', type: 'dark' },
  { id: 'nord', label: 'Nord', type: 'dark' },
  { id: 'one-dark-pro', label: 'One Dark Pro', type: 'dark' },
  { id: 'tokyo-night', label: 'Tokyo Night', type: 'dark' },
];
const THEME_ALIASES: Record<string, string> = { dark: 'dark-modern', light: 'light-modern' };
export const themeById = (id: string): Theme | undefined => THEMES.find((t) => t.id === (THEME_ALIASES[id] || id));
export const squash = (s: string): string =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');

// An id or alias wins outright; otherwise a name or part of one ("mocha", "frappe").
export function matchThemes(q: string): Theme[] {
  const exact = themeById(q.toLowerCase());
  if (exact) return [exact];
  const n = squash(q);
  const whole = THEMES.filter((t) => squash(t.label) === n);
  if (whole.length) return whole;
  return THEMES.filter((t) => squash(t.label).includes(n) || squash(t.id).includes(n));
}

/* ---------- terminal paths ---------- */

export const HOME = '/home/pandu';
const DIRS = new Set(PATHS.flatMap((p) => p.split('/').slice(0, -1).map((_, i, a) => a.slice(0, i + 1).join('/'))));
export const isDir = (p: string) => p === '' || DIRS.has(p);

// Resolves a typed path against the working directory. ~ and / both mean the workspace root.
export function resolvePath(arg: string, cwd: string): string {
  let rest = arg;
  let parts = cwd ? cwd.split('/') : [];
  if (rest === '~' || rest.startsWith('~/')) {
    parts = [];
    rest = rest.slice(1);
  } else if (rest === HOME || rest.startsWith(HOME + '/')) {
    parts = [];
    rest = rest.slice(HOME.length);
  } else if (rest.startsWith('/')) {
    parts = [];
  }
  for (const seg of rest.split('/')) {
    if (!seg || seg === '.') continue;
    if (seg === '..') parts.pop();
    else parts.push(seg);
  }
  return parts.join('/');
}

// The immediate children of a directory: folders first, then files.
export type Entry = { name: string; dir: boolean; path: string };

export function entries(d: string): Entry[] {
  const pre = d ? d + '/' : '';
  const seen = new Map<string, Entry>();
  for (const p of PATHS) {
    if (!p.startsWith(pre)) continue;
    const rest = p.slice(pre.length);
    const name = rest.split('/')[0];
    if (!seen.has(name)) seen.set(name, { name, dir: rest.includes('/'), path: pre + name });
  }
  return [...seen.values()].sort((a, b) =>
    a.dir === b.dir ? a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }) : a.dir ? -1 : 1,
  );
}

// A file named in a command: a path from the working directory, or a bare name anywhere ("open klikoo").
export function pathArg(arg: string, cwd: string): string | null {
  if (!arg) return null;
  const p = resolvePath(arg, cwd);
  if (FILES[p] !== undefined) return p;
  if (arg.includes('/')) return null;
  const a = arg.toLowerCase();
  return PATHS.find((x) => base(x).toLowerCase() === a || base(x).toLowerCase() === a + '.md') || null;
}

export const promptHtml = (cwd: string): string =>
  `<span class="t-user">pandu@pandudpn.id</span>:<span class="t-path">~${cwd ? '/' + esc(cwd) : ''}</span>$`;

/* ---------- quick open ---------- */

export function fuzzy(text: string, q: string): boolean {
  let i = 0;
  const t = text.toLowerCase();
  for (const ch of q.toLowerCase()) {
    i = t.indexOf(ch, i);
    if (i < 0) return false;
    i++;
  }
  return true;
}

export function commonPrefix(list: string[]): string {
  let pre = list[0];
  for (const s of list) while (!s.startsWith(pre)) pre = pre.slice(0, -1);
  return pre;
}
