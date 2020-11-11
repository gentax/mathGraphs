# mathGraphs

Play with sequences of numbers to create nice graphs on a canvas.

This summer my kids found a math game, a sequence of numbers to be drawn on a squared paper, to get a nice schematic drawing.

All you need is an odd sequence of integers, three (at last), five, seven (or more) numbers, and a simple drawing rule pattern.

The movements must follow these paths sequence: **right, up, left, down**

The drawing is finished when you'll get the starting point.

Let's understand it better with this simple sequence: **3, 3, 9**

The first line must be from the beginning point to **right**, the line must be **_3_** squares long.

![Step one](readme/step1.png?raw=true "Step one")

The second draw will start from the end of the previous one, the line must be **_3_** squares long, **up** direction.

![Step two](readme/step2.png?raw=true "Step two")   
 
Then the third draw will start from the end of the previous one, the line must be **_9_** squares long, **left** direction.

![Step three](readme/step3.png?raw=true "Step three")   

We haven't reached the starting point, so we need to restart the sequence number, going **down** for 3 squares.

![Step four](readme/step4.png?raw=true "Step four")   

We did in sequence all the 4 movements, but we didn't reach the end point, so the let's go on moving **right** for **_3_** squares 

![Step five](readme/step5.png?raw=true "Step five")   

And so on, until we finish the number sequence of movements right at the staring point. 

![Final drawing](readme/final.png?raw=true "Final drawing")


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

Better, responsive layout. 

Better typography.

But at the end, this is just a concept. 

--- 

##### hope you enjoy it!

