import Vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'

export default {
	plugins: [
		Vue({
			include: [/\.vue$/, /\.md$/],
		}),
		...WindiCSS({
			safelist: 'shadow shadow-xl',
		}),
	],
}
