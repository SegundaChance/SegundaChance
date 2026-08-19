import { api } from "./api";

//? Interface
import { TipoProduto } from "@/types/tipoProdutoInterface";

//? Criar
export async function criarTipoProduto(dados: TipoProduto): Promise<any> {
  try {
    const response = await api.post("TipoProduto", dados);
    return response.data;
  } catch (error: any) {
    const mensagemErro =
      error.response?.data?.message || error.response?.data || "Erro na API";
    throw new Error(mensagemErro);
  }
}

//? Listar
export async function listarTipoProduto(): Promise<TipoProduto[]> {
  try {
    const response = await api.get<TipoProduto[]>("TipoProduto");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || "Erro ao listar tipos de produto.");
  }
}

//? ListarPorId
export async function listarTipoProdutoPorId(id: number): Promise<TipoProduto> {
  try {
    const response = await api.get<TipoProduto>("TipoProduto/" + id);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data || "Erro ao buscar Tipo de Produto por ID",
    );
  }
}

//? Deletar
export async function deletarTipoProduto(tipoProdutoId: number): Promise<void> {
  try {
    await api.delete("TipoProduto/" + tipoProdutoId);
  } catch (error: any) {
    const mensagemErro =
      error.response?.data?.message ||
      error.response?.data ||
      "Erro ao deletar Tipo de Produto.";
    throw new Error(mensagemErro);
  }
}
