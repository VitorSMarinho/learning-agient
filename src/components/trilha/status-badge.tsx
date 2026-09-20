import type { ModuloStatus } from "@/lib/content/types";

const LABEL: Record<ModuloStatus, string> = {
  nao_iniciado: "Não iniciado",
  a_detalhar: "Projeto em construção",
  pendente: "Pendente de review",
  aprovado: "Aprovado",
  precisa_ajuste: "Precisa de ajuste",
};

export function StatusBadge({ status }: { status: ModuloStatus }) {
  return (
    <span className="badge-status" data-status={status}>
      {LABEL[status]}
    </span>
  );
}
