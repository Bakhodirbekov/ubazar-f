import { useState } from 'react';
import { X, Mail, Lock, User, Phone, Eye, EyeOff, Car } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, register } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === 'login') {
        await login(formData.email, formData.password);
      } else {
        await register(formData.name, formData.phone, formData.email, formData.password);
      }
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm fade-in flex items-end sm:items-center justify-center">
      <div className="w-full max-w-md bg-card rounded-t-3xl sm:rounded-3xl shadow-xl slide-up overflow-hidden">
        {/* Header */}
        <div className="relative px-6 pt-6 pb-4">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center">
              <Car className="w-6 h-6 text-accent-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">InsofAuto</h2>
              <p className="text-sm text-muted-foreground">Insof bilan sotiladi</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex px-6 mb-4">
          <button
            onClick={() => setMode('login')}
            className={cn(
              'flex-1 py-2.5 text-sm font-semibold border-b-2 transition-colors',
              mode === 'login'
                ? 'border-accent text-accent'
                : 'border-transparent text-muted-foreground'
            )}
          >
            Kirish
          </button>
          <button
            onClick={() => setMode('register')}
            className={cn(
              'flex-1 py-2.5 text-sm font-semibold border-b-2 transition-colors',
              mode === 'register'
                ? 'border-accent text-accent'
                : 'border-transparent text-muted-foreground'
            )}
          >
            Ro'yxatdan o'tish
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
          {mode === 'register' && (
            <>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Ismingiz"
                  value={formData.name}
                  onChange={(e) => setFormData(f => ({ ...f, name: e.target.value }))}
                  className="w-full h-12 pl-11 pr-4 rounded-xl bg-muted text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="tel"
                  placeholder="+998 90 123 45 67"
                  value={formData.phone}
                  onChange={(e) => setFormData(f => ({ ...f, phone: e.target.value }))}
                  className="w-full h-12 pl-11 pr-4 rounded-xl bg-muted text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
              </div>
            </>
          )}

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData(f => ({ ...f, email: e.target.value }))}
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-muted text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Parol"
              value={formData.password}
              onChange={(e) => setFormData(f => ({ ...f, password: e.target.value }))}
              className="w-full h-12 pl-11 pr-11 rounded-xl bg-muted text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 rounded-xl bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Kuting...' : mode === 'login' ? 'Kirish' : 'Ro\'yxatdan o\'tish'}
          </button>

          <p className="text-center text-xs text-muted-foreground">
            Davom etish orqali siz{' '}
            <span className="text-accent">Foydalanish shartlari</span>
            {' '}va{' '}
            <span className="text-accent">Maxfiylik siyosati</span>
            {' '}ga rozilik bildirasiz
          </p>
        </form>
      </div>
    </div>
  );
}
