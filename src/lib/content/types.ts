export type Trilha = "ia" | "dados";

export interface ModuloCatalogo {
  id: string;
  trilha: Trilha;
  ordem: number;
  slug: string;
  titulo: string;
}

export interface ModuloMeta {
  id: string;
  trilha: Trilha;
  ordem: number;
  titulo: string;
  reviewer_agent: string;
  status_projeto: "completo" | "a_detalhar";
  projeto_path: string | null;
  review_status_path: string | null;
}

export interface ReviewCriterio {
  descricao: string;
  atendido: boolean;
  comentario?: string;
}

export interface ReviewStatus {
  modulo_id: string;
  pr_number: number;
  reviewer_agent: string;
  status: "aprovado" | "precisa_ajuste";
  criterios: ReviewCriterio[];
  reviewed_at: string;
  commit_sha: string;
}

export type ModuloStatus = "nao_iniciado" | "a_detalhar" | "pendente" | "aprovado" | "precisa_ajuste";

export interface Modulo {
  catalogo: ModuloCatalogo;
  meta: ModuloMeta | null;
  readme: string | null;
  review: ReviewStatus | null;
  status: ModuloStatus;
}
