const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/', async (_, res) => {
  try {
    const allUsers = await UserController.getAll();
    res.send(allUsers).status(200);
  } catch (error) {
    res.send(error.constructor.name || error).status(500);
  }
});

router.post('/', async (req, res) => {
  try {
    const createdUser = await UserController.createUser(req.body);
    return res.send(createdUser).status(200);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.constructor.name || error);
  }
});

module.exports = router;
