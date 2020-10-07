FROM node:10.13

WORKDIR /usr/src/auth

COPY ./package*.json ./

ENV NODE_ENV=development

RUN npm install

RUN git clone https://github.com/vishnubob/wait-for-it.git

COPY . .

RUN chmod 755 ./migrate.sh


CMD [ "node", "bin/www" ]
