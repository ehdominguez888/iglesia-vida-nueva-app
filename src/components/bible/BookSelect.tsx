import { BookOpenText, ChevronDown } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { OLD_TESTAMENT, NEW_TESTAMENT, type BibleBook } from "@/data/books";

type BookSelectProps = {
  value: BibleBook;
  onChange: (book: BibleBook) => void;
};

const BookSelect = ({ value, onChange }: BookSelectProps) => {
  const renderBook = (book: BibleBook) => (
    <SheetClose asChild key={book.code}>
      <button
        type="button"
        onClick={() => onChange(book)}
        className={`flex w-full items-center justify-between gap-3 rounded-xl px-3.5 py-3 text-left transition-colors ${
          book.code === value.code
            ? "bg-primary/10 text-primary"
            : "text-foreground hover:bg-muted/70"
        }`}
      >
        <span className="min-w-0 truncate text-sm font-medium">{book.name}</span>
        <span className="shrink-0 text-xs text-muted-foreground">{book.chapters}</span>
      </button>
    </SheetClose>
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          className="flex h-11 min-w-0 flex-1 items-center gap-2 rounded-2xl border border-border bg-card px-3.5 text-sm font-semibold text-foreground active:scale-[0.98]"
        >
          <BookOpenText className="h-4 w-4 shrink-0 text-primary" />
          <span className="min-w-0 flex-1 truncate">{value.name}</span>
          <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
        </button>
      </SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-3xl">
        <SheetHeader className="pb-3 text-left">
          <SheetTitle className="font-display text-lg">Elige un libro</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[60dvh]">
          <div className="space-y-5 px-1 pb-6">
            <div>
              <p className="mb-1 px-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Antiguo Testamento
              </p>
              <div className="space-y-0.5">
                {OLD_TESTAMENT.map(renderBook)}
              </div>
            </div>
            <div>
              <p className="mb-1 px-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Nuevo Testamento
              </p>
              <div className="space-y-0.5">{NEW_TESTAMENT.map(renderBook)}</div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default BookSelect;