// hooks/useLista.ts
import { useState } from "react";

interface UseListaProps<T> {
  itens: T[];
  itensPorPagina?: number;
  maxBotoesVisiveis?: number;
}

export function useLista<T>({
  itens,
  itensPorPagina = 5,
  maxBotoesVisiveis = 5,
}: UseListaProps<T>) {
  const [paginaAtual, setPaginaAtual] = useState(1);

  const registros = itens ?? [];
  const totalPaginas = Math.ceil(registros.length / itensPorPagina) || 1;

  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const indiceFinal = indiceInicial + itensPorPagina;
  const itensPaginados = registros.slice(indiceInicial, indiceFinal);

  const obterIntervaloPaginas = () => {
    if (totalPaginas <= maxBotoesVisiveis) {
      return Array.from({ length: totalPaginas }, (_, i) => i + 1);
    }

    const metadeJulgada = Math.floor(maxBotoesVisiveis / 2);

    let inicio = paginaAtual - metadeJulgada;
    let fim = paginaAtual + metadeJulgada;

    if (inicio < 1) {
      inicio = 1;
      fim = maxBotoesVisiveis;
    }

    if (fim > totalPaginas) {
      fim = totalPaginas;
      inicio = totalPaginas - maxBotoesVisiveis + 1;
    }

    return Array.from({ length: fim - inicio + 1 }, (_, i) => inicio + i);
  };

  const irParaPagina = (pagina: number) => {
    if (pagina >= 1 && pagina <= totalPaginas) {
      setPaginaAtual(pagina);
    }
  };

  return {
    paginaAtual,
    totalPaginas,
    itensPaginados,
    paginasVisiveis: obterIntervaloPaginas(),
    irParaPagina,
    proximaPagina: () => irParaPagina(paginaAtual + 1),
    paginaAnterior: () => irParaPagina(paginaAtual - 1),
    primeiraPagina: () => irParaPagina(1),
    ultimaPagina: () => irParaPagina(totalPaginas),
  };
}
