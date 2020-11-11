<template>
	<div id="app" class="grid-container">
		<header class="item-1">
			<h1>math beauty graphs</h1>
		</header>

		<div class="item-2">
			<h3>Settings</h3>
			<p>
				<label for="sequence">
					sequence
					<input id="sequence" ref="sequence" v-model="sequence" />
					<br />
					<small>(try other sequence!)</small>
				</label>
			</p>
			<p>
				<label for="speed">
					draw speed
					<input id="speed" ref="speed" v-model.number="speed" type="number" />
				</label>
			</p>
			<p>
				<label for="showGrid">
					show grid
					<input id="showGrid" ref="showGrid" v-model="showGrid" type="checkbox" />
				</label>
			</p>
		</div>

		<div class="item-3">
			<div id="canvas-wrapper">
				<Canvas :sequence="toArray(sequence)" :speed="speed" :show-grid="showGrid"></Canvas>
			</div>
		</div>

		<div class="item-4">©2020 gentax</div>
	</div>
</template>

<script>
import Canvas from './components/canvas.vue'

export default {
	name: 'App',
	components: {
		Canvas,
	},
	data() {
		return {
			sequence: '3, 3, 9',
			speed: 800,
			showGrid: true,
		}
	},
	// Randomly selects a value to randomly increment or decrement every 16 ms.
	// Not really important, just demonstrates that reactivity still works.
	mounted() {
		/*let dir = 1
		let selectedVal = Math.floor(Math.random() * this.chartValues.length)

		setInterval(() => {
			if (Math.random() > 0.995) {
				dir *= -1
			}
			if (Math.random() > 0.99) {
				selectedVal = Math.floor(Math.random() * this.chartValues.length)
			}
			console.log(selectedVal)
			this.chartValues[selectedVal].val = Math.min(
				Math.max(this.chartValues[selectedVal].val + dir * 0.5, 0),
				100
			)
		}, 500)*/
	},
	methods: {
		toArray(input) {
			return input.replace(/ /g, '').split(',')
		},
	},
}
</script>
<style src="./assets/css/style.css"></style>
