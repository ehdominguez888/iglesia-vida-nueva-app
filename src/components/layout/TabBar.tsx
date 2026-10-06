import { NavLink } from "react-router-dom";
import { Home, NotebookPen, HeartHandshake, HandHeart } from "lucide-react";

const TABS = [
  { to: "/", label: "Inicio", icon: Home, end: true },
  { to: "/notas", label: "Notas", icon: NotebookPen, end: false },
  { to: "/ofrenda", label: "Ofrenda", icon: HeartHandshake, end: false },
  { to: "/conectar", label: "Conectar", icon: HandHeart, end: false },
];

const TabBar = () => {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border/70 bg-background/90 backdrop-blur-md">
      <div className="mx-auto grid w-full max-w-3xl grid-cols-4">
        {TABS.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} className="block">
            {({ isActive }) => (
              <span
                className={`flex flex-col items-center gap-0.5 pt-2 pb-[max(0.6rem,env(safe-area-inset-bottom))] text-[11px] font-medium transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <span
                  className={`flex h-8 w-16 items-center justify-center rounded-full transition-colors ${
                    isActive ? "bg-primary/10" : ""
                  }`}
                >
                  <Icon className="h-5 w-5" strokeWidth={isActive ? 2.3 : 2} />
                </span>
                {label}
              </span>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default TabBar;