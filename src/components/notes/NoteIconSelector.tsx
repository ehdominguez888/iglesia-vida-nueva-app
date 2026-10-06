import { useState, useRef, useEffect } from "react";
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

const ICON_OPTIONS = [
  { id: "heart", label: "Corazón", icon: Heart },
  { id: "home", label: "Casa", icon: Home },
  { id: "book", label: "Biblia", icon: BookOpen },
  { id: "cross", label: "Cruz", icon: Crosshair },
  { id: "user", label: "Persona", icon: User },
  { id: "star", label: "Estrella", icon: Star },
  { id: "sun", label: "Sol", icon: Sun },
  { id: "moon", label: "Luna", icon: Moon },
  { id: "cloud", label: "Nube", icon: Cloud },
  { id: "tree", label: "Árbol", icon: TreePine },
  { id: "mountain", label: "Montaña", icon: Mountain },
  { id: "waves", label: "Olas", icon: Waves },
  { id: "zap", label: "Rayo", icon: Zap },
  { id: "shield", label: "Escudo", icon: Shield }
];

const COLOR_OPTIONS = [
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

type NoteIconSelectorProps = {
  icon?: string;
  color?: string;
  onSelect: (icon: string, color: string) => void;
  onClose: () => void;
};

const NoteIconSelector = ({ icon, color, onSelect, onClose }: NoteIconSelectorProps) => {
  const [selectedIcon, setSelectedIcon] = useState(icon || "heart");
  const [selectedColor, setSelectedColor] = useState(color || "blue");
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleSave = () => {
    onSelect(selectedIcon, selectedColor);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div 
        ref={modalRef}
        className="w-full max-w-md rounded-3xl bg-card p-6"
      >
        <h3 className="mb-4 text-center font-display text-lg font-semibold">
          Personalizar nota
        </h3>
        
        <div className="mb-6">
          <p className="mb-3 text-sm font-medium text-foreground">Selecciona un ícono</p>
          <div className="grid grid-cols-5 gap-3">
            {ICON_OPTIONS.map(({ id, icon: IconComponent }) => (
              <button
                key={id}
                type="button"
                onClick={() => setSelectedIcon(id)}
                className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-all ${
                  selectedIcon === id
                    ? "bg-primary/10 ring-2 ring-primary"
                    : "bg-muted hover:bg-muted/80"
                }`}
                aria-label={id}
              >
                <IconComponent 
                  className={`h-6 w-6 ${
                    selectedIcon === id ? "text-primary" : "text-foreground"
                  }`} 
                />
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <p className="mb-3 text-sm font-medium text-foreground">Selecciona un color</p>
          <div className="grid grid-cols-6 gap-3">
            {COLOR_OPTIONS.map(({ id, class: colorClass }) => (
              <button
                key={id}
                type="button"
                onClick={() => setSelectedColor(id)}
                className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
                  selectedColor === id
                    ? "ring-2 ring-primary ring-offset-2"
                    : "ring-1 ring-border"
                } ${colorClass}`}
                aria-label={id}
              />
            ))}
          </div>
        </div>
        
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-2xl border border-border bg-muted py-3 font-medium text-foreground"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 rounded-2xl bg-primary py-3 font-medium text-primary-foreground"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteIconSelector;