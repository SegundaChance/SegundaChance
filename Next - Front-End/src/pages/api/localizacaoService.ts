import { api } from "./api";

//? Interface
import { Localizacao } from "@/types/localizacaoInterface";

//? Criar
export async function criarLocalizacao(dados: Localizacao): Promise<any> {
  try {
    const response = await api.post("Localizacao", dados);
    return response.data;
  } catch (error: any) {
    const mensagemErro =
      error.response?.data?.message || error.response?.data || "Erro na API";
    throw new Error(mensagemErro);
  }
}

//? Listar
export async function listarLocalizacao(): Promise<Localizacao[]> {
  try {
    const response = await api.get<Localizacao[]>("Localizacao");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || "Erro ao listar localizações.");
  }
}

//? ListarPorId
export async function listarLocalizacaoPorId(id: number): Promise<Localizacao> {
  try {
    const response = await api.get<Localizacao>("Localizacao/" + id);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data || "Erro ao buscar Localização por ID",
    );
  }
}

//? Deletar
export async function deletarLocalizacao(localizacaoId: number): Promise<void> {
  try {
    await api.delete("Localizacao/" + localizacaoId);
  } catch (error: any) {
    throw new Error(error.response?.data || "Erro ao deletar Localização.");
  }
}
