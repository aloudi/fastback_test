# Fastback Test

This is a test assignment project for Fastback.

## Project Overview

This project contains two folders `/client` and `/server`.

The `/client` folder contains the frontend code built using `Next.js` 

The `/server` folder contains the backend code built using `Node.js`, `Nest.js` and `Sequelize`.
The backend is connected to a `Postgress` database that is running in a `Docker` image.

## Installation

Please refer to the README.md files in the `/client` and `/server` folders for installation instructions.

## Assignment overview

### Frontend

The frontend is a simple page that displays a simple home page with the ability to log in to the application.
The sign in functionality was implemented using `next-auth` package for storing and updating the session.
We are able to sign in using a dummy user that is seeded to the DB during initialization.
```
email: admin@email.com
password: 1234
```
After signing in, the user is able to visit the protected `/dashboard` page with a list of user posts.
The user is also able to view individual post info under `/dashboard/post/postId` route.

### Backend
The backend is a simple API that is able to perform CRUD operations.
The login functionality is implemented in the `auth` module using `passport` and `JWT` tokens.
Implemented a `Firewall` Guard to protect the user API endpoints from unauthorized access.
To refresh the session token, the user can visit the `/auth/refresh` route, that is protected by a separate refresh strategy.
Review the API documentation under `backendroute/api/docs#` route.
