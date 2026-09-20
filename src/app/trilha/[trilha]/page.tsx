import { notFound } from "next/navigation";

import { ModuleCard } from "@/components/trilha/module-card";
import { buscarTrilhaCompleta } from "@/lib/content/modulo";
import type { Trilha } from "@/lib/content/types";

const TITULOS: Record<Trilha, { titulo: string; descricao: string; classe: string }> = {
  ia: {
    titulo: "Engenharia de IA",
    descricao: "Do fundamento ao deploy: RAG, Agentes, OCR, Fine-Tuning.",
    classe: "text-gold",
  },
  dados: {
    titulo: "Engenharia de Dados",
    descricao: "Pipelines robustos e escaláveis para produção.",
    classe: "text-cyan-brand",
  },
};

export default async function TrilhaPage({
  params,
}: {
  params: Promise<{ trilha: string }>;
}) {
  const { trilha: trilhaParam } = await params;
  if (trilhaParam !== "ia" && trilhaParam !== "dados") notFound();
  const trilha = trilhaParam as Trilha;

  const modulos = await buscarTrilhaCompleta(trilha);
  const info = TITULOS[trilha];

  return (
    <main className="bg-grid min-h-screen">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <p className="modulo-numero text-xs uppercase tracking-widest text-muted-foreground">
          Learning Agient
        </p>
        <h1 className={`mt-2 text-3xl font-semibold ${info.classe}`}>{info.titulo}</h1>
        <p className="mt-2 text-muted-foreground">{info.descricao}</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modulos.map((modulo) => (
            <ModuleCard key={modulo.catalogo.id} trilha={trilha} modulo={modulo} />
          ))}
        </div>
      </div>
    </main>
  );
}
