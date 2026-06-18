import { useEffect, useRef, useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, PlusCircle, AlertTriangle, Activity, LogOut, Settings, User } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Products', path: '/products', icon: Package },
    { name: 'Add Product', path: '/products/add', icon: PlusCircle },
    { name: 'Low Stock', path: '/low-stock', icon: AlertTriangle },
    { name: 'Movements', path: '/movements', icon: Activity },
  ];

  return (
    <aside className="w-64 bg-surface border-r border-border min-h-screen flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
          <Package className="w-8 h-8" />
          Invenio
        </h1>
        <p className="text-textMuted text-sm mt-1">Inventory System</p>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-textMuted hover:bg-surface hover:text-textMain'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!profileRef.current?.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  const goTo = (path) => {
    setIsProfileOpen(false);
    navigate(path);
  };

  const handleSignOut = () => {
    localStorage.removeItem('invenio-auth');
    setIsProfileOpen(false);
    navigate('/login', { replace: true });
  };

  return (
    <header className="bg-surface border-b border-border h-16 flex items-center px-8 justify-between sticky top-0 z-10">
      <h2 className="text-xl font-semibold text-textMain">Admin Portal</h2>
      <div className="relative flex items-center gap-4" ref={profileRef}>
        <button
          type="button"
          onClick={() => setIsProfileOpen((open) => !open)}
          aria-haspopup="menu"
          aria-expanded={isProfileOpen}
          className="w-9 h-9 bg-primary hover:bg-primaryHover rounded-full flex items-center justify-center font-bold text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2 focus:ring-offset-surface"
        >
          AD
        </button>

        {isProfileOpen && (
          <div
            role="menu"
            className="absolute right-0 top-12 w-56 overflow-hidden rounded-lg border border-border bg-surface shadow-xl"
          >
            <div className="px-4 py-3 border-b border-border">
              <p className="text-sm font-semibold text-textMain">Admin User</p>
              <p className="text-xs text-textMuted">Lenovo</p>
            </div>
            <button
              type="button"
              role="menuitem"
              onClick={() => goTo('/profile')}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-textMuted hover:bg-background hover:text-textMain transition-colors"
            >
              <User className="w-4 h-4" />
              Profile
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={() => goTo('/settings')}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-textMuted hover:bg-background hover:text-textMain transition-colors"
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={handleSignOut}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-danger hover:bg-background transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col max-h-screen overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
