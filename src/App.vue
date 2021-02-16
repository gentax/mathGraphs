<template>
	<div class="container mx-auto py-12 bg-white text-center">
		<div class="px-4 sm:px-6 lg:px-8">
			<h2 class="text-base text-indigo-600 font-semibold tracking-wide uppercase">
				<a href="https://github.com/gentax/mathGraphs">go to github repo</a>
			</h2>
			<p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
				Beauty Graphs with math
			</p>
			<div class="mt-10">
				<div class="space-y-10 md:grid md:grid-cols-6 md:space-y-0 md:space-x-10">
					<div class="min-w-min">
						<div class="shadow-lg rounded-xl">
							<div class="px-2 font-semibold">
								<div
									class="text-lg leading-6 font-medium flex items-center justify-center h-12 text-base text-indigo-600 font-semibold tracking-wide uppercase"
								>
									<svg
										class="h-6 w-6 mr-2.5"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
										/>
									</svg>
									Settings
								</div>
								<div class="text-left divide-solid leading-10">
									<div class="divide-y divide-light-grey-600">
										<div class="py-1 text-gray-500">
											<label for="sequence">
												sequence
												<input
													id="sequence"
													ref="sequence"
													v-model="sequence"
													class="w-full flex-none bg-gray-50 text-gray-400 hover:text-gray-900 font-mono leading-6 py-1 px-1 border border-gray-100 rounded-sm flex items-center justify-center space-x-2 sm:space-x-4 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-300 focus:outline-none transition-colors duration-200"
												/>
												<small class="text-gray-300">(try other sequence!)</small>
											</label>
										</div>
										<div class="py-1 text-gray-500">
											<label for="speed">
												drawing speed
												<input
													id="speed"
													ref="speed"
													v-model.number="speed"
													type="number"
													class="w-full flex-none bg-gray-50 text-gray-400 hover:text-gray-900 font-mono leading-6 py-1 px-1 border border-gray-100 rounded-sm flex items-center justify-center space-x-2 sm:space-x-4 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-300 focus:outline-none transition-colors duration-200"
													@change="redraw"
												/>
											</label>
										</div>
										<div class="py-1 text-gray-500">
											<label for="speed">
												Square width
												<input
													id="space"
													ref="space"
													v-model.number="space"
													type="number"
													class="w-full flex-none bg-gray-50 text-gray-400 hover:text-gray-900 font-mono leading-6 py-1 px-1 border border-gray-100 rounded-sm flex items-center justify-center space-x-2 sm:space-x-4 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-300 focus:outline-none transition-colors duration-200"
													@change="redraw"
												/>
											</label>
										</div>
										<div class="py-1 text-gray-500">
											<label for="showGrid">
												show grid
												<input
													id="showGrid"
													ref="showGrid"
													v-model="showGrid"
													type="checkbox"
													@change="redraw"
												/>
											</label>
										</div>
										<div class="py-1 text-gray-500">
											<label for="color">
												multicolor lines
												<input
													id="color"
													ref="color"
													v-model="color"
													type="checkbox"
													@change="redraw"
												/>
											</label>
										</div>
									</div>
								</div>
							</div>
							<div
								class="text-center space-x-2 p-2 bg-gradient-to-br rounded-b-xl leading-6 font-semibold text-white"
								:class="{
									'from-blue-200 to-indigo-500': !finished.status,
									'from-blue-400 to-indigo-700': finished.status,
								}"
							>
								<p class="text-light-blue-100">
									<span v-if="finished.status">Completed</span>
									<span v-else>Drawing</span>
								</p>
							</div>
						</div>
					</div>

					<div class="col-span-1 md:col-span-5">
						<Canvas
							:sequence="toArray(sequence)"
							:speed="speed"
							:show-grid="showGrid"
							:color="color"
							:space="space"
							class="shadow-lg rounded-xl"
						></Canvas>
					</div>
				</div>
			</div>
			<div class="text-left text-xs mt-10 bg-gray-50 rounded-3xl p-2 sm:p-5 xl:p-6">
				<h2 class="font-semibold text-gray-900 text-xl">Rules</h2>
				<h3 class="text-lg mt-3">Sequence of numbers</h3>
				<p class="">
					Cycle thought the sequence of numbers. Each number indicates how many units you need to move.
					Following the direction rules. the There is no limit to the amount of numbers you can use.<br />And
					remember that... odd sequence are better and negative numbers are valid.
				</p>
				<h3 class="text-lg mt-3">Direction</h3>
				<p>
					Direction is a loop: first drawing direction is right, second one is up, third one to left, 4th to
					right. Than, start again.
				</p>
				<h3 class="text-lg mt-3">Goal</h3>
				<p>If the last number of the sequence finish at the starting point, you reached the goal.</p>
			</div>
			<div class="mt-5 text-gray-300 font-semibold">©2020 gentax</div>
		</div>
	</div>
</template>

<script>
import { reactive } from 'vue'
import Canvas from './components/canvas.vue'

export default {
	name: 'App',
	components: {
		Canvas,
	},
	provide() {
		// using provide we can inject objet in childs, let them use it in child and parent components
		// if we set it to be reactive, any changes will be reflected in the app
		return { finished: reactive(this.finished) }
	},
	data() {
		return {
			sequence: '3, 3, 9',
			speed: 400,
			showGrid: true,
			color: true,
			space: 20,
			finished: {
				status: false,
			},
		}
	},
	watch: {
		sequence: function () {
			this.finished.status = false
		},
	},
	methods: {
		toArray(input) {
			return input.replace(/ /g, '').split(',')
		},
		redraw() {
			this.finished.status = false
		},
	},
}
</script>
