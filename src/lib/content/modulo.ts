import { parse as parseYaml } from "yaml";

import { catalogoDaTrilha } from "./catalogo";
import { fetchRawFile } from "./github";
import type { Modulo, ModuloMeta, ModuloStatus, ReviewStatus, Trilha } from "./types";

function derivarStatus(meta: ModuloMeta | null, review: ReviewStatus | null): ModuloStatus {
  if (!meta || meta.status_projeto === "a_detalhar") return "a_detalhar";
  if (!review) return "nao_iniciado";
  return review.status; // "aprovado" | "precisa_ajuste"
}

export async function buscarModulo(trilha: Trilha, slug: string): Promise<Modulo | null> {
  const catalogo = catalogoDaTrilha(trilha)?.find((m) => m.slug === slug);
  if (!catalogo) return null;

  const base = `modulos/${slug}`;

  const [readme, metaRaw] = await Promise.all([
    fetchRawFile(trilha, `${base}/README.md`),
    fetchRawFile(trilha, `${base}/modulo.yml`),
  ]);

  const meta: ModuloMeta | null = metaRaw ? (parseYaml(metaRaw) as ModuloMeta) : null;

  let review: ReviewStatus | null = null;
  if (meta?.review_status_path) {
    const reviewRaw = await fetchRawFile(trilha, meta.review_status_path);
    review = reviewRaw ? (JSON.parse(reviewRaw) as ReviewStatus) : null;
  }

  return {
    catalogo,
    meta,
    readme,
    review,
    status: derivarStatus(meta, review),
  };
}

export async function buscarTrilhaCompleta(trilha: Trilha): Promise<Modulo[]> {
  const catalogo = catalogoDaTrilha(trilha) ?? [];
  return Promise.all(catalogo.map((m) => buscarModulo(trilha, m.slug))).then(
    (modulos) => modulos.filter((m): m is Modulo => m !== null),
  );
}
