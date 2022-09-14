# Toy Robot Simulator

CLI app to move a toy robot around a table as a [coding exercise](https://github.com/stephenkoo/toy-robot-simulator/blob/main/TOY_ROBOT.md) built with Node.js & TypeScript.

## Setup

Install and use the correct node version (e.g. using [nvm](https://github.com/nvm-sh/nvm)) & install dependencies

```sh
nvm install
nvm use
npm install

npm run build # build the app
```

## Getting started

- `npm run build` builds the app
- `npm run start` runs the robot cli in interactive mode
- `npm run start -- -f <filename>.txt` executes the robot commands in a text file, e.g. `npm run start -- -f datasets/set3.txt`
- `npm run watch` runs and restarts the app when code changes
- `npm run test` runs tests

### Comments

- Added functionality to execute commands from a .txt file.
- Used finite state machine (FSM) pattern for robot for predictability & flexibility. E.g. Should be easy to extend app to create and control multiple robots on different table sizes, add step backward functionality or change number of steps to take, or move diagonally.
- Used experimental Node.js ESM modules over CommonJS out of curiosity.
