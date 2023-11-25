import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({
		// Enable SASS/SCSS support
		sass: true,
		scss: {
			// Optionally, you can use the "prependData" option to include common styles
			prependData: `@import 'src/styles/global.scss';`
		},
	}),

	kit: {
		adapter: adapter(),

		// Other kit options...
	}
};

export default config;
