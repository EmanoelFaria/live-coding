/** LOAD MODULE DEPENDENCIES */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/health', (_, res) => {
  res.send('OK').status(200);
});

module.exports = app;
