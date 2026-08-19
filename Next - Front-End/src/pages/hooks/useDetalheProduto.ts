// hooks/useDetalheProduto.ts
import { erro } from "@/utils/toast";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { listarProdutoPorId } from "../api/produtoService";
import { listarUsuarioPorId } from "../api/usuarioService";
import { listarCategoriaPorId } from "../api/categoriaService";
import { listarLocalizacaoPorId } from "../api/localizacaoService";

export type ProdutoDetalhado = {
  produtoID: number;
  codigo: number;
  nomeProduto: string;
  preco: string;
  statusProduto: boolean;
  descricao: string;
  tamanho: string;
  imagem: string;
  imagemUrl?: string | null;
  categoriaID: number;
  localizacaoID: number;
  usuarioID: string;
  tipoProdutoID: number;
  nomeUsuario: string;
  nomeCategoria: string;
  nomeLocalizacao: string;
};

export function useDetalheProduto() {
  const router = useRouter();
  const { id } = router.query;

  const [produto, setProduto] = useState<ProdutoDetalhado | null>(null);
  const [carregando, setCarregando] = useState<boolean>(true);

  async function buscarDetalhesProduto(produtoId: string) {
    try {
      setCarregando(true);
      const response = await listarProdutoPorId(produtoId);
      const produtoDados = response as unknown as ProdutoDetalhado;

      const [resUsuario, resCategoria, resLocalizacao] =
        await Promise.allSettled([
          produtoDados.usuarioID
            ? listarUsuarioPorId(produtoDados.usuarioID)
            : null,
          produtoDados.categoriaID
            ? listarCategoriaPorId(produtoDados.categoriaID)
            : null,
          produtoDados.localizacaoID
            ? listarLocalizacaoPorId(produtoDados.localizacaoID)
            : null,
        ]);

      if (resUsuario.status === "fulfilled" && resUsuario.value) {
        produtoDados.nomeUsuario = resUsuario.value.nome;
      } else {
        produtoDados.nomeUsuario = "Usuário não encontrado";
      }

      if (resCategoria.status === "fulfilled" && resCategoria.value) {
        produtoDados.nomeCategoria = resCategoria.value.nomeCategoria;
      } else {
        produtoDados.nomeCategoria = "Categoria não encontrada";
      }

      if (resLocalizacao.status === "fulfilled" && resLocalizacao.value) {
        produtoDados.nomeLocalizacao = resLocalizacao.value.nomeLocalizacao;
      } else {
        produtoDados.nomeLocalizacao = "Localização não encontrada";
      }

      setProduto(produtoDados);
    } catch (error: any) {
      erro(error.message || "Erro ao carregar os detalhes do produto.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    if (!router.isReady || !id) return;
    buscarDetalhesProduto(id as string);
  }, [router.isReady, id]);

  const imagemSrc = produto?.imagemUrl
    ? produto.imagemUrl
    : produto?.imagem
      ? produto.imagem.startsWith("data:")
        ? produto.imagem
        : `data:image/jpeg;base64,${produto.imagem}`
      : "/img/CardFantasma.png";

  return {
    id,
    produto,
    imagemSrc,
    carregando,
  };
}
