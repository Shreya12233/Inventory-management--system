const db = require('../database/db');

class StockMovementModel {
  static create(movementData) {
    const stmt = db.prepare(`
      INSERT INTO stock_movements (product_id, change_amount, previous_quantity, new_quantity, reason)
      VALUES (@product_id, @change_amount, @previous_quantity, @new_quantity, @reason)
    `);
    return stmt.run(movementData);
  }

  static findByProductId(productId) {
    return db.prepare(`
      SELECT * FROM stock_movements 
      WHERE product_id = ? 
      ORDER BY created_at DESC
    `).all(productId);
  }

  static findAll(page = 1, limit = 50) {
      const offset = (page - 1) * limit;
      
      const data = db.prepare(`
        SELECT sm.*, p.name as product_name, p.sku as product_sku
        FROM stock_movements sm
        JOIN products p ON sm.product_id = p.id
        ORDER BY sm.created_at DESC
        LIMIT @limit OFFSET @offset
      `).all({ limit: parseInt(limit, 10), offset: parseInt(offset, 10) });

      const total = db.prepare('SELECT COUNT(*) as total FROM stock_movements').get().total;

      return {
        data,
        pagination: {
          page: parseInt(page, 10),
          limit: parseInt(limit, 10),
          total,
          totalPages: Math.ceil(total / limit)
        }
      };
  }
}

module.exports = StockMovementModel;
