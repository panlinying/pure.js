const babel = require('rollup-plugin-babel');
const pkg = require('./package');

const now = new Date();
const banner = `/*!
* Pure.js v${pkg.version}
* ${pkg.repository}
*
* Copyright (c) ${now.getFullYear()} ${pkg.author.name}
* Released under the ${pkg.license} license
*
* Date: ${now.toISOString()}
*/
`;

module.exports = {
	input: 'src/js/pure.js',
	output: [
		{
			file: 'dist/pure.js',
			format: 'umd',
		},
	],
	name: 'Pure',
	// external: ['babel-runtime/core-js/promise' // 'babel-runtime/helpers/asyncToGenerator',
	// 'babel-runtime/core-js/object/assign', 'babel-runtime/core-js/object/keys'],
	// globals: {
	// 	'babel-runtime/core-js/promise': 'promise',
	// 	'babel-runtime/helpers/asyncToGenerator': '_asyncToGenerator',
	// 	'babel-runtime/core-js/object/assign': '_Object$assign',
	// 	'babel-runtime/core-js/object/keys': '_Object$keys',
	// },
	plugins: [
		babel({
			exclude: ['node_modules/**'],
			// externalHelpers: true,
			runtimeHelpers: true,
		}),
	],
	banner,
	acorn: { ecmaVersion: 8 },
};
