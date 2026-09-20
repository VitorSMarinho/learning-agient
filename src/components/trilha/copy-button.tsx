"use client";

import { useState } from "react";

export function ComandoBox({ comando }: { comando: string }) {
  const [copiado, setCopiado] = useState(false);

  async function copiar() {
    try {
      await navigator.clipboard.writeText(comando);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 1500);
    } catch {
      // clipboard indisponível (http local, permissão negada) — ignora, comando ainda é selecionável
    }
  }

  return (
    <div className="relative">
      <pre className="overflow-x-auto rounded-lg border border-border bg-black/40 p-3 pr-16 font-mono text-xs leading-relaxed text-foreground">
        {comando}
      </pre>
      <button
        type="button"
        onClick={copiar}
        className="absolute right-2 top-2 rounded-md border border-border bg-secondary px-2 py-1 font-mono text-[0.65rem] uppercase text-muted-foreground hover:text-foreground"
      >
        {copiado ? "copiado" : "copiar"}
      </button>
    </div>
  );
}
