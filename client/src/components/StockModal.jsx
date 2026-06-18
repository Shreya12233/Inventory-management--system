import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { productApi } from '../services/api';
import { toast } from 'react-toastify';

const StockModal = ({ product, onClose, onSuccess }) => {
  const [changeAmount, setChangeAmount] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const amountInputRef = useRef(null);

  useEffect(() => {
    amountInputRef.current?.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const amount = parseInt(changeAmount);
    
    if (isNaN(amount) || amount === 0) {
      return toast.error('Please enter a valid amount');
    }
    
    if (product.quantity + amount < 0) {
      return toast.error('Cannot reduce stock below zero');
    }

    if (!reason.trim()) {
      return toast.error('Reason is required');
    }

    try {
      setLoading(true);
      await productApi.adjustStock(product.id, amount, reason);
      toast.success('Stock adjusted successfully');
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to adjust stock');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center animate-in fade-in duration-200"
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose();
      }}
    >
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="bg-surface border border-border w-full max-w-md rounded-xl shadow-2xl p-6 focus:outline-none"
        tabIndex="-1"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 id="modal-title" className="text-xl font-semibold">Adjust Stock</h2>
          <button 
            onClick={onClose} 
            className="text-textMuted hover:text-textMain transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6 p-4 bg-background rounded-lg border border-border">
          <p className="text-sm text-textMuted mb-1">Product</p>
          <p className="font-medium text-lg">{product.name}</p>
          <div className="flex gap-4 mt-2 text-sm">
            <p><span className="text-textMuted">SKU:</span> {product.sku}</p>
            <p><span className="text-textMuted">Current Stock:</span> <span className="font-semibold">{product.quantity}</span></p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-textMuted mb-1">Quantity Change (+/-)</label>
            <input 
              ref={amountInputRef}
              type="number" 
              value={changeAmount}
              onChange={(e) => setChangeAmount(e.target.value)}
              placeholder="e.g. 5 or -5"
              className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-primary text-textMain"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-textMuted mb-1">Reason</label>
            <input 
              type="text" 
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Restock, Damaged, Sold"
              className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-primary text-textMain"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 bg-background border border-border hover:bg-border text-textMain py-2 rounded-lg transition-colors font-medium"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="flex-1 bg-primary hover:bg-primaryHover text-white py-2 rounded-lg transition-colors font-medium disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StockModal;
