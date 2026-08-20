import { Link, NavLink } from "react-router-dom";
import CHURCH_CONFIG from "@/data/church-config";

const NAV = [
  { to: "/", label: "Inicio", end: true },
  { to: "/notas", label: "Notas", end: false },
  { to: "/biblia", label: "Biblia", end: false },
  { to: "/ofrenda", label: "Ofrenda", end: false },
];

const Header = () => {
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-3xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/icon.svg" alt="" className="h-9 w-9 rounded-xl shadow-sm" />
          <span className="font-display text-lg font-semibold leading-tight text-foreground">
            {CHURCH_CONFIG.name}
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;