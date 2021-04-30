<template>
	<canvas id="my-canvas" ref="my-canvas" class="shadow-lg rounded-xl"></canvas>
</template>

<script>
export default {
	name: 'Canvas',
	inject: ['finished'],
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
		space: {
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
			sequenceIndex: 0,
			startPointH: 260,
			startPointV: 260,
			currentPositionH: 260,
			currentPositionV: 260,
			movement: ['right', 'up', 'left', 'down'],
			movementIndex: -1,
			drawInterval: null,
			strokeColors: [
				'#222',
				'purple',
				'green',
				'#F60',
				'red',
				'#00F',
				'#0ff',
				'#a52a2a',
				'#00008B',
				'#1E90FF',
				'#DAA520',
				'#FF00FF',
				'#808000',
				'#00FF7F',
				'#9ACD32',
			],
		}
	},
	mounted() {
		// We can't access the rendering context until the canvas is mounted to the DOM.
		// Once we have it, provide it to all child components.
		this.provider.context = this.$refs['my-canvas'].getContext('2d')
		window.addEventListener('resize', this.resizeCanvasAndStarUp)
		this.resizeCanvasAndStarUp()
	},
	updated() {
		if (!this.finished.status) {
			clearInterval(this.drawInterval)
			this.resizeCanvasAndStarUp()
		}
	},
	unmounted() {
		window.removeEventListener('resize', this.resizeCanvasAndStarUp)
	},
	methods: {
		resizeCanvasAndStarUp() {
			// clear any interval
			clearInterval(this.drawInterval)

			// Resize the canvas to fit its parent's width.
			const newWidth = Math.floor(this.$refs['my-canvas'].parentElement.clientWidth) || 520
			let newHeight = Math.floor(this.$refs['my-canvas'].parentElement.clientHeight) || 520

			// set height limit
			if (newHeight > 465) {
				newHeight = 465
			}

			// update canvas and restart
			this.$refs['my-canvas'].width = newWidth
			this.$refs['my-canvas'].height = newHeight

			// set the starting point and the current position, in the middle of the canvas
			// 1. get the center of the actual canvas -> Math.floor(newWidth / 2)
			// 2. convert number to the nearest multiple of the given square width -> Math.round( XXX / this.space) * this.space ( https://stackoverflow.com/a/7948187 )
			this.startPointH = Math.round(Math.floor(newWidth / 2) / this.space) * this.space
			this.startPointV = Math.round(Math.floor(newHeight / 2) / this.space) * this.space

			// set the initial position where start the draw
			this.currentPositionH = this.startPointH
			this.currentPositionV = this.startPointV

			// clear rect, useful if we update the code
			this.provider.context.clearRect(0, 0, newWidth, newHeight)

			// start/restart the sequence from the beginning, initial move index is set
			this.sequenceIndex = 0
			this.movementIndex = -1

			// if checked, draw the grid
			if (this.showGrid) {
				this.createGrid(this.provider.context)
			}

			// choose a random color
			if (this.color) {
				this.changeColor(this.provider.context)
			} else {
				this.provider.context.strokeStyle = this.strokeColors[0]
			}

			// set the starting point and ... let's start to draw!
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
				clearInterval(this.drawInterval)
				this.finished.status = true
				console.log('Feedback for nerds like me... finished status is now true')

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

			ctx.strokeStyle = 'rgba(156, 163, 175, 0.3)'
			ctx.stroke()
		},
	},
}
</script>
