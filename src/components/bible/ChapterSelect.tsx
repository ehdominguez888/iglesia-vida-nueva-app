import { ChevronDown, Hash } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

type ChapterSelectProps = {
  bookName: string;
  totalChapters: number;
  value: number;
  onChange: (chapter: number) => void;
};

const ChapterSelect = ({ bookName, totalChapters, value, onChange }: ChapterSelectProps) => {
  const chapters = Array.from({ length: totalChapters }, (_, index) => index + 1);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          className="flex h-11 items-center gap-2 rounded-2xl border border-border bg-card px-3.5 text-sm font-semibold text-foreground active:scale-[0.98]"
        >
          <Hash className="h-4 w-4 text-primary" />
          <span>Cap. {value}</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-3xl">
        <SheetHeader className="pb-3 text-left">
          <SheetTitle className="font-display text-lg">
            {bookName} · capítulos
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[60dvh]">
          <div className="grid grid-cols-6 gap-2 px-1 pb-6 sm:grid-cols-8">
            {chapters.map((chapter) => (
              <SheetClose asChild key={chapter}>
                <button
                  type="button"
                  onClick={() => onChange(chapter)}
                  className={`flex h-10 items-center justify-center rounded-xl text-sm font-semibold transition-colors ${
                    chapter === value
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/70 text-foreground hover:bg-muted"
                  }`}
                >
                  {chapter}
                </button>
              </SheetClose>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default ChapterSelect;