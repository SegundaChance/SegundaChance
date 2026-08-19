import { api } from "./api";

//? Interface
import { Categoria } from "@/types/categoriaInterface";

//? Cadastro
export async function cadastrarCategoria(dados: Categoria): Promise<any> {
  try {
    const response = await api.post("Categoria", dados);
    return response.data;
  } catch (error: any) {
    const mensagemErro =
      error.response?.data?.message || error.response?.data || "Erro na API";
    throw new Error(mensagemErro);
  }
}

//? Listar
export async function listarCategoria(): Promise<Categoria[]> {
  try {
    const response = await api.get<Categoria[]>("Categoria");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || "Erro ao listar categorias.");
  }
}

//? ListarPorId
export async function listarCategoriaPorId(id: number): Promise<Categoria> {
  try {
    const response = await api.get<Categoria>("Categoria/" + id);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || "Erro ao buscar Categoria por ID");
  }
}

//? Deletar
export async function deletarCategoria(categoriaId: number): Promise<void> {
  try {
    await api.delete("Categoria/" + categoriaId);
  } catch (error: any) {
    throw new Error(error.response?.data || "Erro ao deletar Categoria.");
  }
}
