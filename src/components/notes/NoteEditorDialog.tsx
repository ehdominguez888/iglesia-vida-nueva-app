import { useEffect, useRef, useState } from "react";
import { Camera, ImagePlus, Loader2, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { fileToNotePhoto } from "@/utils/image";
import type { SermonNote } from "@/hooks/use-sermon-notes";
import { todayISO } from "@/hooks/use-sermon-notes";

export type NoteDraft = {
  title: string;
  date: string;
  content: string;
  photos: string[];
  icon?: string;
  color?: string;
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
  const [photos, setPhotos] = useState<string[]>(note?.photos ?? []);
  const [busy, setBusy] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const galleryInput = useRef<HTMLInputElement>(null);
  const cameraInput = useRef<HTMLInputElement>(null);

  // Reiniciamos los campos cada vez que se abre el diálogo.
  useEffect(() => {
    if (open) {
      setTitle(note?.title ?? "");
      setDate(note?.date ?? todayISO());
      setContent(note?.content ?? "");
      setPhotos(note?.photos ?? []);
      setConfirmDelete(false);
    }
  }, [open, note]);

  const addFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setBusy(true);
    try {
      const converted = await Promise.all(Array.from(files, fileToNotePhoto));
      const added = converted.filter((photo): photo is string => photo !== null);
      if (added.length === 0) return;
      setPhotos((prev) => [...prev, ...added]);
    } finally {
      setBusy(false);
      // Permitimos que el usuario vuelva a elegir el mismo archivo.
      if (galleryInput.current) galleryInput.current.value = "";
      if (cameraInput.current) cameraInput.current.value = "";
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave({ title, date, content, photos, icon: note?.icon, color: note?.color });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[92dvh] overflow-hidden">
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

          {/* Fotografías */}
          <div className="space-y-3">
            {photos.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {photos.map((photo, index) => (
                  <div key={index} className="relative group/photo">
                    <img
                      src={photo}
                      alt={`Foto ${index + 1}`}
                      className="h-20 w-20 rounded-2xl object-cover border border-border"
                    />
                    <button
                      type="button"
                      onClick={() => setPhotos((prev) => prev.filter((_, i) => i !== index))}
                      aria-label="Quitar foto"
                      className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-foreground/90 text-white shadow-sm active:scale-90"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : null}

            <div className="flex gap-2">
              <input
                ref={cameraInput}
                type="file"
                accept="image/*"
                capture="environment"
                multiple
                className="hidden"
                onChange={(event) => addFiles(event.target.files)}
              />
              <input
                ref={galleryInput}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(event) => addFiles(event.target.files)}
              />
              <Button
                type="button"
                variant="outline"
                disabled={busy}
                onClick={() => cameraInput.current?.click()}
                className="flex-1"
              >
                {busy ? (
                  <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                ) : (
                  <Camera className="mr-1 h-4 w-4" />
                )}
                Tomar foto
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={busy}
                onClick={() => galleryInput.current?.click()}
                className="flex-1"
              >
                <ImagePlus className="mr-1 h-4 w-4" />
                Galería
              </Button>
            </div>
          </div>

          <Textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Escribe aquí tus apuntes…"
            rows={5}
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
              <Button type="submit" disabled={busy}>
                Guardar
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NoteEditorDialog;