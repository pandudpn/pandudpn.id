// The terminal's commands, working against the shared `term` state at call time so the UI
// (which renders `term.lines`) stays in sync. Logic that is pure lives in engine.ts.
import {
  EMAIL,
  FILES,
  HOME,
  LINKS,
  PATHS,
  THEMES,
  base,
  commonPrefix,
  entries,
  esc,
  fileLink,
  find,
  isDir,
  matchThemes,
  pathArg,
  promptHtml,
  resolvePath,
  snippet,
} from './engine.ts';
import { openFile, setTheme, term, ui } from './state.svelte.ts';

const print = (html: string, cls = '') => {
  term.lines.push({ html, cls });
};

const COMMANDS: Record<string, { args?: string; about: string; run(args: string[]): void }> = {
  help: {
    about: 'this list',
    run() {
      print(
        Object.entries(COMMANDS)
          .map(([name, c]) => `<span class="t-cmd">${esc((name + ' ' + (c.args || '')).padEnd(20))}</span>${esc(c.about)}`)
          .join('\n'),
      );
    },
  },
  whoami: {
    about: 'who I am, in three lines',
    run() {
      print(
        'Pandu Dwi Putra Nugroho\nTechnical lead, Jakarta, Indonesia\nBuilding Go backends since 2019: telco, payments, waste management',
      );
    },
  },
  ls: {
    args: '[dir]',
    about: 'list files',
    run(args) {
      const arg = args.find((a) => !a.startsWith('-'));
      const target = arg === undefined ? term.cwd : resolvePath(arg, term.cwd);
      if (FILES[target] !== undefined) return print(fileLink(target, arg!));
      if (!isDir(target)) return print(`ls: cannot access '${esc(arg!)}': No such file or directory`, 't-err');
      print(entries(target).map((e) => (e.dir ? `<span class="t-dir">${esc(e.name)}/</span>` : fileLink(e.path, e.name))).join('  '));
    },
  },
  cd: {
    args: '[dir]',
    about: 'change directory',
    run([arg]) {
      const target = arg === undefined ? '' : resolvePath(arg, term.cwd);
      if (FILES[target] !== undefined) return print(`cd: ${esc(arg)}: Not a directory`, 't-err');
      if (!isDir(target)) return print(`cd: ${esc(arg)}: No such file or directory`, 't-err');
      term.cwd = target;
    },
  },
  pwd: {
    about: 'print the working directory',
    run() {
      print(esc(HOME + (term.cwd ? '/' + term.cwd : '')));
    },
  },
  cat: {
    args: '<file>',
    about: 'print a file',
    run([arg]) {
      if (!arg) return print('usage: cat &lt;file&gt;, for example: cat README.md', 't-err');
      if (isDir(resolvePath(arg, term.cwd))) return print(`cat: ${esc(arg)}: Is a directory`, 't-err');
      const p = pathArg(arg, term.cwd);
      if (!p) return print(`cat: ${esc(arg)}: No such file. Run ls to see the files.`, 't-err');
      print(esc(FILES[p].replace(/\n$/, '')));
    },
  },
  open: {
    args: '<file>',
    about: 'open a file in the editor',
    run([arg]) {
      if (!arg) return print('usage: open &lt;file&gt;, for example: open klikoo', 't-err');
      if (isDir(resolvePath(arg, term.cwd)))
        return print(`open: ${esc(arg)}: Is a directory. Run ls ${esc(arg)} to see what's in it.`, 't-err');
      const p = pathArg(arg, term.cwd);
      if (!p) return print(`open: ${esc(arg)}: No such file. Run ls projects to see the write-ups.`, 't-err');
      openFile(p);
      print(`Opened ${fileLink(p)}`);
    },
  },
  grep: {
    args: '<text>',
    about: 'search every file',
    run(args) {
      const q = args.join(' ');
      if (!q) return print('usage: grep &lt;text&gt;, for example: grep Kafka', 't-err');
      const groups = find(q);
      if (!groups.length) return print(`No matches for “${esc(q)}”.`);
      const lines = [];
      for (const g of groups)
        for (const h of g.hits.slice(0, 6))
          lines.push(
            `<a href="#/${esc(g.path)}" data-open="${esc(g.path)}" data-line="${h.line}" data-source="1">${esc(g.path)}:${h.line}</a>: ${snippet(
              h.text.trim(),
              h.text.trim().toLowerCase().indexOf(q.toLowerCase()),
              q.length,
            )}`,
          );
      print(lines.join('\n'));
    },
  },
  experience: {
    about: 'roles, newest first',
    run() {
      const src = FILES['experience.ts'];
      const roles = [...src.matchAll(/company: '([^']+)',\n\s+title: '([^']+)',\n\s+period: \['([^']+)', '([^']+)'\]/g)];
      print(
        roles
          .map((m) => `<span class="t-dim">${esc(`${m[3]}–${m[4]}`.padEnd(19))}</span>${esc(m[2])}, ${esc(m[1])}`)
          .join('\n') + `\n\nThe details are in ${fileLink('experience.ts')}.`,
      );
    },
  },
  skills: {
    about: 'what I work with',
    run() {
      const s = JSON.parse(FILES['skills.json']) as Record<string, string[]>;
      print(
        Object.entries(s)
          .map(([k, v]) => `<span class="t-cmd">${esc(k.padEnd(16))}</span>${esc(v.join(', '))}`)
          .join('\n'),
      );
    },
  },
  contact: {
    about: 'how to reach me',
    run() {
      print(
        [
          `email      <a href="${LINKS.email}">${EMAIL}</a>`,
          `whatsapp   <a href="${LINKS.whatsapp}" target="_blank" rel="noopener">+62 821 2227 4139</a>`,
          `linkedin   <a href="${LINKS.linkedin}" target="_blank" rel="noopener">linkedin.com/in/pandudpn</a>`,
          `github     <a href="${LINKS.github}" target="_blank" rel="noopener">github.com/pandudpn</a>`,
        ].join('\n'),
      );
    },
  },
  email: {
    about: 'write me an email',
    run() {
      print(`Opening your mail app for ${EMAIL}…`);
      location.href = LINKS.email;
    },
  },
  theme: {
    args: '[name]',
    about: 'list or switch color themes',
    run(args) {
      const q = args.join(' ');
      if (!q) {
        print(
          THEMES.map((t) => `${t.id === ui.theme ? '*' : ' '} <span class="t-cmd">${esc(t.id.padEnd(22))}</span>${esc(t.label)}`).join('\n') +
            '\n\nSwitch with theme &lt;name&gt;, for example: theme catppuccin-mocha',
        );
        return;
      }
      const hits = matchThemes(q);
      if (hits.length === 1) return print(`Theme: ${esc(setTheme(hits[0].id)!.label)}`);
      if (hits.length > 1) return print(`“${esc(q)}” matches ${hits.map((t) => esc(t.id)).join(', ')}. Pick one.`);
      print(`theme: ${esc(q)}: no such theme. Run theme to see the list.`, 't-err');
    },
  },
  clear: {
    about: 'clear the terminal',
    run() {
      clearTerm();
    },
  },
};

/** Clears the output. `term.lines` is a reactive proxy, so truncating in place keeps it. */
export function clearTerm(): void {
  term.lines.splice(0);
}

/** Runs one typed line: the echo with the prompt, then the command. */
export function runLine(line: string): void {
  print(`${promptHtml(term.cwd)} ${esc(line)}`, 't-echo');
  const [cmd, ...args] = line.trim().split(/\s+/);
  if (!cmd) return;
  term.typed.unshift(line);
  const c = COMMANDS[cmd.toLowerCase()];
  if (c) c.run(args);
  else print(`command not found: ${esc(cmd)}. Type help to see what you can run.`, 't-err');
}

// Tab completion: commands, then theme names or paths from the working directory.
export function complete(value: string): string {
  const parts = value.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const last = parts[parts.length - 1];
  let options: string[];
  if (parts.length === 1) {
    options = Object.keys(COMMANDS)
      .filter((c) => c.startsWith(last.toLowerCase()))
      .map((c) => c + ' ');
  } else if (cmd === 'theme') {
    options = THEMES.map((t) => t.id)
      .filter((id) => id.startsWith(last.toLowerCase()))
      .map((id) => id + ' ');
  } else {
    const cut = last.lastIndexOf('/') + 1;
    const head = last.slice(0, cut);
    const tail = last.slice(cut).toLowerCase();
    const d = resolvePath(head || '.', term.cwd);
    options = isDir(d)
      ? entries(d)
          .filter((e) => (cmd !== 'cd' || e.dir) && e.name.toLowerCase().startsWith(tail))
          .map((e) => head + e.name + (e.dir ? '/' : ' '))
      : [];
    // open and cat also take a bare file name from anywhere in the workspace
    if (!options.length && !head && cmd !== 'cd' && cmd !== 'ls')
      options = PATHS.filter((p) => base(p).toLowerCase().startsWith(tail)).map((p) => (term.cwd ? '~/' : '') + p + ' ');
  }
  if (!options.length) return value;
  const pre = commonPrefix(options);
  if (pre.length > last.length) {
    parts[parts.length - 1] = pre;
    return parts.join(' ');
  }
  print(options.map((o) => esc(o.trim())).join('  '), 't-dim');
  return value;
}
