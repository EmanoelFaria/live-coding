#! /bin/bash
NODE_ENV=development npx sequelize-cli db:create
NODE_ENV=development npx sequelize-cli db:migrate
