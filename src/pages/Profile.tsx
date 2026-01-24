import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { AuthModal } from '@/components/AuthModal';
import { useAuth } from '@/contexts/AuthContext';
import { User, Heart, Settings, LogOut, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { showAuthModal, setShowAuthModal, isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="safe-bottom px-4 py-4">
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
              <User className="w-8 h-8 text-secondary-foreground" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Profilingiz
            </h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              Kirish orqali mashinalarni to'liq ko'ring va e'lonlar joylashtiring
            </p>
            <button
              onClick={() => setShowAuthModal(true)}
              className="px-6 py-3 bg-accent text-accent-foreground rounded-xl font-semibold hover:bg-accent/90 transition-colors"
            >
              Kirish / Ro'yxatdan o'tish
            </button>
          </div>
        </main>

        <BottomNav />
        
        <AuthModal 
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      </div>
    );
  }

  const menuItems = [
    { icon: Heart, label: 'Saralangan mashinalar', count: 0, path: '/favorites' },
    { icon: Settings, label: 'Sozlamalar', path: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="safe-bottom px-4 py-4 space-y-4">
        {/* Profile Card */}
        <div className="bg-card rounded-2xl p-5 shadow-card">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-secondary text-secondary-foreground flex items-center justify-center text-2xl font-bold">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-foreground">{user?.name}</h2>
              <p className="text-sm text-muted-foreground">{user?.phone}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-card rounded-2xl shadow-card divide-y divide-border overflow-hidden">
          {menuItems.map(({ icon: Icon, label, count, path }) => (
            <button
              key={label}
              onClick={() => path && navigate(path)}
              className="w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                <Icon className="w-5 h-5 text-muted-foreground" />
              </div>
              <span className="flex-1 text-left font-medium text-foreground">
                {label}
              </span>
              {count !== undefined && (
                <span className="text-sm text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                  {count}
                </span>
              )}
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="w-full flex items-center gap-4 p-4 bg-card rounded-2xl shadow-card hover:bg-destructive/5 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
            <LogOut className="w-5 h-5 text-destructive" />
          </div>
          <span className="flex-1 text-left font-medium text-destructive">
            Chiqish
          </span>
        </button>
      </main>

      <BottomNav />
      
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
}
