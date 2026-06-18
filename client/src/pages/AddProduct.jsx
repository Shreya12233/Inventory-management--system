import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productApi } from '../services/api';
import { toast } from 'react-toastify';
import { Save, ArrowLeft } from 'lucide-react';

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: 'General',
    price: '',
    quantity: '0',
    min_stock: '5'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const dataToSubmit = {
        ...formData,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity, 10),
        min_stock: parseInt(formData.min_stock, 10)
      };
      
      await productApi.create(dataToSubmit);
      toast.success('Product created successfully');
      navigate('/products');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/products')} className="p-2 hover:bg-surface rounded-lg transition-colors text-textMuted hover:text-textMain">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">Add New Product</h1>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-textMuted">Product Name *</label>
              <input 
                required 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary text-textMain"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-textMuted">SKU (Unique) *</label>
              <input 
                required 
                type="text" 
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary text-textMain"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-textMuted">Category</label>
              <input 
                type="text" 
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary text-textMain"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-textMuted">Price ($) *</label>
              <input 
                required 
                type="number" 
                step="0.01"
                min="0.01"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary text-textMain"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-textMuted">Initial Quantity</label>
              <input 
                required 
                type="number" 
                min="0"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary text-textMain"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-textMuted">Minimum Stock Alert</label>
              <input 
                required 
                type="number" 
                min="0"
                name="min_stock"
                value={formData.min_stock}
                onChange={handleChange}
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary text-textMain"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button 
              type="submit" 
              disabled={loading}
              className="bg-primary hover:bg-primaryHover text-white px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors font-medium disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {loading ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
