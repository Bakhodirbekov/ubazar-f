import { Bell, Car, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export function Header() {
  const { isAuthenticated, user } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center overflow-hidden">
            <img src="/images/UBAZAR_logo_50x50.png" alt="UBazar Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-base font-bold text-foreground leading-tight">UBazar</h1>
            <p className="text-[10px] text-muted-foreground leading-tight">Avtomobillar bozori</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isAuthenticated && (
            <button className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center relative">
              <Bell className="w-4 h-4 text-foreground" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-accent rounded-full" />
            </button>
          )}

          {isAuthenticated && (user?.role === 'admin' || user?.role === 'moderator') && (
            <a 
              href="http://127.0.0.1:8000/admin/dashboard" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center"
              title="Admin Panel"
            >
              <Shield className="w-4 h-4" />
            </a>
          )}
          
          {isAuthenticated && user && (
            <div className="w-9 h-9 rounded-xl bg-secondary text-secondary-foreground flex items-center justify-center font-semibold text-sm">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
