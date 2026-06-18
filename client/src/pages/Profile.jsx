import { Mail, Shield, User } from 'lucide-react';

const Profile = () => {
  const username = localStorage.getItem('invenio-user') || 'admin';

  return (
    <div className="max-w-3xl space-y-6 animate-in fade-in">
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-textMuted mt-1">Your admin account details.</p>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="flex items-center gap-4 border-b border-border pb-6">
          <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-xl font-bold text-white">
            AD
          </div>
          <div>
            <p className="text-lg font-semibold">Admin User</p>
            <p className="text-sm text-textMuted">Lenovo</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
          <div className="bg-background border border-border rounded-lg p-4">
            <User className="w-5 h-5 text-primary mb-3" />
            <p className="text-xs uppercase text-textMuted">Username</p>
            <p className="font-medium mt-1">{username}</p>
          </div>
          <div className="bg-background border border-border rounded-lg p-4">
            <Mail className="w-5 h-5 text-primary mb-3" />
            <p className="text-xs uppercase text-textMuted">Email</p>
            <p className="font-medium mt-1">admin@invenio.local</p>
          </div>
          <div className="bg-background border border-border rounded-lg p-4">
            <Shield className="w-5 h-5 text-primary mb-3" />
            <p className="text-xs uppercase text-textMuted">Role</p>
            <p className="font-medium mt-1">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
