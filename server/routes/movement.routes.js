const express = require('express');
const MovementController = require('../controllers/movement.controller');

const router = express.Router();

router.get('/', MovementController.getAllMovements);
router.get('/product/:productId', MovementController.getMovementsByProductId);

module.exports = router;
