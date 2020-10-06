const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

router.post('/signup', AuthController.signUp);
router.post('/signin', AuthController.signIn);
router.post('/validate', AuthController.validate);
router.put('/user/:id', AuthController.updateUserPermissions);

module.exports = router;
