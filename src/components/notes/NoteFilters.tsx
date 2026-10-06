import { useState, useRef, useEffect } from "react";
import { Filter, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Home, 
  BookOpen, 
  Crosshair, 
  User, 
  Star, 
  Sun, 
  Moon, 
  Cloud, 
  TreePine,
  Mountain,
  Waves,
  Zap,
  Shield
} from "lucide-react";

const ICONS = [
  { id: "heart", name: "Corazón", component: Heart },
  { id: "home", name: "Casa", component: Home },
  { id: "book", name: "Biblia", component: BookOpen },
  { id: "cross", name: "Cruz", component: Crosshair },
  { id: "user", name: "Persona", component: User },
  { id: "star", name: "Estrella", component: Star },
  { id: "sun", name: "Sol", component: Sun },
  { id: "moon", name: "Luna", component: Moon },
  { id: "cloud", name: "Nube", component: Cloud },
  { id: "tree", name: "Árbol", component: TreePine },
  { id: "mountain", name: "Montaña", component: Mountain },
  { id: "waves", name: "Olas", component: Waves },
  { id: "zap", name: "Rayo", component: Zap },
  { id: "shield", name: "Escudo", component: Shield }
];

const COLORS = [
  { id: "red", name: "Rojo", class: "bg-red-500" },
  { id: "orange", name: "Naranja", class: "bg-orange-500" },
  { id: "amber", name: "Ámbar", class: "bg-amber-500" },
  { id: "yellow", name: "Amarillo", class: "bg-yellow-500" },
  { id: "lime", name: "Lima", class: "bg-lime-500" },
  { id: "green", name: "Verde", class: "bg-green-500" },
  { id: "emerald", name: "Esmeralda", class: "bg-emerald-500" },
  { id: "teal", name: "Turquesa", class: "bg-teal-500" },
  { id: "cyan", name: "Cian", class: "bg-cyan-500" },
  { id: "sky", name: "Celeste", class: "bg-sky-500" },
  { id: "blue", name: "Azul", class: "bg-blue-500" },
  { id: "indigo", name: "Índigo", class: "bg-indigo-500" },
  { id: "violet", name: "Violeta", class: "bg-violet-500" },
  { id: "purple", name: "Púrpura", class: "bg-purple-500" },
  { id: "fuchsia", name: "Fucsia", class: "bg-fuchsia-500" },
  { id: "pink", name: "Rosa", class: "bg-pink-500" },
  { id: "rose", name: "Rosado", class: "bg-rose-500" }
];

type NoteFiltersProps = {
  onFilter: (filters: { icons: string[]; colors: string[] }) => void;
  activeFilters: { icons: string[]; colors: string[] };
};

const NoteFilters = ({ onFilter, activeFilters }: NoteFiltersProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleIcon = (iconId: string) => {
    const newIcons = activeFilters.icons.includes(iconId)
      ? activeFilters.icons.filter(id => id !== iconId)
      : [...activeFilters.icons, iconId];
    
    onFilter({ ...activeFilters, icons: newIcons });
  };

  const toggleColor = (colorId: string) => {
    const newColors = activeFilters.colors.includes(colorId)
      ? activeFilters.colors.filter(id => id !== colorId)
      : [...activeFilters.colors, colorId];
    
    onFilter({ ...activeFilters, colors: newColors });
  };

  const clearFilters = () => {
    onFilter({ icons: [], colors: [] });
  };

  const hasActiveFilters = activeFilters.icons.length > 0 || activeFilters.colors.length > 0;

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={() => setShowDropdown(!showDropdown)}
          className="h-10 rounded-full"
        >
          <Filter className="mr-2 h-4 w-4" />
          Filtros
          {hasActiveFilters && (
            <span className="ml-2 h-2 w-2 rounded-full bg-primary"></span>
          )}
        </Button>
        
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-10 rounded-full text-muted-foreground hover:text-foreground"
          >
            <X className="mr-1 h-4 w-4" />
            Limpiar
          </Button>
        )}
      </div>

      {showDropdown && (
        <div 
          className="absolute left-0 top-full z-50 mt-2 w-80 rounded-2xl border border-border bg-card p-4 shadow-lg"
          style={{ zIndex: 1000 }}
        >
          <div className="grid grid-cols-2 gap-6">
            {/* Filter by Icon */}
            <div>
              <h3 className="mb-3 font-medium text-foreground">Íconos</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {ICONS.map((icon) => {
                  const IconComponent = icon.component;
                  const isSelected = activeFilters.icons.includes(icon.id);
                  return (
                    <button
                      key={icon.id}
                      type="button"
                      onClick={() => toggleIcon(icon.id)}
                      className={`flex w-full items-center gap-3 rounded-lg p-2 text-left text-sm transition-colors ${
                        isSelected 
                          ? "bg-primary/10 text-primary" 
                          : "hover:bg-muted"
                      }`}
                    >
                      <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-white ${
                        icon.id === "heart" ? "bg-red-500" :
                        icon.id === "home" ? "bg-orange-500" :
                        icon.id === "book" ? "bg-amber-500" :
                        icon.id === "cross" ? "bg-yellow-500" :
                        icon.id === "user" ? "bg-lime-500" :
                        icon.id === "star" ? "bg-green-500" :
                        icon.id === "sun" ? "bg-emerald-500" :
                        icon.id === "moon" ? "bg-teal-500" :
                        icon.id === "cloud" ? "bg-cyan-500" :
                        icon.id === "tree" ? "bg-sky-500" :
                        icon.id === "mountain" ? "bg-blue-500" :
                        icon.id === "waves" ? "bg-indigo-500" :
                        icon.id === "zap" ? "bg-violet-500" :
                        icon.id === "shield" ? "bg-purple-500" : "bg-blue-500"
                      }`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <span className="flex-1 truncate">{icon.name}</span>
                      {isSelected && <Check className="h-4 w-4 text-primary" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter by Color */}
            <div>
              <h3 className="mb-3 font-medium text-foreground">Colores</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {COLORS.map((color) => {
                  const isSelected = activeFilters.colors.includes(color.id);
                  return (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => toggleColor(color.id)}
                      className={`flex w-full items-center gap-3 rounded-lg p-2 text-left text-sm transition-colors ${
                        isSelected 
                          ? "bg-primary/10 text-primary" 
                          : "hover:bg-muted"
                      }`}
                    >
                      <div className={`h-4 w-4 flex-shrink-0 rounded-full ${color.class}`}></div>
                      <span className="flex-1 truncate">{color.name}</span>
                      {isSelected && <Check className="h-4 w-4 text-primary" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteFilters;