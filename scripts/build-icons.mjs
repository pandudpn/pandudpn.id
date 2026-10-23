import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dir = 'node_modules/@vscode/codicons/src/icons';
const NAMES = [
  'files', 'search', 'source-control', 'account', 'mail', 'layout-sidebar-left',
  'layout-panel', 'color-mode', 'close', 'chevron-down', 'chevron-right',
  'markdown', 'open-preview', 'go-to-file', 'remote', 'git-branch', 'error',
  'warning', 'terminal', 'trash', 'symbol-string', 'symbol-class', 'symbol-field',
  'symbol-key', 'link-external', 'git-commit', 'info', 'word-wrap',
];

const pick = (name) => {
  const svg = readFileSync(join(dir, name + '.svg'), 'utf8');
  const viewBox = svg.match(/viewBox="([^"]+)"/)[1];
  const body = svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').trim();
  return `  ${JSON.stringify(name)}: [${JSON.stringify(viewBox)}, ${JSON.stringify(body)}],`;
};

const out = `// Codicons by Microsoft, CC BY 4.0. https://github.com/microsoft/vscode-codicons
// Each entry is [viewBox, inner SVG]: some icons are drawn on a 24px grid, the rest on 16px.
export const ICONS: Record<string, [string, string]> = {
${NAMES.map(pick).join('\n')}
};
`;
writeFileSync('src/lib/icons.ts', out);
console.log('wrote src/lib/icons.ts');
