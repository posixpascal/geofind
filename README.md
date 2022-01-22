<p align="center">
  <img width="72" src="https://raw.githubusercontent.com/posixpascal/geofind/master/packages/web/assets/images/logo-yellow.svg">
</p>

[![Maintainability](https://api.codeclimate.com/v1/badges/c81ea928b2b76d4efae5/maintainability)](https://codeclimate.com/github/posixpascal/geofind/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/c81ea928b2b76d4efae5/test_coverage)](https://codeclimate.com/github/posixpascal/geofind/test_coverage)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Uptime](https://img.shields.io/uptimerobot/ratio/m783620652-575ef546c2e2407fd4bca7d7)](https://status.geofind.io)
[![Status](https://img.shields.io/uptimerobot/status/m783620652-575ef546c2e2407fd4bca7d7)](https://status.geofind.io)

# 🌍 🔍 geofind.io 

<p align="center">
<strong>geofind.io</strong> is a multiplayer geographical guessing game 
written exclusively in TypeScript featuring different game modes, custom markers, fine-tuned settings and lots of other features.

[Play now!](https://geofind.io)
</p>

## 🌈 Screenshots

### 🕹 Game Play
<p align="center">
  <img src="https://github.com/posixpascal/geofind/raw/master/screenshots/gameplay.jpg">
</p>

### 📍 Home
<p align="center">
  <img src="https://github.com/posixpascal/geofind/raw/master/screenshots/home.jpg">
</p>

### 👥 Lobby
<p align="center">
  <img src="https://github.com/posixpascal/geofind/raw/master/screenshots/lobby.jpg">
</p>


### 💄 Profile 
<p align="center">
  <img src="https://github.com/posixpascal/geofind/raw/master/screenshots/profile.jpg">
</p>

## 🏛 Structure

The project is structured using `yarn workspaces`. The following namespaces exist at the moment:

- packages/web: Nuxt powered web client
- packages/api: Colyseus GameServer API
- packages/app: ReactNative powered mobile client

## 🚀 Up and running

To install geofind on your local machine, follow the instructions listed below. 

First, install the dependencies listed in the `package.json` file:
```bash
# in root directory
yarn install
```

Then start the servers using:
```bash
yarn workspace @geofind/api start:dev
yarn workspace @geofind/web start:dev
```


### 🔨 Database

This project depends on a PostgreSQL with PostGIS extension. A database dump is located in this repo under `config/dumps` for your convenience.

### 🗺 Tileserver

The frontend expects 2 URLs to a tileserver (see: `./packages/web/.env.example`). You may specify your own tileserver but it's not necessary for the application to start.

## 🤝 Contribution

Contribution is very much appreciated and every pull request will be considered for merging into master. 

## 👨‍⚖️ License
This project is licensed under GNU GPLv3. View [LICENSE](https://github.com/posixpascal/geofind_frontend/blob/master/LICENSE) for more information.

## 📝 Copyright
`geofind.io` is Copyright © 2019 by Pascal Raszyk 
