const MovementService = require('../services/movement.service');
const { sendSuccess } = require('../utils/response');

class MovementController {
  static getAllMovements(req, res, next) {
    try {
      const { page = 1, limit = 50 } = req.query;
      const movements = MovementService.getAllMovements(page, limit);
      sendSuccess(res, 200, 'Movements retrieved', movements);
    } catch (error) {
      next(error);
    }
  }

  static getMovementsByProductId(req, res, next) {
    try {
      const movements = MovementService.getMovementsByProductId(req.params.productId);
      sendSuccess(res, 200, 'Product movements retrieved', movements);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MovementController;
