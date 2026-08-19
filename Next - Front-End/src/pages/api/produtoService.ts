import { api } from "./api";

//? Interface + Type
import {
  ProdutoDetalhe,
  ProdutoForm,
  ProdutoList,
} from "@/types/produtoInterface";

//? Cadastro
export async function cadastrarProduto(dados: ProdutoForm): Promise<any> {
  try {
    const formData = new FormData();
    formData.append("NomeProduto", dados.nomeProduto);
    formData.append("Preco", dados.preco);
    formData.append("Descricao", dados.descricao || "");
    formData.append("Tamanho", dados.tamanho);
    formData.append("Codigo", String(dados.codigo ?? 0));
    if (dados.imagem) {
      formData.append("Imagem", dados.imagem);
    }
    formData.append("CategoriaID", dados.categoriaID.toString());
    formData.append("LocalizacaoID", dados.localizacaoID.toString());
    formData.append("UsuarioID", dados.usuarioID);
    formData.append("TipoProdutoID", dados.tipoProdutoID.toString());

    const response = await api.post("Produto", formData);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data || "Erro inesperado ao cadastrar produto.",
    );
  }
}

//? Listar
export async function listarProduto(): Promise<ProdutoList[]> {
  try {
    const response = await api.get<ProdutoList[]>("Produto");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || "Erro ao listar produtos.");
  }
}

//? ListarPorId
export async function listarProdutoPorId(id: string): Promise<ProdutoDetalhe> {
  try {
    const response = await api.get<ProdutoList>("Produto/" + id);
    const base64Crua = response.data.imagem;
    const produto: ProdutoDetalhe = {
      ...response.data,
      imagemUrl: base64Crua
        ? base64Crua.startsWith("data:")
          ? base64Crua
          : `data:image/jpeg;base64,${base64Crua}`
        : null,
    };
    return produto;
  } catch (error: any) {
    throw new Error(error.response?.data || "Erro ao buscar Produto por ID");
  }
}

//? Editar
export async function editarProduto(
  produtoId: string,
  dados: ProdutoForm,
): Promise<any> {
  try {
    const formData = new FormData();
    formData.append("ProdutoID", produtoId);
    formData.append("NomeProduto", dados.nomeProduto);
    formData.append("Preco", String(dados.preco));
    formData.append("Descricao", dados.descricao);
    formData.append("Codigo", String(dados.codigo ?? 0));
    formData.append("Tamanho", dados.tamanho);
    formData.append("StatusProduto", String(dados.statusProduto ?? true));
    formData.append("CategoriaID", String(dados.categoriaID || 0));
    formData.append("LocalizacaoID", String(dados.localizacaoID || 0));
    formData.append("UsuarioID", dados.usuarioID || "");
    formData.append("TipoProdutoID", String(dados.tipoProdutoID || 0));
    if (dados.imagem instanceof File) {
      formData.append("Imagem", dados.imagem);
    }
    const response = await api.put(`Produto/${produtoId}`, formData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || "Erro ao editar Produto.");
  }
}

//? Deletar
export async function deletarProduto(produtoId: string): Promise<void> {
  try {
    await api.delete("Produto/" + produtoId);
  } catch (error: any) {
    throw new Error(error.response?.data || "Erro ao deletar Produto.");
  }
}
