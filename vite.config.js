import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
	resolve: { alias: { '@': '/src' } },
	plugins: [
		Vue({
			include: [/\.vue$/, /\.md$/],
		}),
		WindiCSS(),
	],
})
