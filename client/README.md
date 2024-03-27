# Fashback client

## Prerequisites

- NodeJS >= v18.x.x _(we recommend using [NVM](https://github.com/nvm-sh/nvm#installing-and-updating))_
- Yarn

## Installing and Running the application

The following commands should be run in the root folder of the client:

1. Install dependencies:

```sh
yarn
```
2. Create the .env file:
```sh
cp .env.local.sample .env.local
```

3. Start the app in dev mode:

```sh
yarn start:dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

In order to view the `/dashboard` you need to login to the app with the following credentials:
```
email: admin@email.com
password: 1234
```
