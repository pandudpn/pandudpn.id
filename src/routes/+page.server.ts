import type { PageServerLoad } from './$types';

// Shortcut labels follow the visitor's platform, so the server renders ⌘P for a Mac and Ctrl+P
// for everyone else, and the page doesn't swap labels after it loads.
export const load: PageServerLoad = ({ request }) => ({
  mac: /Mac|iPhone|iPad/.test(request.headers.get('user-agent') ?? ''),
});
