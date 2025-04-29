module.exports = {
    content: [
        './frontend/srcs/**/*.{html,js,ts}', // Indique à Tailwind où trouver tes fichiers
    ],
    theme: {
        extend: {
			fontFamily: {
				'press-start': ['Press Start 2P', 'cursive'],
			}
		},
    },
    plugins: [],
	corePlugins: {
		preflight: false,
	}
}
