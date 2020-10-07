const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const internalService = require('../middlewares/internalService');

router.post('/signup', AuthController.signUp);
router.post('/signin', AuthController.signIn);
router.post('/validate', internalService, AuthController.validate);
router.put('/user/:id', AuthController.updateUserPermissions);

module.exports = router;
