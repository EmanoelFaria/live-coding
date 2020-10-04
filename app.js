/** LOAD MODULE DEPENDENCIES */
const express = require('express');
const app = express();
const compression = require('compression');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const starshipRouter = require('./routes/starship');
const notFoundRouter = require('./routes/notFound');

const authMiddleware = require('./middlewares/auth');
const responserMiddleware = require('./middlewares/responser');

app.use(compression());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/health', (_, res) => {
  res.send('OK').status(200);
});

app.use(responserMiddleware);
app.use(authMiddleware);
app.use('/starship', starshipRouter);
app.use(notFoundRouter);

module.exports = app;
