# VendingMachine

Design an API for a vending machine, allowing users with a “seller” role to add, update or remove products, while users with a “buyer” role can deposit coins into the machine and make purchases.

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)

## General info

This is a vending machine that allows users with a “seller” role to add, update or remove products, while users with a “buyer” role can deposit coins into the machine and make purchases.

## Technologies

Project is created with:

- node-js
  - to install for windows: https://phoenixnap.com/kb/install-node-js-npm-on-windows
  - to install for ubuntu: https://linuxize.com/post/how-to-install-node-js-on-ubuntu-20-04/
  - to install for Mac: https://www.newline.co/@Adele/how-to-install-nodejs-and-npm-on-macos--22782681
- typescript
- express
- mongoDB

## Setup

First install nodejs and npm using the following links

```
Windows: https://phoenixnap.com/kb/install-node-js-npm-on-windows
Ubuntu: https://linuxize.com/post/how-to-install-node-js-on-ubuntu-20-04/
Mac: https://www.newline.co/@Adele/how-to-install-nodejs-and-npm-on-macos--22782681
```

To run this project, You will need first to update .env file and put into it the following data:

```
PORT=3000
ENVIRONMENT=development
DB_NAME=myFirstDatabase
DB_USER=DatalyticsUser
DB_PASSWORD=EX5OutIAlsTXlMFh
JWT_SECRET=dadd
JWT_EXPIRY=24h
```

Then install dependecies locally using npm

```
$ npm install
```

Then start the server:

```
$ npm run build:live
```
