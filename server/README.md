# Fashback server

## Prerequisites

- NodeJS >= v18.x.x _(we recommend using [NVM](https://github.com/nvm-sh/nvm#installing-and-updating))_
- [Docker](https://docs.docker.com/engine/install/ubuntu/) and [Docker Compose](https://docs.docker.com/compose/install/)
- Yarn

## Installing and Running the application

The following commands should be run in the root folder of the server:

1. Install dependencies:

```sh
yarn
```
2. Create the .env file:
```sh
cp .env.local.sample .env.local
```

3. Start docker-compose images to create the infrastructure.

```sh
yarn start:localdb
```

4. Run migrations and seeds, this will create the tables and seed the admin user under the email `admin@email.com` and password `1234`,

```sh
yarn db:migrate:up
yarn db:seed:up
```

5. Start the app in dev mode:

```sh
yarn start:dev
```