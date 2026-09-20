import type { ModuloCatalogo } from "./types";

/**
 * Índice estável dos 26 módulos. Fonte da verdade pra navegação/grid — não depende de
 * listar diretório dos repos de conteúdo em runtime. Detalhe (README, modulo.yml, review)
 * vem do GitHub em `modulo.ts`.
 */
export const TRILHA_IA: ModuloCatalogo[] = [
  { id: "ia-01", trilha: "ia", ordem: 1, slug: "01-fundamentos-engenharia-ia", titulo: "Fundamentos da Engenharia de IA" },
  { id: "ia-02", trilha: "ia", ordem: 2, slug: "02-python-moderno-fastapi", titulo: "Python Moderno e FastAPI" },
  { id: "ia-03", trilha: "ia", ordem: 3, slug: "03-bancos-sql-vetoriais", titulo: "Bancos SQL + Vetoriais" },
  { id: "ia-04", trilha: "ia", ordem: 4, slug: "04-sistemas-rag-completos", titulo: "Sistemas RAG completos" },
  { id: "ia-05", trilha: "ia", ordem: 5, slug: "05-rag-agents-langchain-llamaindex", titulo: "RAG Agents — LangChain vs LlamaIndex" },
  { id: "ia-06", trilha: "ia", ordem: 6, slug: "06-graph-rag-knowledge-graphs", titulo: "Graph RAG — Knowledge Graphs" },
  { id: "ia-07", trilha: "ia", ordem: 7, slug: "07-sistemas-agentes-ia", titulo: "Sistemas de Agentes de IA" },
  { id: "ia-08", trilha: "ia", ordem: 8, slug: "08-langgraph-orquestracao", titulo: "LangGraph — orquestração real" },
  { id: "ia-09", trilha: "ia", ordem: 9, slug: "09-multi-agent-systems", titulo: "Multi-Agent Systems" },
  { id: "ia-10", trilha: "ia", ordem: 10, slug: "10-ocr-pipelines", titulo: "OCR Pipelines" },
  { id: "ia-11", trilha: "ia", ordem: 11, slug: "11-modelos-locais-ollama-vllm", titulo: "Modelos Locais (Ollama, vLLM)" },
  { id: "ia-12", trilha: "ia", ordem: 12, slug: "12-fine-tuning-lora-peft-unsloth", titulo: "Fine-Tuning (LoRA, PEFT, Unsloth)" },
];

export const TRILHA_DADOS: ModuloCatalogo[] = [
  { id: "dados-01", trilha: "dados", ordem: 1, slug: "01-infra-linux-docker", titulo: "Infra: Linux, Docker" },
  { id: "dados-02", trilha: "dados", ordem: 2, slug: "02-airflow-workflow-orchestration", titulo: "Airflow Workflow Orchestration" },
  { id: "dados-03", trilha: "dados", ordem: 3, slug: "03-data-pipelines", titulo: "Data Pipelines" },
  { id: "dados-04", trilha: "dados", ordem: 4, slug: "04-web-scraping", titulo: "Web Scraping" },
  { id: "dados-05", trilha: "dados", ordem: 5, slug: "05-workshop-projetos-praticos", titulo: "Workshop (projetos práticos)" },
  { id: "dados-06", trilha: "dados", ordem: 6, slug: "06-extracao-de-dados", titulo: "Extração de dados" },
  { id: "dados-07", trilha: "dados", ordem: 7, slug: "07-event-driven-architecture", titulo: "Event-Driven Architecture (Lambda, SQS)" },
  { id: "dados-08", trilha: "dados", ordem: 8, slug: "08-arquitetura-streaming", titulo: "Arquitetura Streaming" },
  { id: "dados-09", trilha: "dados", ordem: 9, slug: "09-observabilidade", titulo: "Observabilidade" },
  { id: "dados-10", trilha: "dados", ordem: 10, slug: "10-infra-as-code", titulo: "Infra as Code (IaC)" },
  { id: "dados-11", trilha: "dados", ordem: 11, slug: "11-data-sprint", titulo: "Data Sprint (com mentoria)" },
  { id: "dados-12", trilha: "dados", ordem: 12, slug: "12-deploys-e-ambientes", titulo: "Deploys e Ambientes" },
  { id: "dados-13", trilha: "dados", ordem: 13, slug: "13-pratica-data-dashboard", titulo: "Prática: Data Dashboard" },
  { id: "dados-14", trilha: "dados", ordem: 14, slug: "14-realtime-dashboard", titulo: "Realtime Dashboard" },
];

export function catalogoDaTrilha(trilha: string): ModuloCatalogo[] | null {
  if (trilha === "ia") return TRILHA_IA;
  if (trilha === "dados") return TRILHA_DADOS;
  return null;
}
