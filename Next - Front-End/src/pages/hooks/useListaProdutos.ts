import { useEffect, useState, useMemo } from "react";
import { desformatarPreco } from "@/utils/formatacao";
import { erro, notificacao, toastConfirmarExcluir } from "@/utils/toast";
import { deletarProduto, listarProduto } from "@/pages/api/produtoService";

export interface Produto {
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
}

export function useListaProdutos() {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [ordenacao, setOrdenacao] = useState("");
  const [pesquisa, setPesquisa] = useState("");
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [itensPorPagina, setItensPorPagina] = useState<number>(5);
  const [statusFiltro, setStatusFiltro] = useState<
    "todos" | "ativo" | "inativo"
  >("todos");

  const carregarProdutos = async () => {
    try {
      const response = await listarProduto();
      setProdutos(response);
    } catch (error: any) {
      erro("Erro ao carregar a lista.");
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const confirmarExcluir = async (produtoId: string | number) => {
    toastConfirmarExcluir(async () => {
      try {
        await deletarProduto(String(produtoId));
        notificacao("Produto inativado com sucesso!");
        await carregarProdutos();
      } catch (error: any) {
        console.error("Erro detalhado da API:", error);
        erro("Erro ao inativar o produto");
      }
    });
  };

  // Filtragem
  const produtosFiltrados = useMemo(() => {
    return produtos.filter((p) => {
      const correspondePesquisa = p.nomeProduto
        .toLowerCase()
        .includes(pesquisa.toLowerCase());

      if (statusFiltro === "ativo")
        return correspondePesquisa && p.statusProduto;
      if (statusFiltro === "inativo")
        return correspondePesquisa && !p.statusProduto;
      return correspondePesquisa;
    });
  }, [produtos, pesquisa, statusFiltro]);

  // Ordenação
  const produtosOrdenados = useMemo(() => {
    const lista = [...produtosFiltrados];

    if (ordenacao === "menor") {
      lista.sort(
        (a, b) => desformatarPreco(a.preco) - desformatarPreco(b.preco),
      );
    } else if (ordenacao === "maior") {
      lista.sort(
        (a, b) => desformatarPreco(b.preco) - desformatarPreco(a.preco),
      );
    } else if (ordenacao === "alfabetica") {
      lista.sort((a, b) => a.nomeProduto.localeCompare(b.nomeProduto));
    } else if (ordenacao === "alfabetica-contraria") {
      lista.sort((a, b) => b.nomeProduto.localeCompare(a.nomeProduto));
    }

    return lista;
  }, [produtosFiltrados, ordenacao]);

  // Paginação
  const totalPaginas =
    Math.ceil(produtosOrdenados.length / itensPorPagina) || 1;
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const produtosPaginados = produtosOrdenados.slice(
    indiceInicial,
    indiceInicial + itensPorPagina,
  );

  const cardsFantasmas =
    paginaAtual === totalPaginas
      ? itensPorPagina - produtosPaginados.length
      : 0;

  const cardsExibidos = [
    ...produtosPaginados,
    ...Array(cardsFantasmas > 0 ? cardsFantasmas : 0).fill(null),
  ];

  const handleMudarItensPorPagina = (valor: string) => {
    const qtd = parseInt(valor, 10);
    if (!isNaN(qtd) && qtd > 0) {
      setItensPorPagina(qtd);
    } else if (valor === "") {
      setItensPorPagina(1);
    }
    setPaginaAtual(1);
  };

  const handleMudarStatus = (novoStatus: "todos" | "ativo" | "inativo") => {
    setStatusFiltro(novoStatus);
    setPaginaAtual(1);
  };

  const handleSelecionarOrdenacao = (valor: string) => {
    setOrdenacao(valor);
    setPaginaAtual(1);
  };

  return {
    paginaAtual,
    setPaginaAtual,
    ordenacao,
    pesquisa,
    setPesquisa,
    statusFiltro,
    itensPorPagina,
    produtosFiltrados,
    cardsExibidos,
    totalPaginas,
    confirmarExcluir,
    handleMudarItensPorPagina,
    handleMudarStatus,
    handleSelecionarOrdenacao,
  };
}
