/** LOAD MODULE DEPENDENCIES */
const express = require('express');
const app = express();
const compression = require('compression');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const userRouter = require('./routes/user');

app.use(compression());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/health', (_, res) => {
  res.send('OK').status(200);
});

app.use('/user', userRouter);

module.exports = app;
