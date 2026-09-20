import type { Trilha } from "./types";

const REPO_BY_TRILHA: Record<Trilha, string> = {
  ia: "learning-agient-ai-engineer",
  dados: "learning-agient-data-engineer",
};

const OWNER = "VitorSMarinho";
const REF = "main"; // status só reflete depois do merge, de propósito (ver plano)
const REVALIDATE_SECONDS = 3600;

export function repoDaTrilha(trilha: Trilha): string {
  return REPO_BY_TRILHA[trilha];
}

/**
 * Busca um arquivo de texto de um repo de conteúdo via raw.githubusercontent.com.
 * Retorna null em 404 (arquivo não existe ainda — estado normal pra módulo a_detalhar
 * ou módulo sem review). Lança erro pra qualquer outra falha (rede, 5xx).
 */
export async function fetchRawFile(trilha: Trilha, path: string): Promise<string | null> {
  const repo = repoDaTrilha(trilha);
  const url = `https://raw.githubusercontent.com/${OWNER}/${repo}/${REF}/${path}`;

  const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });

  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`Falha ao buscar ${url}: ${res.status} ${res.statusText}`);
  }
  return res.text();
}
