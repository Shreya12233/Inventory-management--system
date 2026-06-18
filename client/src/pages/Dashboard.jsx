import { useState, useEffect } from 'react';
import { Package, DollarSign, AlertTriangle, Layers } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { productApi } from '../services/api';

const StatCard = ({ title, value, icon: Icon, colorClass }) => (
  <div className="bg-surface p-6 rounded-xl border border-border shadow-sm flex items-center gap-4 transition-transform hover:-translate-y-1">
    <div className={`p-4 rounded-lg ${colorClass}`}>
      <Icon className="w-8 h-8 text-white" />
    </div>
    <div>
      <p className="text-textMuted text-sm font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-textMain mt-1">{value}</h3>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({ totalProducts: 0, totalQuantity: 0, lowStockCount: 0, inventoryValue: 0 });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, productsResult] = await Promise.all([
          productApi.getDashboardStats(),
          productApi.getAll({ sortBy: 'quantity', order: 'DESC', limit: 10 }) // Get top stock items
        ]);
        setStats(statsData);
        setProducts(productsResult.data); // result has .data and .pagination
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center text-textMuted mt-10">Loading Dashboard...</div>;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Products" value={stats.totalProducts} icon={Package} colorClass="bg-blue-500" />
        <StatCard title="Total Inventory" value={stats.totalQuantity} icon={Layers} colorClass="bg-indigo-500" />
        <StatCard title="Low Stock Items" value={stats.lowStockCount} icon={AlertTriangle} colorClass="bg-red-500" />
        <StatCard title="Inventory Value" value={`$${stats.inventoryValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`} icon={DollarSign} colorClass="bg-emerald-500" />
      </div>

      <div className="bg-surface p-6 rounded-xl border border-border shadow-sm">
        <h3 className="text-lg font-semibold mb-6">Top Stock Quantities</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={products} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{ fill: '#334155', opacity: 0.4 }}
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }}
              />
              <Bar dataKey="quantity" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
