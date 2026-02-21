import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Accueil", path: "/" },
  { label: "Dashboard", path: "/dashboard" },
  { label: "Matériaux", path: "/materiaux" },
  { label: "À propos", path: "/a-propos" },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-display font-bold text-primary">Surg</span>
          <span className="text-xl font-display font-bold text-secondary">Green</span>
        </Link>
        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
