import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import LowStock from './pages/LowStock';
import StockMovements from './pages/StockMovements';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import ErrorBoundary from './components/ErrorBoundary';

const isLoggedIn = () => localStorage.getItem('invenio-auth') === 'true';

const ProtectedRoute = () => {
  return isLoggedIn() ? <MainLayout /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <ErrorBoundary>
      <Router>
      <Routes>
        <Route path="/login" element={isLoggedIn() ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="low-stock" element={<LowStock />} />
          <Route path="movements" element={<StockMovements />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
      <ToastContainer position="bottom-right" theme="dark" />
    </Router>
    </ErrorBoundary>
  );
}

export default App;
