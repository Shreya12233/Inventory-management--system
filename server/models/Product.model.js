const db = require('../database/db');

class ProductModel {
  static create(productData) {
    const stmt = db.prepare(`
      INSERT INTO products (name, sku, category, price, quantity, min_stock)
      VALUES (@name, @sku, @category, @price, @quantity, @min_stock)
    `);
    const info = stmt.run(productData);
    return this.findById(info.lastInsertRowid);
  }

  static findById(id) {
    return db.prepare('SELECT * FROM products WHERE id = ?').get(id);
  }

  static findBySku(sku) {
    return db.prepare('SELECT * FROM products WHERE sku = ?').get(sku);
  }

  static findAll(filters = {}, sortBy = 'created_at', order = 'DESC', page = 1, limit = 50) {
    let query = 'SELECT * FROM products WHERE 1=1';
    let countQuery = 'SELECT COUNT(*) as total FROM products WHERE 1=1';
    const params = {};

    if (filters.search) {
      // Escape wildcard characters to prevent wildcard injection
      const escapedSearch = filters.search.replace(/[%_]/g, '\\$&');
      const searchClause = ' AND (name LIKE @search ESCAPE \'\\\' OR sku LIKE @search ESCAPE \'\\\')';
      query += searchClause;
      countQuery += searchClause;
      params.search = `%${escapedSearch}%`;
    }

    if (filters.category) {
      const catClause = ' AND category = @category';
      query += catClause;
      countQuery += catClause;
      params.category = filters.category;
    }

    if (filters.lowStock === 'true') {
        const lowStockClause = ' AND quantity <= min_stock';
        query += lowStockClause;
        countQuery += lowStockClause;
    }

    const validSortColumns = ['name', 'price', 'quantity', 'created_at', 'min_stock'];
    const sortCol = validSortColumns.includes(sortBy) ? sortBy : 'created_at';
    const sortDir = order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    const offset = (page - 1) * limit;

    query += ` ORDER BY ${sortCol} ${sortDir} LIMIT @limit OFFSET @offset`;
    params.limit = parseInt(limit, 10);
    params.offset = parseInt(offset, 10);

    const data = db.prepare(query).all(params);
    const total = db.prepare(countQuery).get(params).total;

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

  static update(id, productData) {
    const keys = Object.keys(productData);
    if (keys.length === 0) return this.findById(id);

    const setClause = keys.map(k => `${k} = @${k}`).join(', ');
    const stmt = db.prepare(`UPDATE products SET ${setClause} WHERE id = @id`);
    stmt.run({ ...productData, id });
    
    return this.findById(id);
  }

  static delete(id) {
    return db.prepare('DELETE FROM products WHERE id = ?').run(id);
  }

  static getDashboardStats() {
    const totalProducts = db.prepare('SELECT COUNT(*) as count FROM products').get().count;
    const totalQuantity = db.prepare('SELECT SUM(quantity) as count FROM products').get().count || 0;
    const lowStockCount = db.prepare('SELECT COUNT(*) as count FROM products WHERE quantity <= min_stock').get().count;
    const inventoryValue = db.prepare('SELECT SUM(quantity * price) as value FROM products').get().value || 0;

    return { totalProducts, totalQuantity, lowStockCount, inventoryValue };
  }
}

module.exports = ProductModel;
