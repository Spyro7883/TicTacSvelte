import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({
		// Enable SASS/SCSS support
		sass: true,
	}),

	kit: {
		adapter: adapter(),

		// Other kit options...
	}
};

export default config;
