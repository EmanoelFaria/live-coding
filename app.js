/** LOAD MODULE DEPENDENCIES */
const express = require('express');
const app = express();
const compression = require('compression');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const userRouter = require('./routes/user');
const starshipRouter = require('./routes/starship');

const authMiddleware = require('./middlewares/auth');
const responserMiddleware = require('./middlewares/responser');

app.use(compression());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/health', (_, res) => {
  res.send('OK').status(200);
});

app.use(authMiddleware);
app.use(responserMiddleware);
app.use('/user', userRouter);
app.use('/starship', starshipRouter);

module.exports = app;
