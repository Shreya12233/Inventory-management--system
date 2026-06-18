const { z } = require('zod');

const createProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  sku: z.string().min(1, "SKU is required"),
  category: z.string().optional().default("General"),
  price: z.number().positive("Price must be positive"),
  quantity: z.number().int().nonnegative("Quantity cannot be negative").default(0),
  min_stock: z.number().int().nonnegative("Minimum stock cannot be negative").default(5),
});

const updateProductSchema = createProductSchema.partial();

const adjustStockSchema = z.object({
  change_amount: z.number().int(),
  reason: z.string().min(1, "Reason is required"),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  adjustStockSchema
};
