# **GameFame**

[![Build Status](https://travis-ci.com/alekzieba/game-fame.svg?token=yqqaA7mpgDZTSHs8o8Cz&branch=master)](https://travis-ci.com/alekzieba/game-fame)

Welcome to our project for COMS 4156: Advanced Software Engineering at
Columbia University. This document is a work in progress and includes details
about running, testing, and building this application. All of our team assignments
are located within the `TEAM-ASSIGNMENT-SUBMISSIONS` directory.

# Installation

See the releases for this project to download the latest production version
of our application for your platform.

# Development Mode

Ensure that you have a proper `.env` file within the root directory of the
project. Here are the environment variables we have defined so far and are obvious
to those who have Firebase accounts and to those who have signed up for Google OAuth:

- `FIREBASE_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_DATABASE_URL`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_STORAGE_BUCKET`
- `FIREBASE_MSID`
- `GOOGLE_OAUTH_CLIENT_ID`

You can run the development environment with the following series
of commands from the root directory of the project:

`$ yarn install`

`$ yarn build`

`$ yarn dev`

Run the test suite with:

`$ yarn test`

Assuming that all of the environment variables are set properly and have uncommented
the relevant `auth` tests (commented out in case the environment variables are not set,
additionally Gmail tokens last less than an hour so running these tests on Travis is quite
difficult), this is the branch coverage that you should achieve:

```
----------------------|----------|----------|----------|----------|-------------------|
File                  |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
----------------------|----------|----------|----------|----------|-------------------|
All files             |    47.87 |    19.39 |    49.32 |    48.21 |                   |
 app/actions          |    46.89 |    18.09 |    48.61 |    47.23 |                   |
  ConnectFour.js      |    29.13 |        0 |       20 |    29.41 |... 89,390,391,396 |
  auth.js             |    86.11 |       90 |       70 |    88.57 |       12,13,14,15 |
  game_invites.js     |    83.33 |    58.33 |    93.33 |    83.33 |... 19,121,122,125 |
  games.js            |      100 |      100 |      100 |      100 |                   |
  tictactoe.js        |    18.31 |     7.69 |    23.53 |    18.31 |... 15,216,217,222 |
 app/constants        |      100 |      100 |      100 |      100 |                   |
  firebase.js         |      100 |      100 |      100 |      100 |                   |
 internals/scripts    |    71.43 |       50 |      100 |    71.43 |                   |
  CheckBuiltsExist.js |    71.43 |       50 |      100 |    71.43 |             19,27 |
----------------------|----------|----------|----------|----------|-------------------|
```

The environment variables that you need to set to get the complete `auth` tests to work
are the following:

- `GMAIL_ACCESS_TOKEN`
- `GMAIL_REFRESH_TOKEN`
- `GMAIL_SCOPE`
- `GMAIL_TOKEN_TYPE`
- `GMAIL_ID_TOKEN`
- `GMAIL_EXPIRY_DATE`
- `NON_GMAIL_ACCESS_TOKEN`
- `NON_GMAIL_REFRESH_TOKEN`
- `NON_GMAIL_SCOPE`
- `NON_GMAIL_TOKEN_TYPE`
- `NON_GMAIL_ID_TOKEN`
- `NON_GMAIL_EXPIRY_DATE`

You can obtain these variables (from a Gmail and a non-Gmail account, respectively) by
checking the console in development mode after logging in.
