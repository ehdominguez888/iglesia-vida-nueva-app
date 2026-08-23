"use client";

import { Minus, Plus } from "lucide-react";

type VerseSelectProps = {
  startVerse: number | null;
  endVerse: number | null;
  onStartVerseChange: (value: number | null) => void;
  onEndVerseChange: (value: number | null) => void;
  rangeInvalid?: boolean;
};

/** Calcula el siguiente valor al sumar/restar; `null` se trata como «capítulo completo». */
const stepValue = (current: number | null, delta: number): number | null => {
  const next = (current ?? 1) + delta;
  return next >= 1 ? next : null;
};

const parseValue = (raw: string): number | null => {
  const trimmed = raw.trim();
  if (trimmed === "") return null;
  const value = Number(trimmed);
  return Number.isInteger(value) && value >= 1 ? value : null;
};

type VerseFieldProps = {
  label: string;
  value: number | null;
  onChange: (value: number | null) => void;
  invalid?: boolean;
};

const VerseField = ({ label, value, onChange, invalid = false }: VerseFieldProps) => (
  <div>
    <span className="mb-1 block text-xs font-medium text-muted-foreground">{label}</span>
    <div
      className={`flex items-center overflow-hidden rounded-2xl border bg-card transition-colors ${
        invalid ? "border-destructive" : "border-border"
      }`}
    >
      <button
        type="button"
        onClick={() => onChange(stepValue(value, -1))}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-l-2xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:scale-90"
        aria-label={`Quitar uno a ${label.toLowerCase()}`}
      >
        <Minus className="h-4 w-4" />
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={1}
        value={value ?? ""}
        placeholder="—"
        onChange={(event) => onChange(parseValue(event.target.value))}
        aria-label={label}
        className="h-12 w-full min-w-0 bg-transparent text-center text-base font-semibold text-foreground outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <button
        type="button"
        onClick={() => onChange(stepValue(value, 1))}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-r-2xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:scale-90"
        aria-label={`Agregar uno a ${label.toLowerCase()}`}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  </div>
);

const VerseSelect = ({
  startVerse,
  endVerse,
  onStartVerseChange,
  onEndVerseChange,
  rangeInvalid = false,
}: VerseSelectProps) => {
  return (
    <div className="rounded-3xl border border-border bg-card p-5">
      <p className="mb-1 text-sm font-semibold text-foreground">Versículos</p>
      <p className="mb-4 text-xs text-muted-foreground">
        Opcional: elige un versículo o un rango. Si no eliges, se abre el capítulo completo.
      </p>
      <div className="grid grid-cols-2 gap-3">
        <VerseField label="Inicio" value={startVerse} onChange={onStartVerseChange} />
        <VerseField
          label="Final (opcional)"
          value={endVerse}
          onChange={onEndVerseChange}
          invalid={rangeInvalid}
        />
      </div>
      {rangeInvalid ? (
        <p className="mt-3 text-xs font-medium text-destructive">
          El versículo final no puede ser menor que el inicial.
        </p>
      ) : null}
    </div>
  );
};

export default VerseSelect;