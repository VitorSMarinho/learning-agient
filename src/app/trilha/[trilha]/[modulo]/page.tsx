import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { ComoFazer } from "@/components/trilha/como-fazer";
import { StatusBadge } from "@/components/trilha/status-badge";
import { buscarModulo } from "@/lib/content/modulo";
import { fetchRawFile, repoDaTrilha } from "@/lib/content/github";
import type { Trilha } from "@/lib/content/types";

export default async function ModuloPage({
  params,
}: {
  params: Promise<{ trilha: string; modulo: string }>;
}) {
  const { trilha: trilhaParam, modulo: slug } = await params;
  if (trilhaParam !== "ia" && trilhaParam !== "dados") notFound();
  const trilha = trilhaParam as Trilha;

  const modulo = await buscarModulo(trilha, slug);
  if (!modulo) notFound();

  const temProjeto = modulo.meta?.status_projeto === "completo" && modulo.meta.projeto_path;
  const projetoBase = temProjeto ? `modulos/${slug}/${modulo.meta!.projeto_path}` : null;
  const [enunciado, criterios] = projetoBase
    ? await Promise.all([
        fetchRawFile(trilha, `${projetoBase}ENUNCIADO.md`),
        fetchRawFile(trilha, `${projetoBase}CRITERIOS_ACEITE.md`),
      ])
    : [null, null];

  const repo = repoDaTrilha(trilha);
  const numero = String(modulo.catalogo.ordem).padStart(2, "0");
  const corTrilha = trilha === "ia" ? "text-gold" : "text-cyan-brand";

  return (
    <main className="bg-grid min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <p className="modulo-numero text-xs uppercase tracking-widest text-muted-foreground">
          {trilha === "ia" ? "Engenharia de IA" : "Engenharia de Dados"} · Módulo {numero}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h1 className={`text-3xl font-semibold ${corTrilha}`}>{modulo.catalogo.titulo}</h1>
          <StatusBadge status={modulo.status} />
        </div>

        {modulo.meta && (
          <p className="mt-2 text-sm text-muted-foreground">
            Revisor: <code>{modulo.meta.reviewer_agent}</code>
          </p>
        )}

        <article className="prose prose-invert mt-8 max-w-none prose-headings:font-medium prose-a:text-gold">
          {modulo.readme ? (
            <Markdown remarkPlugins={[remarkGfm]}>{modulo.readme}</Markdown>
          ) : (
            <p className="text-muted-foreground">Conteúdo ainda não publicado neste módulo.</p>
          )}
        </article>

        {temProjeto && (
          <section className="card-surface mt-10 rounded-xl p-6">
            <h2 className="text-lg font-medium">Projeto prático</h2>
            {enunciado && (
              <article className="prose prose-invert mt-4 max-w-none prose-headings:font-medium prose-a:text-gold">
                <Markdown remarkPlugins={[remarkGfm]}>{enunciado}</Markdown>
              </article>
            )}
            {criterios && (
              <details className="mt-6">
                <summary className="cursor-pointer text-sm text-muted-foreground">
                  Critérios de aceite (rubrica do review)
                </summary>
                <article className="prose prose-invert mt-4 max-w-none prose-headings:font-medium prose-a:text-gold">
                  <Markdown remarkPlugins={[remarkGfm]}>{criterios}</Markdown>
                </article>
              </details>
            )}
          </section>
        )}

        {temProjeto && (
          <ComoFazer repo={repo} slug={slug} titulo={modulo.catalogo.titulo} />
        )}

        {modulo.review && (
          <section className="card-surface mt-6 rounded-xl p-6">
            <h2 className="text-lg font-medium">Última revisão</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              PR #{modulo.review.pr_number} · revisado por <code>{modulo.review.reviewer_agent}</code> em{" "}
              {new Date(modulo.review.reviewed_at).toLocaleDateString("pt-BR")}
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {modulo.review.criterios.map((c, i) => (
                <li key={i} className="flex gap-2">
                  <span>{c.atendido ? "✅" : "❌"}</span>
                  <span>
                    {c.descricao}
                    {c.comentario && (
                      <span className="block text-muted-foreground">{c.comentario}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <a
          className="mt-10 inline-block text-sm text-muted-foreground underline hover:text-foreground"
          href={`https://github.com/VitorSMarinho/${repo}/tree/main/modulos/${slug}`}
          target="_blank"
          rel="noreferrer"
        >
          Ver módulo no GitHub
        </a>
      </div>
    </main>
  );
}
