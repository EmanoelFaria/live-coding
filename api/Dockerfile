FROM node:10.13

WORKDIR /usr/src/api

COPY ./package*.json ./

ENV NODE_ENV=development

RUN npm install

COPY . .

RUN chmod 755 ./migrate.sh

RUN git clone https://github.com/vishnubob/wait-for-it.git

CMD [ "node", "bin/www" ]
