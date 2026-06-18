import { useState, useEffect } from 'react';
import { movementApi } from '../services/api';
import { Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { toast } from 'react-toastify';

const StockMovements = () => {
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchMovements();
  }, [page]);

  const fetchMovements = async () => {
    try {
      setLoading(true);
      const result = await movementApi.getAll({ page, limit: 15 });
      setMovements(result.data);
      setTotalPages(result.pagination.totalPages || 1);
    } catch (error) {
      toast.error('Failed to load stock movements');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'
    }).format(date);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Activity className="text-primary w-6 h-6" /> 
            Stock Movements History
          </h1>
          <p className="text-textMuted mt-1">Recent inventory adjustments and changes.</p>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-background/50 border-b border-border text-textMuted uppercase">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Change</th>
                <th className="px-6 py-4">Reason</th>
                <th className="px-6 py-4">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr><td colSpan="6" className="px-6 py-8 text-center text-textMuted">Loading...</td></tr>
              ) : movements.length === 0 ? (
                <tr><td colSpan="6" className="px-6 py-8 text-center text-textMuted">No movements recorded.</td></tr>
              ) : (
                movements.map((movement) => (
                  <tr key={movement.id} className="hover:bg-background/50 transition-colors">
                    <td className="px-6 py-4 text-textMuted whitespace-nowrap">{formatDate(movement.created_at)}</td>
                    <td className="px-6 py-4 font-medium">
                      {movement.product_name}
                      <span className="block text-xs text-textMuted font-normal mt-0.5">{movement.product_sku}</span>
                    </td>
                    <td className="px-6 py-4">
                      {movement.change_amount > 0 ? (
                        <span className="inline-flex items-center gap-1 text-success bg-success/10 px-2 py-1 rounded text-xs border border-success/20">
                          <ArrowUpRight className="w-3 h-3" /> In
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-danger bg-danger/10 px-2 py-1 rounded text-xs border border-danger/20">
                          <ArrowDownRight className="w-3 h-3" /> Out
                        </span>
                      )}
                    </td>
                    <td className={`px-6 py-4 font-bold ${movement.change_amount > 0 ? 'text-success' : 'text-danger'}`}>
                      {movement.change_amount > 0 ? '+' : ''}{movement.change_amount}
                    </td>
                    <td className="px-6 py-4 text-textMuted">{movement.reason}</td>
                    <td className="px-6 py-4">
                      <span className="text-textMuted line-through mr-2 text-xs">{movement.previous_quantity}</span>
                      <span className="font-semibold">{movement.new_quantity}</span>
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
    </div>
  );
};

export default StockMovements;
