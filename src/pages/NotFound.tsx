import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-card flex items-center justify-center overflow-hidden shadow-lg">
          <img src="/images/UBAZAR_logo_50x50.png" alt="UBazar Logo" className="w-full h-full object-contain" />
        </div>
        <h1 className="mb-2 text-4xl font-bold text-foreground">404</h1>
        <p className="mb-6 text-lg text-muted-foreground">Sahifa topilmadi</p>
        <a href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-xl font-semibold hover:bg-accent/90 transition-colors">
          <Home className="w-4 h-4" />
          Bosh sahifaga qaytish
        </a>
      </div>
    </div>
  );
};

export default NotFound;