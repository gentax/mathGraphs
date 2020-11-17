<template>
	<canvas id="my-canvas" ref="my-canvas"></canvas>
</template>

<script>
export default {
	name: 'Canvas',
	// Allows any child component to `inject: ['provider']` and have access to it.
	provide() {
		return {
			provider: this.provider,
		}
	},
	props: {
		sequence: {
			type: Array,
			default: () => [5, 2, 5],
		},
		speed: {
			type: Number,
			default: () => 0,
		},
		showGrid: {
			type: Boolean,
			default: () => true,
		},
		color: {
			type: Boolean,
			default: () => true,
		},
	},
	data() {
		return {
			// By creating the provider in the data property, it becomes reactive,
			// so child components will update when `context` changes.
			provider: {
				// This is the CanvasRenderingContext that children will draw to.
				context: null,
			},
			space: 20,
			sequenceIndex: 0,
			startPointH: 260,
			startPointV: 260,
			currentPositionH: 260,
			currentPositionV: 260,
			movement: ['right', 'up', 'left', 'down'],
			movementIndex: -1,
			drawInterval: null,
			strokeColors: ['#222', 'purple', 'green', '#F60', 'red', '#00F'],
		}
	},
	mounted() {
		// We can't access the rendering context until the canvas is mounted to the DOM.
		// Once we have it, provide it to all child components.
		this.provider.context = this.$refs['my-canvas'].getContext('2d')

		this.startUp()
	},
	updated: function () {
		clearInterval(this.drawInterval)
		this.startUp()
	},
	methods: {
		startUp: function () {
			// Resize the canvas to fit its parent's width.
			// Normally you'd use a more flexible resize system.
			this.$refs['my-canvas'].width = this.$refs['my-canvas'].parentElement.clientWidth || 520
			this.$refs['my-canvas'].height = this.$refs['my-canvas'].parentElement.clientHeight || 520

			// clear rect, useful if we update the code
			this.provider.context.clearRect(
				0,
				0,
				this.$refs['my-canvas'].parentElement.clientWidth,
				this.$refs['my-canvas'].parentElement.clientHeight
			)

			// start/restart the sequence from the beginning
			this.sequenceIndex = 0
			this.movementIndex = -1

			// set the starting point and the current position
			this.startPointH = this.$refs['my-canvas'].parentElement.clientWidth / 2
			this.startPointV = this.$refs['my-canvas'].parentElement.clientHeight / 2
			this.currentPositionH = this.startPointH
			this.currentPositionV = this.startPointV

			// if checked, draw the grid
			if (this.showGrid) {
				this.createGrid(this.provider.context)
			}

			// choose a random color
			if (this.color) {
				this.changeColor(this.provider.context)
			} else {
				this.provider.context.strokeStyle = '#222'
			}

			// set the starting point and ... let's start!
			this.startPoint(this.provider.context)
			this.startInterval()
		},
		startInterval() {
			this.drawInterval = setInterval(() => {
				this.drawLine(this.provider.context, this.nextDirection())
				this.checkEnd()
				this.checkIndex()
			}, this.speed)
		},
		startPoint(ctx) {
			// draw a small square at the starting point
			ctx.fillStyle = 'red'
			ctx.fillRect(this.startPointH - 5, this.startPointV - 5, 10, 10)
			ctx.moveTo(this.startPointH, this.startPointV)
		},
		drawLine(ctx, direction) {
			ctx.beginPath()
			ctx.moveTo(this.currentPositionH, this.currentPositionV)
			this.move(direction)
			ctx.lineTo(this.currentPositionH, this.currentPositionV)
			ctx.stroke()
		},
		changeColor(ctx) {
			ctx.strokeStyle = this.strokeColors[Math.floor(Math.random() * this.strokeColors.length)]
		},
		nextDirection() {
			this.movementIndex++
			if (this.movementIndex === this.movement.length) {
				this.movementIndex = 0
			}
			return this.movement[this.movementIndex]
		},
		checkEnd() {
			if (
				this.currentPositionH === this.startPointH &&
				this.currentPositionV === this.startPointV &&
				this.sequenceIndex === this.sequence.length - 1
			) {
				console.log('**** GIOCO FINITO ****')
				clearInterval(this.drawInterval)
			}
		},
		checkIndex() {
			if (this.sequenceIndex === this.sequence.length - 1) {
				if (this.color) {
					this.changeColor(this.provider.context)
				}
				this.sequenceIndex = 0
			} else {
				this.sequenceIndex++
			}
		},
		move(direction) {
			/*eslint-disable */
			switch (direction) {
				case 'up': {
					this.currentPositionV = this.currentPositionV - this.sequence[this.sequenceIndex] * this.space
					break
				}
				case 'right': {
					this.currentPositionH = this.currentPositionH + this.sequence[this.sequenceIndex] * this.space
					break
				}
				case 'down': {
					this.currentPositionV = this.currentPositionV + this.sequence[this.sequenceIndex] * this.space
					break
				}
				case 'left': {
					this.currentPositionH = this.currentPositionH - this.sequence[this.sequenceIndex] * this.space
					break
				}
			}
			/*eslint-enable */
		},
		createGrid(ctx) {
			// draw columns
			let limit = this.$refs['my-canvas'].clientWidth

			for (let x = 1; x < limit; x += this.space) {
				ctx.moveTo(x, 0)
				ctx.lineTo(x, limit)
			}
			// draw rows
			limit = this.$refs['my-canvas'].clientWidth

			for (let y = 1; y < limit; y += this.space) {
				ctx.moveTo(0, y)
				ctx.lineTo(limit, y)
			}

			ctx.moveTo(0, 0)
			ctx.lineTo(this.$refs['my-canvas'].clientWidth, this.$refs['my-canvas'].clientHeight)

			ctx.strokeStyle = '#ddd'
			ctx.stroke()
		},
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
canvas {
	background: #fff;
	border: 1px solid #ccc;
	margin: 0 auto;
}
</style>
