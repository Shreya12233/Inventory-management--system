# Full Stack Inventory Management System

A production-ready Inventory Management System built with React 19, Node.js, Express, and SQLite.

## Project Overview

Invenio is a modern, responsive web application designed to help businesses manage their inventory efficiently. It provides a comprehensive dashboard, product management capabilities, low stock alerts, and a detailed history of stock movements.

## Features

- **Interactive Dashboard:** Real-time statistics and visualizations using Recharts.
- **Product Management:** Full CRUD capabilities for inventory items.
- **Stock Adjustments:** Prevent negative inventory with transactional stock adjustments.
- **Movement History:** Track every stock addition or reduction with reasons.
- **Low Stock Alerts:** Dedicated view for items falling below minimum thresholds.
- **Modern UI/UX:** Dark mode enabled, responsive design using Tailwind CSS.
- **Validation:** Zod-based robust validation on the backend.

## Tech Stack

**Frontend:**
- React 19 (Vite)
- Tailwind CSS
- React Router DOM
- Axios
- Recharts
- Lucide React
- React Toastify

**Backend:**
- Node.js
- Express.js
- better-sqlite3
- Zod
- Helmet (Security)
- Morgan (Logging)

## Folder Structure

```
inventory-management/
├── client/                 # Frontend React Application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── layouts/        # Page layouts (Sidebar, Navbar)
│   │   ├── pages/          # Main application views
│   │   ├── services/       # API client methods
│   │   ├── App.jsx         # Router configuration
│   │   └── main.jsx        # Entry point
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── server/                 # Backend Node.js API
    ├── controllers/        # Request handling
    ├── database/           # SQLite setup and schema
    ├── middleware/         # Error handling, security
    ├── models/             # Database queries
    ├── routes/             # API endpoints
    ├── scripts/            # Database seeding
    ├── services/           # Business logic
    ├── validators/         # Zod schemas
    └── server.js           # Express server entry point
```

## Installation

### Prerequisites
- Node.js (v18+ recommended)
- npm

### 1. Backend Setup
```bash
cd inventory-management/server
npm install
npm run dev      # Starts the backend server on port 5000 using nodemon
```

### 2. Frontend Setup
```bash
cd inventory-management/client
npm install
npm run dev      # Starts the Vite development server
```

### Windows PowerShell Notes

If PowerShell blocks `npm` with an execution policy error, use `npm.cmd` instead:

```powershell
cd "C:\Users\LENOVO\Downloads\stock-management-system-main\stock-management-system-main\server"
npm.cmd run dev
```

Open a second PowerShell window for the frontend:

```powershell
cd "C:\Users\LENOVO\Downloads\stock-management-system-main\stock-management-system-main\client"
npm.cmd run dev
```

Do not run npm commands from the main project folder because there is no root `package.json`. Run backend commands inside `server` and frontend commands inside `client`.

### Database Seeding

The SQLite database is stored at `server/database/inventory.db`.

Running the app normally does not delete data. The seed command is safe by default and skips if products already exist:

```bash
cd server
npm run seed
```

Only run this reset command if you intentionally want to delete existing products and stock movements, then replace them with sample data:

```bash
npm run seed -- --reset
```

## API Endpoints

### Products
- `GET /api/products` - Get all products (supports search, category, sort)
- `GET /api/products/dashboard` - Get dashboard statistics
- `GET /api/products/:id` - Get a single product
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product
- `PATCH /api/products/:id/stock` - Adjust stock quantity

### Movements
- `GET /api/movements` - Get all stock movements
- `GET /api/movements/product/:id` - Get movements for a specific product

## Assumptions

- Stock levels cannot go below 0.
- All prices are positive.
- The system runs entirely locally utilizing SQLite for simplicity and zero-configuration database needs.

## Future Improvements

- Authentication and Role-Based Access Control (RBAC).
- Export inventory data to CSV/Excel.
- Integration with external e-commerce platforms.
- More granular reporting (e.g., sales over time).

---

### AI Usage Note

**AI Tools Used:** Google DeepMind's Antigravity Agent.
**How AI Helped:** The AI entirely scaffolded the frontend and backend architectures, generated standard boilerplate, and implemented the core business logic including transactional stock updates and complex UI components. It automated the creation of the responsive dashboard, form validations using Zod, and database integrations.
**Challenges Faced:** Ensuring the proper sequencing of directory creation and dependency installation via shell commands, which required fallback and retry mechanisms to handle environment specifics.
