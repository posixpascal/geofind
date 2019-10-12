# geofind.io 
[![Maintainability](https://api.codeclimate.com/v1/badges/e60d54a85ff19175c74a/maintainability)](https://codeclimate.com/github/posixpascal/geofind_frontend/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/e60d54a85ff19175c74a/test_coverage)](https://codeclimate.com/github/posixpascal/geofind_frontend/test_coverage)
[![Build Status](https://travis-ci.org/posixpascal/geofind_frontend.svg?branch=master)](https://travis-ci.org/posixpascal/geofind_frontend)

[**geofind**](https://geofind.io) is an online realtime multiplayer geographical guessing game 
written exclusively in TypeScript.


## Installation

To install geofind on your local machine, follow the instructions listed below. Note that 
you'll also need the [GameServer](https://github.com/posixpascal/geofind_gameserver) to run geofind locally exclusive.

You don't need the GameServer if you only plan to make frontend changes because
the default configuration of the frontend connects to our live environment.

#### Installation Steps

```bash
# 1. Execute the following statements in order:
git clone git@github.com:posixpascal/geofind_frontend.git
# 2. cd into directory
cd geofind_frontend
# 3. install dependencies using yarn or npm:
npm install .
# 4. environment/configuration
cp .env.sample .env
# 5. start the frontend.
npm run watch
```

If you open your browser and navigate to `http://localhost:1234` you should see the welcome screen for geofind.

Note: The `watch` command will listen for file changes and reloads the frontend automatically. 

## Contribution

Contribution is very much appreciated and every pull request will be considered for merging into master. 

## Roadmap

Our internal roadmap is still subject to change but this is our current draft:

- [ ] App version using React Native
- [ ] GamePlay mode with google streetview
- [ ] Add more features to find on a map (e.g. cities, mountains, animals)
- [ ] Optimize game play and optics in general

## License

This project is licensed under GNU GPLv3. View [LICENSE](https://github.com/posixpascal/geofind_frontend/blob/master/LICENSE) for more information.

## Copyright

geofind.io is copyright 2019 by Pascal Raszyk 
