import Link from "next/link";

import { StatusBadge } from "@/components/trilha/status-badge";
import { cn } from "@/lib/utils";
import type { Modulo, Trilha } from "@/lib/content/types";

export function ModuleCard({ trilha, modulo }: { trilha: Trilha; modulo: Modulo }) {
  const numero = String(modulo.catalogo.ordem).padStart(2, "0");
  const trilhaClass = trilha === "ia" ? "trilha-ia" : "trilha-dados";
  const numeroClass = trilha === "ia" ? "text-gold" : "text-cyan-brand";

  return (
    <Link
      href={`/trilha/${trilha}/${modulo.catalogo.slug}`}
      className={cn("card-surface block rounded-xl p-5", trilhaClass)}
    >
      <div className="flex items-start justify-between gap-3">
        <span className={cn("modulo-numero text-2xl font-semibold", numeroClass)}>{numero}</span>
        <StatusBadge status={modulo.status} />
      </div>
      <h3 className="mt-3 text-base font-medium leading-snug text-foreground">
        {modulo.catalogo.titulo}
      </h3>
    </Link>
  );
}
