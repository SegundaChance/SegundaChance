import { api } from "./api";

//? Interface
import { LogProduto } from "@/types/logProdutoInterface";

//? Listar
export async function listarLogProduto(): Promise<LogProduto[]> {
  try {
    const response = await api.get<LogProduto[]>("LogProduto");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || "Erro ao listar logs.");
  }
}

//? ListarPorId
export async function listarLogProdutoPorId(
  produtoId: string,
): Promise<LogProduto[]> {
  try {
    const response = await api.get<LogProduto[]>(`LogProduto/${produtoId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || "Erro ao listar histórico.");
  }
}
