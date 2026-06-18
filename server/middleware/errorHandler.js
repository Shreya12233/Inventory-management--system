const { sendError } = require('../utils/response');
const { ZodError } = require('zod');

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err instanceof ZodError) {
    const message = err.errors.map(e => e.message).join(', ');
    return sendError(res, 400, `Validation Error: ${message}`);
  }

  // SQLite Constraint Error
  if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
    return sendError(res, 400, 'Duplicate entry found. SKU must be unique.');
  }
  
  if (err.code === 'SQLITE_CONSTRAINT_CHECK') {
     return sendError(res, 400, 'Database constraint failed. Check values (e.g., negative quantity).');
  }

  // Custom errors thrown by services
  if (err.statusCode) {
      return sendError(res, err.statusCode, err.message);
  }

  // Default server error
  return sendError(res, 500, 'Internal Server Error');
};

module.exports = errorHandler;
