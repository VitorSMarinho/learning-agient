import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="bg-grid min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
        <p className="modulo-numero text-xs uppercase tracking-widest text-muted-foreground">
          Learning Agient
        </p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
          <span className="text-gold">Método Agient</span>: aprendizado 100% mão na massa.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          Sem videoaula, sem índice de links pra ler depois e esquecer. Cada módulo entrega um
          projeto real, revisado por um subagente especialista de código, com a mesma exigência
          de um code review de produção. O progresso não é marcado por "assisti", é marcado por
          "funciona e passou na revisão".
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <Link href="/trilha/ia" className="card-surface trilha-ia block rounded-xl p-6">
            <p className="modulo-numero text-xs uppercase tracking-widest text-muted-foreground">
              Trilha 1 — 12 módulos
            </p>
            <h2 className="mt-2 text-xl font-medium text-gold">Engenharia de IA</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Do fundamento ao deploy: RAG, Agentes, OCR, Fine-Tuning.
            </p>
          </Link>
          <Link href="/trilha/dados" className="card-surface trilha-dados block rounded-xl p-6">
            <p className="modulo-numero text-xs uppercase tracking-widest text-muted-foreground">
              Trilha 2 — 14 módulos
            </p>
            <h2 className="mt-2 text-xl font-medium text-cyan-brand">Engenharia de Dados</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Pipelines robustos e escaláveis para produção.
            </p>
          </Link>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/trilha/ia">Começar pela Trilha de IA</Link>
          </Button>
          <Button asChild variant="outline">
            <a
              href="https://github.com/VitorSMarinho/learning-agient-ai-engineer"
              target="_blank"
              rel="noreferrer"
            >
              Ver repositório no GitHub
            </a>
          </Button>
        </div>
      </div>
    </main>
  );
}
