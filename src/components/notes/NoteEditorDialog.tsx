import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { SermonNote } from "@/hooks/use-sermon-notes";
import { todayISO } from "@/hooks/use-sermon-notes";

export type NoteDraft = {
  title: string;
  date: string;
  content: string;
};

type NoteEditorDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** La nota a editar, o `null` para crear una nueva. */
  note: SermonNote | null;
  onSave: (draft: NoteDraft) => void;
  onDelete: (id: string) => void;
};

const NoteEditorDialog = ({ open, onOpenChange, note, onSave, onDelete }: NoteEditorDialogProps) => {
  const [title, setTitle] = useState(note?.title ?? "");
  const [date, setDate] = useState(note?.date ?? todayISO());
  const [content, setContent] = useState(note?.content ?? "");
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Reiniciamos los campos cada vez que se abre el diálogo.
  useEffect(() => {
    if (open) {
      setTitle(note?.title ?? "");
      setDate(note?.date ?? todayISO());
      setContent(note?.content ?? "");
      setConfirmDelete(false);
    }
  }, [open, note]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave({ title, date, content });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-lg">
            {note ? "Editar nota" : "Nueva nota"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Título del sermón o tema"
            autoFocus
            className="h-12 rounded-2xl"
          />
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-muted-foreground">
              Fecha del sermón
            </span>
            <Input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="h-12 rounded-2xl"
            />
          </label>
          <Textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Escribe aquí tus apuntes…"
            rows={8}
            className="resize-none rounded-2xl py-3"
          />

          <div className="flex items-center justify-between gap-3 pt-1">
            <div>
              {note && !confirmDelete ? (
                <Button
                  type="button"
                  variant="ghost"
                  className="text-destructive hover:text-destructive"
                  onClick={() => setConfirmDelete(true)}
                >
                  Eliminar
                </Button>
              ) : null}
              {note && confirmDelete ? (
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      onDelete(note.id);
                      onOpenChange(false);
                    }}
                  >
                    Eliminar
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setConfirmDelete(false)}
                  >
                    No
                  </Button>
                </div>
              ) : null}
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit">Guardar</Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NoteEditorDialog;