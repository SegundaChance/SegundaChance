export interface ProdutoList {
  produtoID: number;
  nomeProduto: string;
  preco: string;
  descricao: string;
  tamanho: string;
  imagem: string;
  statusProduto: boolean;
  codigo: number;
  categoriaID: number;
  localizacaoID: number;
  usuarioID: string;
  tipoProdutoID: number;
}

export interface ProdutoDetalhe extends ProdutoList {
  imagemUrl: string | null;
}

export type ProdutoForm = {
  nomeProduto: string;
  preco: string;
  descricao: string;
  tamanho: string;
  imagem: File | null;
  statusProduto?: boolean;
  codigo?: number;
  categoriaID: number;
  localizacaoID: number;
  usuarioID: string;
  tipoProdutoID: number;
};
