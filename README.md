# SpaceKit 2

![CI](https://github.com/GabrielTK/SpaceKit/workflows/CI/badge.svg)

A Mod Manager and Save Editor (comming soon) for Stellaris, a game by Paradox Interactive

<p align="center"><img src="https://i.imgur.com/flcMvDC.png"></p>

## Usage

More usage info will be available soon. 

### Publishing ModLists

To publish a ModList, upload the `dlc_load.json` (located at your `Documents\Paradox Interactive\Stellaris` folder) to Gist or Pastebin, and send the **RAW** link to your users.
 
## Running from source
SpaceKit requires NodeJS and Typescript to Run.


### Install Dependencies

```zsh
$ cd my-app

# using yarn or npm
$ yarn (or `npm install`)

# using pnpm
$ pnpm install --shamefully-hoist
```

### Starting

```zsh
# development mode
$ yarn dev (or `npm run dev` or `pnpm run dev`)

# production build
$ yarn build (or `npm run build` or `pnpm run build`)
```
