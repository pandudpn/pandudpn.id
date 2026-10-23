# pandudpn.id revamp: notes

## Brief, as read
Personal site for Pandu Dwi Putra Nugroho, technical lead in Jakarta (Pandu dropped "Platform"). Readers: engineering
managers, recruiters, founders who need a backend lead. One job: get them to write to him.
Constraints from Pandu: Svelte, no backend calls, no Supabase, no nginx config (SSR is fine). Nothing about
his current employer, its products or its clients. Location stays
"Jakarta, Indonesia", no street. No photos (asked mid-build).

## Direction history
1. Dealt `type-only-statement` (Newsreader, newsprint and brass), seed 1934042563. Built, shown,
   rejected by Pandu ("kok jelek ya").
2. Pandu asked for "vscode atau github"; chose **VS Code** over GitHub profile and a hybrid.
   This is the direction now. It is the owner's call, so it outranks the house style where they conflict.
3. App sheet dealt for the rules only, with `--keep palette,type`: `data-terminal` (icon rail,
   1px accent line marks selection, mono as a deliberate style). Tokens come from VS Code, rules
   from the sheet.
4. Pandu asked for an HTML prototype first, approved it, then the Svelte port and deploy.
5. Hosting: no nginx config, SSR fine. The port is SvelteKit 3 with adapter-node; the VM runs the stock
   node:24-alpine image against the uploaded build. The prototype was deleted once the port matched it.
6. Live since 2026-10-23, replacing the SvelteKit + Supabase site in pandudpn/pandudpn.id (Pandu's choice
   of repo).

## Idea
The site is a workspace you can open: the CV is `experience.ts`, the case studies are
`projects/*.md`, the career is the git history, and the terminal answers `whoami`, `grep Kafka`
and `contact`. Live thing: the working terminal and search over every file.

## Dials (antislop)
Reading this as: personal portfolio for engineering hiring managers, in a VS Code workbench
language, dial ENERGY 2 / RHYTHM 1 / MOTION 1. Uniform rhythm is the point of an editor shell.

## Decisions and reasons (R-31)
- Colour: VS Code Dark Modern and Light Modern tokens, dark by default because it is a developer
  workbench, with a working light theme toggle (R-21).
- Accent: VS Code blue #0078d4 (light #005fb8) on the one primary action (Email me), the remote
  status item, the active tab line and the rail marker.
- Type: Cascadia Code for the editor and terminal (they are code surfaces); system UI sans for chrome.
  Editor 12px/18px (VS Code's macOS default, GitHub's code size), terminal 12px/17px, Markdown
  preview 14px. Pandu's own VS Code runs at window.zoomLevel -1 with an 11px editor font, so he reads
  anything larger as oversized. The inspector's tiny-text WARN (60% under 13px) stands for that reason.
- Syntax colours: VS Code Dark+ / Light+. The string colour #ce9178 trips the inspector's
  terracotta rule; kept because it is the editor's own token, passed with `--allow palette-terracotta`.
- Icons: Codicons, VS Code's own set, each with an aria-label or a text label; credited in NOTICE.md.
  Keep each icon's own viewBox: files, source-control and terminal are drawn on a 24px grid, the rest
  on 16px. Forcing 0 0 16 16 on all of them clipped those three, which Pandu reported as "too big".
- Uppercase 11px headers (Explorer, Outline, Terminal): VS Code's own section headers, no extra tracking.
- 1px borders between workbench parts: app-screen rules allow them; a shadow only on the command
  palette, which floats.
- Activity rail: 40px with 20px icons, the same as VS Code's activity bar at zoomLevel -1.
- Phone: rail becomes a bottom bar (Files, Search, History, Terminal); side bar and terminal open as
  sheets; code wraps with the indent kept.
- Themes (Pandu asked for Catppuccin and others): 13 in src/styles/themes.css, picked from a VS Code-style
  Color Theme picker (arrow keys preview, Escape reverts), the title bar button, or `theme` in the terminal.
  Dark Modern stays the default. Catppuccin and Dracula carry violet accents, which the house rules ban;
  they are opt-in at the owner's request and never the default. Every text color passes 4.5:1 in every
  theme: computed in the generator, then measured on 22,295 rendered text elements.
- Markdown opens as the rendered preview by default (Pandu's call); the source is one click away.
  Search hits and the History graph still open the source at the matching line.
- Sashes: side bar (min 170px) and panel (min 100px) resize by drag or arrow keys, collapse past half the
  minimum, reopen at the pre-drag size, persist, and reset on double-click. Hidden on phones.
- History graph: the row paints the hover and selection fill and the lane is drawn above it; the
  selected commit's node is filled, the others hollow.
- experience.ts: `writeups` is a string array; PT Sagara Technology lists Gagas, Bernofarm, Nusarasa
  and BRInvestYuk, newest first. Outline class icons use each theme's own orange (`--sym-class`),
  and every Outline icon reaches 3:1 on rest, hover, selected and focused rows.

## Copy checks
- Every figure is from the CV or portfolio. "Seven years" = CV's "7+ years".
- Removed claims the sources do not make: "most days", "first job", "on Kubernetes since 2019".
- Commit messages in the History view are rephrasings of real roles.

## Settled with the prototype's approval
The "pd" monogram, the WhatsApp number, CV skills kept in skills.json without naming the excluded
employer, the History commit messages and the README opening.
