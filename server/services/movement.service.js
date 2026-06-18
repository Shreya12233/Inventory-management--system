const StockMovementModel = require('../models/StockMovement.model');

class MovementService {
  static getAllMovements(page, limit) {
    return StockMovementModel.findAll(page, limit);
  }

  static getMovementsByProductId(productId) {
    return StockMovementModel.findByProductId(productId);
  }
}

module.exports = MovementService;
