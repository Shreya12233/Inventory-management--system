import { Bell, Moon, ShieldCheck } from 'lucide-react';

const Settings = () => {
  return (
    <div className="max-w-3xl space-y-6 animate-in fade-in">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-textMuted mt-1">Basic preferences for the admin workspace.</p>
      </div>

      <div className="bg-surface border border-border rounded-xl divide-y divide-border">
        <div className="p-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium">Low stock alerts</p>
              <p className="text-sm text-textMuted">Show alerts when products reach minimum stock.</p>
            </div>
          </div>
          <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary" />
        </div>

        <div className="p-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Moon className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium">Dark mode</p>
              <p className="text-sm text-textMuted">Keep the dashboard in the dark theme.</p>
            </div>
          </div>
          <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary" />
        </div>

        <div className="p-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium">Admin session</p>
              <p className="text-sm text-textMuted">Require login before opening inventory pages.</p>
            </div>
          </div>
          <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary" />
        </div>
      </div>
    </div>
  );
};

export default Settings;
