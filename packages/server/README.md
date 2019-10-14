# geofind.io 
[![Build Status](https://travis-ci.org/posixpascal/geofind_gameserver.svg?branch=master)](https://travis-ci.org/posixpascal/geofind_frontend)

This is the *gameserver* 

----------

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
git clone git@github.com:posixpascal/geofind_gameserver.git
# 2. cd into directory
cd geofind_frontend
# 3. install dependencies using yarn or npm:
npm install .
# 4. environment/configuration
cp .env.sample .env
# 5. start the frontend.
npm run watch
```


## Contribution

Contribution is very much appreciated and every pull request will be considered for merging into master. 

## License

This project is licensed under GNU GPLv3. View [LICENSE](https://github.com/posixpascal/geofind_gameserver/blob/master/LICENSE) for more information.

## Copyright

geofind.io is copyright 2019 by Pascal Raszyk 
