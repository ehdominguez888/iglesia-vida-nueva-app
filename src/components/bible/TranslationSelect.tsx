import { ChevronDown, Languages } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BIBLE_TRANSLATIONS, type BibleTranslation } from "@/lib/bible";

type TranslationSelectProps = {
  value: BibleTranslation;
  onChange: (translation: BibleTranslation) => void;
};

const TranslationSelect = ({ value, onChange }: TranslationSelectProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          className="flex h-11 items-center gap-2 rounded-2xl border border-border bg-card px-3.5 text-sm font-semibold text-foreground active:scale-[0.98]"
        >
          <Languages className="h-4 w-4 text-primary" />
          <span>{value.short}</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-3xl">
        <SheetHeader className="pb-3 text-left">
          <SheetTitle className="font-display text-lg">Versión de la Biblia</SheetTitle>
        </SheetHeader>
        <div className="-mx-4 space-y-5 overflow-y-auto px-4 pb-6">
          {(["es", "en"] as const).map((language) => (
            <div key={language}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {language === "es" ? "Español" : "Inglés"}
              </p>
              <div className="space-y-1.5">
                {BIBLE_TRANSLATIONS.filter((t) => t.language === language).map((translation) => (
                  <SheetClose asChild key={translation.id}>
                    <button
                      type="button"
                      onClick={() => onChange(translation)}
                      className={`flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition-colors ${
                        translation.id === value.id
                          ? "border-primary/40 bg-primary/10 text-foreground"
                          : "border-transparent bg-muted/60 text-foreground"
                      }`}
                    >
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold">{translation.label}</span>
                        <span className="text-xs text-muted-foreground">
                          {translation.origin}
                        </span>
                      </span>
                      <span className="shrink-0 rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground">
                        {translation.short}
                      </span>
                    </button>
                  </SheetClose>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default TranslationSelect;