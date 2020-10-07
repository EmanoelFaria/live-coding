/** LOAD MODULE DEPENDENCIES */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');

const authRouter = require('./routes/auth');
const notFoundRouter = require('./routes/notFound');

const responserMiddleware = require('./middlewares/responser');

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/health', (_, res) => {
  res.send('OK').status(200);
});

app.use(responserMiddleware);
app.use('/auth', authRouter);
app.use(notFoundRouter);

module.exports = app;
