/** LOAD MODULE DEPENDENCIES */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');

const AuthController = require('./controllers/AuthController');
const responserMiddleware = require('./middlewares/responser');

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/health', (_, res) => {
  res.send('OK').status(200);
});

const models = require('./models/interfaces');

app.use(responserMiddleware);
app.post('/auth/signup', AuthController.signUp);
app.post('/auth/signin', AuthController.signIn);
app.post('/auth/validate', AuthController.validate);

module.exports = app;
