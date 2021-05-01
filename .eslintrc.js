module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
		'plugin:vue/recommended',
		'plugin:prettier/recommended',
	],
	// required to lint *.vue files
	plugins: ['vue'],
	// add your custom rules here
	rules: {
		/**********************/
		/* General Code Rules */
		/**********************/

		// Enforce import order
		'import/order': 'error',

		// Imports should come first
		'import/first': 'error',

		// Other import rules
		'import/no-mutable-exports': 'error',

		// Allow unresolved imports
		'import/no-unresolved': 'off',

		// Allow async-await
		'generator-star-spacing': 'off',

		// Allow debugger during development
		'no-debugger': process.env.NODE_ENV === 'production' ? 1 : 0,
		'no-console': process.env.NODE_ENV === 'production' ? 1 : 0,

		// Prefer const over let
		'prefer-const': [
			'error',
			{
				destructuring: 'any',
				ignoreReadBeforeAssign: false,
			},
		],

		// No single if in an 'else' block
		'no-lonely-if': 'error',

		// Force curly braces for control flow,
		// including if blocks with a single statement
		curly: ['error', 'all'],

		// No async function without await
		'require-await': 'error',

		// Force dot notation when possible
		'dot-notation': 'error',

		// require let or const instead of var
		'no-var': 'error',

		// No useless destructuring/importing/exporting renames
		'no-useless-rename': 'error',

		// Force object shorthand where possible
		'object-shorthand': ['off', 'consistent'],

		// Disallow use of Object.prototypes builtins directly
		'no-prototype-builtins': 'off',

		// Disallow Unused Variable
		'no-unused-vars': 'warn',

		// Disallow unnecessary escape usage
		'no-useless-escape': 'off',

		'vue/mustache-interpolation-spacing': ['warn', 'always'],

		/**********************/
		/*     Vue Rules      */
		/**********************/

		// Disable template errors regarding invalid end tags
		'vue/no-parsing-error': [
			'error',
			{
				'x-invalid-end-tag': false,
			},
		],

		// Maximum 5 attributes per line instead of one
		// enforce the maximum number of attributes per line
		'vue/max-attributes-per-line': 'off',

		'vue/html-self-closing': [
			'error',
			{
				html: {
					void: 'any',
					normal: 'any',
					component: 'any',
				},
				svg: 'always',
				math: 'always',
			},
		],

		//require a line break before and after the contents of a singleline element
		'vue/singleline-html-element-content-newline': 'off',

		// enforce tabs in template
		'vue/html-indent': ['error', 'tab'],

		// enforce tabs in script and js files
		indent: ['error', 'tab'],
	},
}
