import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			out: 'build',
			precompress: true,
			envPrefix: ''
		}),
		alias: {
			$components: 'src/lib/components',
			$actions: 'src/lib/actions',
			$stores: 'src/lib/stores',
			$data: 'src/lib/data',
			$queries: 'src/lib/queries',
			$types: 'src/lib/types'
		}
	}
};

export default config;
