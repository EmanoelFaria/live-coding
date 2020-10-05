const express = require('express');
const router = express.Router();
const StarshipController = require('../controllers/StarshipsController');

router.get('/', StarshipController.getAll);
router.post('/', StarshipController.createOne);

module.exports = router;
