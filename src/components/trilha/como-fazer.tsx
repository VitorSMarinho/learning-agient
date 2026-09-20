import { ComandoBox } from "./copy-button";

export function ComoFazer({
  repo,
  slug,
  titulo,
}: {
  repo: string;
  slug: string;
  titulo: string;
}) {
  const repoUrl = `https://github.com/VitorSMarinho/${repo}`;

  const passos = [
    {
      titulo: "Clone o repo (só na primeira vez)",
      comando: `git clone ${repoUrl}.git\ncd ${repo}`,
    },
    {
      titulo: "Crie uma branch pra esse exercício",
      comando: `git checkout main && git pull\ngit checkout -b exercicio/${slug}`,
    },
    {
      titulo: "Resolva o projeto",
      texto: `Coloque seu código em `,
      codigo: `modulos/${slug}/projeto/entrega/`,
      textoFinal: `, seguindo o enunciado e os critérios de aceite acima.`,
    },
    {
      titulo: "Abra o PR com a entrega",
      comando: `git add modulos/${slug}/projeto/entrega\ngit commit -m "entrega: ${titulo}"\ngit push -u origin exercicio/${slug}\ngh pr create --title "Entrega: ${titulo}"`,
    },
    {
      titulo: "Rode a revisão do Método Agient",
      texto: `Dentro do checkout deste repo, no Claude Code, peça pra rodar a skill `,
      codigo: `revisar-modulo-agient`,
      textoFinal: `. Ela acha o PR da branch atual sozinha, roda o subagente revisor, comenta no PR e grava o resultado.`,
    },
    {
      titulo: "Veja o resultado",
      texto: `O comentário de revisão aparece no PR. Depois do merge, o status desta página atualiza sozinho, lendo direto de `,
      codigo: "main",
      textoFinal: ".",
    },
  ];

  return (
    <section className="card-surface mt-10 rounded-xl p-6">
      <h2 className="text-lg font-medium">Como fazer</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Esse fluxo é 100% Git/GitHub, sem login nem formulário na plataforma — é assim que fica
        simples e sem backend próprio.
      </p>

      <ol className="mt-6 space-y-6">
        {passos.map((passo, i) => (
          <li key={passo.titulo}>
            <p className="modulo-numero text-sm font-medium text-foreground">
              {String(i + 1).padStart(2, "0")}. {passo.titulo}
            </p>
            {passo.comando && (
              <div className="mt-2">
                <ComandoBox comando={passo.comando} />
              </div>
            )}
            {passo.texto && (
              <p className="mt-2 text-sm text-muted-foreground">
                {passo.texto}
                <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                  {passo.codigo}
                </code>
                {passo.textoFinal}
              </p>
            )}
          </li>
        ))}
      </ol>

      <div className="mt-6 flex flex-wrap gap-3 border-t border-border pt-6 text-sm">
        <a
          className="text-muted-foreground underline hover:text-foreground"
          href={`${repoUrl}/blob/main/modulos/${slug}/projeto/ENUNCIADO.md`}
          target="_blank"
          rel="noreferrer"
        >
          Abrir ENUNCIADO.md ↗
        </a>
        <a
          className="text-muted-foreground underline hover:text-foreground"
          href={`${repoUrl}/blob/main/modulos/${slug}/projeto/CRITERIOS_ACEITE.md`}
          target="_blank"
          rel="noreferrer"
        >
          Abrir CRITÉRIOS_ACEITE.md ↗
        </a>
        <a
          className="text-muted-foreground underline hover:text-foreground"
          href={`${repoUrl}/pulls`}
          target="_blank"
          rel="noreferrer"
        >
          Ver PRs do repo ↗
        </a>
      </div>
    </section>
  );
}
