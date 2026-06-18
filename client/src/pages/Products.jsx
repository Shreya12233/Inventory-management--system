import { useState, useEffect } from 'react';
import { productApi } from '../services/api';
import { Search, Plus, Edit2, Trash2, ArrowUpDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import StockModal from '../components/StockModal';
import { toast } from 'react-toastify';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [order, setOrder] = useState('DESC');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const result = await productApi.getAll({ search, category, sortBy, order, page, limit: 10 });
      setProducts(result.data);
      setTotalPages(result.pagination.totalPages || 1);
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Reset page to 1 when search or category changes
    setPage(1);
  }, [search, category]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 300);
    return () => clearTimeout(timer);
  }, [search, category, sortBy, order, page]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productApi.delete(id);
        toast.success('Product deleted successfully');
        fetchProducts();
      } catch (error) {
        toast.error('Failed to delete product');
      }
    }
  };

  const toggleSort = (field) => {
    if (sortBy === field) {
      setOrder(order === 'ASC' ? 'DESC' : 'ASC');
    } else {
      setSortBy(field);
      setOrder('ASC');
    }
  };

  const handleStockAdjust = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    fetchProducts();
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link to="/products/add" className="bg-primary hover:bg-primaryHover text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" /> Add Product
        </Link>
      </div>

      <div className="bg-surface p-4 rounded-xl border border-border flex flex-wrap gap-4 items-center justify-between">
        <div className="relative flex-1 min-w-[250px] max-w-md">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" />
          <input 
            type="text" 
            placeholder="Search by name or SKU..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors text-textMain"
          />
        </div>
        <select 
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-background border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary text-textMain"
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Accessories">Accessories</option>
          <option value="Furniture">Furniture</option>
          <option value="Audio">Audio</option>
        </select>
      </div>

      <div className="bg-surface rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-background/50 border-b border-border text-textMuted uppercase">
              <tr>
                <th className="px-6 py-4 cursor-pointer hover:text-textMain transition-colors" onClick={() => toggleSort('name')}>
                  <div className="flex items-center gap-1">Product <ArrowUpDown className="w-3 h-3"/></div>
                </th>
                <th className="px-6 py-4">SKU</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 cursor-pointer hover:text-textMain transition-colors" onClick={() => toggleSort('price')}>
                  <div className="flex items-center gap-1">Price <ArrowUpDown className="w-3 h-3"/></div>
                </th>
                <th className="px-6 py-4 cursor-pointer hover:text-textMain transition-colors" onClick={() => toggleSort('quantity')}>
                  <div className="flex items-center gap-1">Stock <ArrowUpDown className="w-3 h-3"/></div>
                </th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr><td colSpan="6" className="px-6 py-8 text-center text-textMuted">Loading...</td></tr>
              ) : products.length === 0 ? (
                <tr><td colSpan="6" className="px-6 py-8 text-center text-textMuted">No products found.</td></tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-background/50 transition-colors">
                    <td className="px-6 py-4 font-medium">{product.name}</td>
                    <td className="px-6 py-4 text-textMuted">{product.sku}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-background rounded-md text-xs border border-border">{product.category}</span>
                    </td>
                    <td className="px-6 py-4">${product.price.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className={`font-semibold ${product.quantity <= product.min_stock ? 'text-danger' : 'text-success'}`}>
                          {product.quantity}
                        </span>
                        <button 
                          onClick={() => { setSelectedProduct(product); setIsModalOpen(true); }}
                          className="text-xs bg-primary/10 text-primary px-2 py-1 rounded hover:bg-primary/20 transition-colors"
                        >
                          Adjust
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      {/* <button className="text-textMuted hover:text-primary transition-colors"><Edit2 className="w-4 h-4 inline" /></button> */}
                      <button onClick={() => handleDelete(product.id)} className="text-textMuted hover:text-danger transition-colors"><Trash2 className="w-4 h-4 inline" /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Controls */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-between items-center p-4 border-t border-border bg-background/50">
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 bg-surface border border-border rounded-lg disabled:opacity-50 text-sm hover:bg-border transition-colors"
            >
              Previous
            </button>
            <span className="text-sm text-textMuted">Page {page} of {totalPages}</span>
            <button 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 bg-surface border border-border rounded-lg disabled:opacity-50 text-sm hover:bg-border transition-colors"
            >
              Next
            </button>
          </div>
        )}
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

export default Products;
