const express = require('express');
const router = express.Router();
const StarshipController = require('../controllers/StarshipsController');
const { DTO } = require('../middlewares/dto');
const starshipBodyValidation = require('../models/validations/Startship');

router.get('/', StarshipController.getAll);
router.post('/', StarshipController.createOne);

module.exports = router;
