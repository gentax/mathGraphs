<template>
	<div m="x-auto" p="y-12" bg="white" text="center" class="container">
		<div p="x-4 sm:x-6 lg:x-8">
			<h2 text="base indigo-600 uppercase" font="semibold tracking-wide">
				<a href="https://github.com/gentax/mathGraphs">go to github repo</a>
			</h2>
			<p m="t-2" text="3xl gray-900 sm:4xl" font="leading-8 extrabold tracking-tight">Beauty Graphs with math</p>
			<div m="t-10">
				<div space="y-10 md:y-0 md:x-10" grid="md:cols-6" class="md:grid">
					<div m="in-w-in">
						<div shadow="lg" border="rounded-xl">
							<div p="x-2" font="semibold">
								<div
									text="lg base indigo-600 uppercase"
									font="leading-6 medium semibold tracking-wide"
									align="items-center"
									justify="center"
									h="12"
									class="flex"
								>
									<svg
										h="6"
										w="6"
										class="mr-2.5"
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
								<div text="left" divide="solid" font="leading-10">
									<div divide="y light-grey-600">
										<div p="y-1" text="gray-500">
											<label for="sequence">
												sequence
												<input
													id="sequence"
													ref="sequence"
													v-model="sequence"
													w="full"
													flex="none"
													bg="gray-50"
													text="gray-400 hover:gray-900"
													font="mono leading-6"
													p="y-1 x-1"
													border="default gray-100 rounded-sm"
													align="items-center"
													justify="center"
													space="x-2 sm:x-4"
													ring="focus:2 focus:offset-2 focus:offset-white focus:gray-300"
													outline="focus:none"
													transition="colors duration-200"
													class="flex"
												/>
												<small text="gray-300">(try other sequence!)</small>
											</label>
										</div>
										<div p="y-1" text="gray-500">
											<label for="speed">
												drawing speed
												<input
													id="speed"
													ref="speed"
													v-model.number="speed"
													type="number"
													w="full"
													flex="none"
													bg="gray-50"
													text="gray-400 hover:gray-900"
													font="mono leading-6"
													p="y-1 x-1"
													border="default gray-100 rounded-sm"
													align="items-center"
													justify="center"
													space="x-2 sm:x-4"
													ring="focus:2 focus:offset-2 focus:offset-white focus:gray-300"
													outline="focus:none"
													transition="colors duration-200"
													class="flex"
													@change="redraw"
												/>
											</label>
										</div>
										<div p="y-1" text="gray-500">
											<label for="speed">
												Square width
												<input
													id="space"
													ref="space"
													v-model.number="space"
													type="number"
													w="full"
													flex="none"
													bg="gray-50"
													text="gray-400 hover:gray-900"
													font="mono leading-6"
													p="y-1 x-1"
													border="default gray-100 rounded-sm"
													align="items-center"
													justify="center"
													space="x-2 sm:x-4"
													ring="focus:2 focus:offset-2 focus:offset-white focus:gray-300"
													outline="focus:none"
													transition="colors duration-200"
													class="flex"
													@change="redraw"
												/>
											</label>
										</div>
										<div p="y-1" text="gray-500">
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
										<div p="y-1" text="gray-500">
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
								text="center white"
								space="x-2"
								p="2"
								bg="gradient-to-br"
								border="rounded-b-xl"
								font="leading-6 semibold"
								:class="{
									'from-blue-200 to-indigo-500': !finished.status,
									'from-blue-400 to-indigo-700': finished.status,
								}"
							>
								<p text="light-blue-100">
									<span v-if="finished.status">Completed</span>
									<span v-else>Drawing</span>
								</p>
							</div>
						</div>
					</div>

					<div grid="col-span-1 md:col-span-5">
						<Canvas
							:sequence="toArray(sequence)"
							:speed="speed"
							:show-grid="showGrid"
							:color="color"
							:space="space"
							shadow="lg"
							border="rounded-xl"
						></Canvas>
					</div>
				</div>
			</div>
			<div text="left xs" m="t-10" bg="gray-50" border="rounded-3xl" p="2 sm:5 xl:6">
				<h2 font="semibold" text="gray-900 xl">Rules</h2>
				<h3 text="lg" m="t-3">Sequence of numbers</h3>
				<p>
					Cycle thought the sequence of numbers. Each number indicates how many units you need to move.
					Following the direction rules. the There is no limit to the amount of numbers you can use.<br />And
					remember that... odd sequence are better and negative numbers are valid.
				</p>
				<h3 text="lg" m="t-3">Direction</h3>
				<p>
					Direction is a loop: first drawing direction is right, second one is up, third one to left, 4th to
					right. Than, start again.
				</p>
				<h3 text="lg" m="t-3">Goal</h3>
				<p>If the last number of the sequence finish at the starting point, you reached the goal.</p>
			</div>
			<div m="t-5" text="gray-300" font="semibold">©2020 gentax</div>
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
