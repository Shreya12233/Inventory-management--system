import { useState, useEffect } from 'react';
import { productApi } from '../services/api';
import { AlertTriangle, ArrowUpDown } from 'lucide-react';
import StockModal from '../components/StockModal';
import { toast } from 'react-toastify';

const LowStock = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const result = await productApi.getAll({ lowStock: 'true', sortBy: 'quantity', order: 'ASC' });
      setProducts(result.data);
    } catch (error) {
      toast.error('Failed to load low stock products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleStockAdjust = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    fetchProducts();
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <AlertTriangle className="text-danger w-6 h-6" /> 
            Low Stock Alerts
          </h1>
          <p className="text-textMuted mt-1">Products at or below their minimum stock threshold.</p>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-danger/30 overflow-hidden shadow-[0_0_15px_rgba(239,68,68,0.1)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-danger/10 border-b border-danger/20 text-danger uppercase">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">SKU</th>
                <th className="px-6 py-4">Current Stock</th>
                <th className="px-6 py-4">Min Threshold</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr><td colSpan="5" className="px-6 py-8 text-center text-textMuted">Loading...</td></tr>
              ) : products.length === 0 ? (
                <tr><td colSpan="5" className="px-6 py-12 text-center text-textMuted flex flex-col items-center"><div className="bg-success/10 text-success p-4 rounded-full mb-3"><AlertTriangle className="w-8 h-8"/></div>All products are well stocked!</td></tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-background/50 transition-colors">
                    <td className="px-6 py-4 font-medium">{product.name}</td>
                    <td className="px-6 py-4 text-textMuted">{product.sku}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-danger/20 text-danger font-bold border border-danger/30">
                        {product.quantity}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-textMuted">{product.min_stock}</td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => { setSelectedProduct(product); setIsModalOpen(true); }}
                        className="text-sm bg-primary hover:bg-primaryHover text-white px-3 py-1.5 rounded transition-colors"
                      >
                        Restock
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && selectedProduct && (
        <StockModal 
          product={selectedProduct} 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={handleStockAdjust} 
        />
      )}
    </div>
  );
};

export default LowStock;
