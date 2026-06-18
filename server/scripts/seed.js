const db = require('../database/db');

const seedData = [
  { name: 'Laptop Pro X', sku: 'LP-X-001', category: 'Electronics', price: 1299.99, quantity: 50, min_stock: 10 },
  { name: 'Wireless Mouse', sku: 'WM-002', category: 'Accessories', price: 29.99, quantity: 200, min_stock: 50 },
  { name: 'Mechanical Keyboard', sku: 'MK-003', category: 'Accessories', price: 89.99, quantity: 150, min_stock: 30 },
  { name: 'USB-C Hub', sku: 'UH-004', category: 'Accessories', price: 49.99, quantity: 5, min_stock: 20 },
  { name: '4K Monitor', sku: 'MN-005', category: 'Electronics', price: 399.99, quantity: 25, min_stock: 15 },
  { name: 'Ergonomic Chair', sku: 'EC-006', category: 'Furniture', price: 249.99, quantity: 2, min_stock: 10 },
  { name: 'Standing Desk', sku: 'SD-007', category: 'Furniture', price: 499.99, quantity: 15, min_stock: 5 },
  { name: 'Noise Cancelling Headphones', sku: 'NCH-008', category: 'Audio', price: 199.99, quantity: 45, min_stock: 15 },
  { name: 'Smartphone Stand', sku: 'SS-009', category: 'Accessories', price: 14.99, quantity: 300, min_stock: 100 },
  { name: 'Webcam 1080p', sku: 'WC-010', category: 'Electronics', price: 59.99, quantity: 0, min_stock: 20 },
];

const insertProduct = db.prepare(`
  INSERT INTO products (name, sku, category, price, quantity, min_stock)
  VALUES (@name, @sku, @category, @price, @quantity, @min_stock)
`);

const insertMovement = db.prepare(`
  INSERT INTO stock_movements (product_id, change_amount, previous_quantity, new_quantity, reason)
  VALUES (@product_id, @change_amount, @previous_quantity, @new_quantity, @reason)
`);

console.log('Seeding database...');

let didSeed = false;

db.transaction(() => {
  const shouldReset = process.argv.includes('--reset');
  const existingProducts = db.prepare('SELECT COUNT(*) AS count FROM products').get().count;

  if (existingProducts > 0 && !shouldReset) {
    console.log('Existing products found. Skipping seed to protect your data.');
    console.log('Run "npm run seed -- --reset" only if you intentionally want to replace all data with sample data.');
    return;
  }

  if (shouldReset) {
    db.prepare('DELETE FROM stock_movements').run();
    db.prepare('DELETE FROM products').run();
  }

  for (const item of seedData) {
    const result = insertProduct.run(item);
    
    if (item.quantity > 0) {
      insertMovement.run({
        product_id: result.lastInsertRowid,
        change_amount: item.quantity,
        previous_quantity: 0,
        new_quantity: item.quantity,
        reason: 'Initial Stock Import'
      });
    }
  }

  didSeed = true;
})();

if (didSeed) {
  console.log('Database seeded successfully.');
} else {
  console.log('Database seed skipped. Existing data was left unchanged.');
}
