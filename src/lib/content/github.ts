import type { Trilha } from "./types";

const REPO_BY_TRILHA: Record<Trilha, string> = {
  ia: "learning-agient-ai-engineer",
  dados: "learning-agient-data-engineer",
};

const OWNER = "VitorSMarinho";
const REF = "main"; // status só reflete depois do merge, de propósito (ver plano)

export function repoDaTrilha(trilha: Trilha): string {
  return REPO_BY_TRILHA[trilha];
}

/**
 * Busca um arquivo de texto de um repo de conteúdo via raw.githubusercontent.com.
 * Retorna null em 404 (arquivo não existe ainda — estado normal pra módulo a_detalhar
 * ou módulo sem review). Lança erro pra qualquer outra falha (rede, 5xx).
 *
 * cache: 'no-store' de propósito — o Data Cache do Next.js na Vercel é persistente e
 * NÃO é limpo automaticamente por um novo deploy (já causou status desatualizado em
 * produção depois de um merge de conteúdo). Site de baixo tráfego, então correção >
 * eficiência de cache aqui.
 */
export async function fetchRawFile(trilha: Trilha, path: string): Promise<string | null> {
  const repo = repoDaTrilha(trilha);
  const url = `https://raw.githubusercontent.com/${OWNER}/${repo}/${REF}/${path}`;

  const res = await fetch(url, { cache: "no-store" });

  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`Falha ao buscar ${url}: ${res.status} ${res.statusText}`);
  }
  return res.text();
}
