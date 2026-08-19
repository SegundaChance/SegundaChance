import { api } from "./api";

//? Interface
import { Usuario } from "@/types/usuarioInterface";

//? Cadastrar
export async function cadastrarUsuario(dados: Usuario): Promise<any> {
  try {
    const response = await api.post("Usuario", dados);
    return response.data;
  } catch (error: any) {
    const mensagemErro =
      error.response?.data?.message || error.response?.data || "Erro na API";
    throw new Error(mensagemErro);
  }
}

//? Listar
export async function listarUsuario(): Promise<Usuario[]> {
  try {
    const response = await api.get<Usuario[]>("Usuario");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || "Erro ao listar usuários.");
  }
}

//? ListarPorId
export async function listarUsuarioPorId(id: string): Promise<Usuario> {
  try {
    const response = await api.get<Usuario>("Usuario/" + id);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || "Erro ao buscar Usuário por ID");
  }
}

//? Deletar
export async function deletarUsuario(usuarioId: string): Promise<void> {
  try {
    await api.delete("Usuario/" + usuarioId);
  } catch (error: any) {
    throw new Error(error.response?.data || "Erro ao deletar Usuário.");
  }
}
