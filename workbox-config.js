module.exports = {
	globDirectory: '.',
	globPatterns: [
		'**/*.{css,html,svg,png,js,webp,jpg,ico,json}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};