import { NavLink } from "react-router-dom";
import { Home, NotebookPen, HeartHandshake, HandHeart, BookOpen } from "lucide-react";

const TABS = [
  { to: "/", label: "Inicio", icon: Home, end: true },
  { to: "/notas", label: "Notas", icon: NotebookPen, end: false },
  { to: "/bible", label: "Biblia", icon: BookOpen, end: false },
  { to: "/ofrenda", label: "Ofrenda", icon: HeartHandshake, end: false },
  { to: "/conectar", label: "Conectar", icon: HandHeart, end: false },
];

const TabBar = () => {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border/70 bg-background/90 backdrop-blur-md">
      <div className="mx-auto grid w-full max-w-3xl grid-cols-5">
        {TABS.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} className="block">
            {({ isActive }) => (
              <span
                className={`flex flex-col items-center gap-0.5 pt-2 pb-[max(0.6rem,env(safe-area-inset-bottom))] text-[0.6875rem] sm:text-xs font-medium transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <span
                  className={`flex h-[2rem] w-[3.5rem] sm:h-[2.25rem] sm:w-[4rem] items-center justify-center rounded-full transition-colors ${
                    isActive ? "bg-primary/10" : ""
                  }`}
                >
                  <Icon
                    className="h-[1.25rem] w-[1.25rem] sm:h-[1.375rem] sm:w-[1.375rem]"
                    strokeWidth={isActive ? 2.3 : 2}
                  />
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