# mathGraphs

Play with sequences of numbers to create nice graphs on a canvas.

This summer my kids found a math game, a sequence of numbers to be drawn on a squared paper, to get a nice schematic drawing.

All you need is a sequence of integers and a simple drawing rule pattern.

The movements must follow these paths sequence: **right, up, left, down**

The drawing is finished when you'll get the starting point.

Let's understand it better with this simple sequence: `3, 3, 9`

The first line must be from the beginning point to **right**, the line must be `3` squares long.

![Step one](readme/step1.png?raw=true "Step one")

The second draw will start from the end of the previous one, the line must be `3` squares long, **up** direction.

![Step two](readme/step2.png?raw=true "Step two")

Then the third draw will start from the end of the previous one, the line must be `9` squares long, **left** direction.

![Step three](readme/step3.png?raw=true "Step three")

We haven't reached the starting point, so we need to restart the sequence number, going **down** for 3 squares.

![Step four](readme/step4.png?raw=true "Step four")

We did in sequence all the 4 movements, but we didn't reach the end point, so the let's go on moving **right** for `3` squares

![Step five](readme/step5.png?raw=true "Step five")

And so on, until we finish the number sequence of movements right at the staring point.

![Final drawing](readme/final.png?raw=true "Final drawing")

___

###Let's the fun begin

Try strange combinations, and have fun:

`1,2,3,4,5,6,7,8,9,1,1,2,3,4,5,6,7,8,9`

![Final drawing](readme/example1.png?raw=true "Final drawing")

___

`2,2,2,8,8,8,1,1,1,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7,9,9,9`

![Final drawing](readme/example2.png?raw=true "Final drawing")

___

`1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7,8,8,8,9,9,9`

![Final drawing](readme/example3.png?raw=true "Final drawing")

## ⚒ Structure

This is a vue3 + canvas experiment.


## ‍💻 Project setup

```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Lints and fixes files
```
yarn lint
```

## 👾 Developer

#### Lint

[Prettier](https://prettier.io) is and [ESLint](https://eslint.org/) are used to make the project safe and reliable.

#### CLI

[vue cli](https://cli.vuejs.org/) is use to scaffolding and serve the project

#### Tests

No tests at the moment, shame on me!

## Missing

CompositionAPI, since we're on a vue3 project. Will be there in the next iteration.

___

### == Changelog ==

**0.3**

- Added the amazing
[vite](https://github.com/vitejs/vite) && [windicss](https://github.com/windicss/windicss)
for a super quick Developer Experience (DX)


**0.2**

 - Added [githup page](https://gentax.github.io/mathGraphs/) and way to publish it: /scripts/gh-pages-deploy.js
 - Added lovely [tailwindcss](https://tailwindcss.com/).
 - Fixed way to redraw canvas.
 - Canvas now resize automatically.
 - Grid size can be changed.

**0.1.1**

 - Added colours to the lines.

 **0.1**

 - Initial release.


---

##### hope you enjoy it!

