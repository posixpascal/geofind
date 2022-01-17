<p align="center">
  <img width="150" src="https://github.com/posixpascal/geofind/raw/master/packages/web/public/apple-touch-icon.png">
</p>

[![Maintainability](https://api.codeclimate.com/v1/badges/c81ea928b2b76d4efae5/maintainability)](https://codeclimate.com/github/posixpascal/geofind/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/c81ea928b2b76d4efae5/test_coverage)](https://codeclimate.com/github/posixpascal/geofind/test_coverage)
[![Build Status](https://travis-ci.org/posixpascal/geofind.svg?branch=master)](https://travis-ci.org/posixpascal/geofind)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![David](https://david-dm.org/posixpascal/geofind.svg)](https://img.shields.io/david/posixpascal/geofind)
[![Uptime](https://img.shields.io/uptimerobot/ratio/m783620652-575ef546c2e2407fd4bca7d7)](https://status.geofind.io)
[![Status](https://img.shields.io/uptimerobot/status/m783620652-575ef546c2e2407fd4bca7d7)](https://status.geofind.io)

# 🌍 🔍 geofind.io 

<p align="center">
<strong>geofind.io</strong> is an online realtime multiplayer geographical guessing game 
written exclusively in TypeScript featuring different game modes (streetview and more coming soon), slurs and insults for "weak" players, educational benefits,
sounds, custom pins, custom maps, sudden death and other interesting ideas to make the game more fun to play. 
</p>

## 🌈 Screenshots

Lobby
<p align="center">
  <img src="https://github.com/posixpascal/geofind/raw/master/screenshots/lobby.png">
</p>

Gameplay
<p align="center">
  <img src="https://github.com/posixpascal/geofind/raw/master/screenshots/gameplay.png">
</p>

## 🎮 Demo

The game is available through the following domains:

- [geofind.io](https://geofind.io)
- [finde.xyz](https://finde.xyz)
- [whereisthat.app](https://whereisthat.app)

Feel free to add your own server on this list if you want to.

## 🧩 .ENV

This project uses `.env` files to configure itself. Before installing, please make sure you've 
edited the .env file to suit your needs. Here is the default configuration:

```
# some random identifier
SESSION_SECRET=
# another random identifier
JWT_SECRET=
# your google maps api key
GOOGLE_MAPS_API_KEY=
# google maps api key for the frontend
REACT_APP_GOOGLE_MAPS_API_KEY=
# on which port should the server run
GAMESERVER_PORT=3001
# frontend port (not needed when deploying to production)
PORT=3000 # only used on dev
# hostname for geofind server
HOSTNAME=localhost
# loglevel configurations
DEBUG=colyseus:*

# local connection urls
REACT_APP_WEBSOCKET_URI_LOCAL=ws://localhost:3001
MONGODB_URI_LOCAL=mongodb://localhost:27017/geofind
REDIS_URI_LOCAL=redis://localhost:6379/geofind

# the below are used when the node env is production
REACT_APP_WEBSOCKET_URI=ws://localhost:3001
MONGODB_URI=mongodb://localhost:27017/geofind
REDIS_URI=redis://localhost:6379/geofind
```

The env file will be automatically copied to all subpackages when running the `build` command.

## 🚀 Up and running

To install geofind on your local machine, follow the instructions listed below. 

### 🐳 Docker

You can build this game yourself easily if you are experienced with modern javascript development or Docker.

#### 🐳 Docker Compose
The easiest way to run the game is to use the`docker-compose.yml` file with the following command `docker-compose up -d`.
The `up` option will download the image if you don't have it yet and run the container.
The `-d` option will run the container in the background.

#### 🐳 Docker
You can also build the Docker image yourself:

Build it with `docker build -t geofind .`
Run it with `docker run -d -p 3001:3001 [IMAGE_ID]`
The `-d` option will run the container in the background (recommended if you want to have access to your current terminal session).

The `-p` option will let you choose on which port the container will listen (e.g. the first `3001` will make it accessible to http://localhost:3001), 
and on which internal port must the server listen (e.g. the second `3001`).

The `[IMAGE_ID]` is easily discoverable by running `docker images` in the terminal.

Make sure that you're adding `redis` and `mongod` containers as well.

### 🏠 Local
You can also build the game directly using yarn *(you cannot use npm install as this repo is using the workspace feature of Yarn):*

1. Install dependencies with `yarn`.
2. Build game with `yarn build`.
3. Run `yarn serve`.
4. The game is available at `http://localhost:3001`.

### 🔨Development

To run the project in development:

1. Install dependencies with `yarn`.
2. Start game with `yarn start`.
3. The game is available at `http://localhost:3000`.

If you encounter a white screen the first time you try to load the game in the browser, 
that's normal, just refresh the page. This is due to the order in which things are built the first time at launch.

In development, the front application is NOT served by the server, thus requiring you to access it through port `3000` instead of `3001` as seen before.
In development changes made to we, shared and server are live.

### ⏫ Production

To run the project in development:

1. Install dependencies with `yarn`.
2. Build game with `yarn build`.
3. Run the game with `yarn serve`

### 🔌 Capacitor

The `web` package features an integration with [capacitor](https://capacitor.ionicframework.com) so you easily package
your application as a mobile app for android, ios or even electron. The capacitor project is already setup,
so just follow their official [docs](https://capacitor.ionicframework.com/docs/) for running and deploying it to your device.

### 📲 React Native

The react native implementation lives inside the `app` package and is still in early development. 
Instructions on building and running will follow soon.

## 🏛 Architecture
This project is a monorepo (with the help of Yarn workspaces). 

It contains the following packages:

- `web` - The frontend application using Create React App.
- `server` - The authoritarive server running on NodeJS, Express and Colyseus.
- `shared` - A collection of constants and methods shared amongst web and server.
- `app` - Hosts the react native implementation of the app (currently WIP)

## 🤝 Contribution

Contribution is very much appreciated and every pull request will be considered for merging into master. 

## 🚧 Roadmap

Our internal roadmap is still subject to change but this is our current draft:

- [ ] App version using React Native
- [x] GamePlay mode with google streetview
- [ ] Add more features to find on a map (e.g. cities, mountains, animals)
- [ ] Optimize game play and optics in general

## 👨‍⚖️ License
This project is licensed under GNU GPLv3. View [LICENSE](https://github.com/posixpascal/geofind_frontend/blob/master/LICENSE) for more information.

## 📝 Copyright
`geofind.io` is Copyright © 2019 by Pascal Raszyk 
