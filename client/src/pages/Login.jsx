import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, LogIn, Package, User } from 'lucide-react';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: 'admin',
    password: 'admin123',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    window.setTimeout(() => {
      const username = formData.username.trim();
      const password = formData.password.trim();

      if (!username || !password) {
        setLoading(false);
        toast.error('Enter username and password');
        return;
      }

      localStorage.setItem('invenio-auth', 'true');
      localStorage.setItem('invenio-user', username);
      toast.success('Signed in successfully');
      navigate('/dashboard', { replace: true });
    }, 250);
  };

  return (
    <div className="min-h-screen bg-background text-textMain flex items-center justify-center px-6 py-10">
      <main className="w-full flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <div className="flex items-center gap-3 text-primary">
              <Package className="w-8 h-8" />
              <span className="text-2xl font-bold">Invenio</span>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-xl p-7 shadow-xl">
            <div className="mb-7">
              <h1 className="text-2xl font-bold">Sign in</h1>
              <p className="text-sm text-textMuted mt-2">Use your admin account to continue.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-textMuted" htmlFor="username">Username</label>
                <div className="relative">
                  <User className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" />
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-primary text-textMain"
                    autoComplete="username"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-textMuted" htmlFor="password">Password</label>
                <div className="relative">
                  <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-primary text-textMain"
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primaryHover text-white py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors font-medium disabled:opacity-60"
              >
                <LogIn className="w-4 h-4" />
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
