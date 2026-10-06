import { useState } from "react";
import { Filter, X } from "lucide-react";
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
  onFilter: (filters: { icon?: string; color?: string }) => void;
  activeFilters: { icon?: string; color?: string };
};

const NoteFilters = ({ onFilter, activeFilters }: NoteFiltersProps) => {
  const [showFilters, setShowFilters] = useState(false);

  const clearFilters = () => {
    onFilter({});
  };

  const hasActiveFilters = activeFilters.icon || activeFilters.color;

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
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
            Limpiar filtros
          </Button>
        )}
      </div>

      {showFilters && (
        <div className="mt-4 rounded-2xl border border-border bg-card p-4">
          <div className="space-y-6">
            {/* Filter by Icon */}
            <div>
              <h3 className="mb-3 font-medium text-foreground">Ícono</h3>
              <div className="flex flex-wrap gap-2">
                {ICONS.map((icon) => {
                  const IconComponent = icon.component;
                  const isActive = activeFilters.icon === icon.id;
                  return (
                    <button
                      key={icon.id}
                      type="button"
                      onClick={() => 
                        onFilter({ 
                          ...activeFilters, 
                          icon: isActive ? undefined : icon.id 
                        })
                      }
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl text-white transition-all ${
                        isActive ? "ring-2 ring-primary ring-offset-2" : "opacity-70 hover:opacity-100"
                      } ${
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
                      }`}
                      aria-label={icon.name}
                    >
                      <IconComponent className="h-6 w-6" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter by Color */}
            <div>
              <h3 className="mb-3 font-medium text-foreground">Color</h3>
              <div className="flex flex-wrap gap-2">
                {COLORS.map((color) => {
                  const isActive = activeFilters.color === color.id;
                  return (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => 
                        onFilter({ 
                          ...activeFilters, 
                          color: isActive ? undefined : color.id 
                        })
                      }
                      className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
                        isActive ? "ring-2 ring-primary ring-offset-2" : "opacity-70 hover:opacity-100"
                      } ${color.class}`}
                      aria-label={color.name}
                    >
                      {isActive && <X className="h-5 w-5 text-white" />}
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