// hooks/useLogProdutoPorId.ts
import { erro } from "@/utils/toast";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { listarProdutoPorId } from "../api/produtoService";
import { listarLogProduto } from "../api/logProdutoService";
import { listarLocalizacao } from "../api/localizacaoService";

export type HistoricoAlteracao = {
  logID: number;
  dataAlteracao: string;
  nomeAnterior: string;
  precoAnterior: number;
  localizacaoAnterior: string;
};

export type ProdutoSimples = {
  produtoID: number;
  nomeProduto: string;
};

export function useLogProdutoPorId() {
  const router = useRouter();
  const { id } = router.query;

  const [historico, setHistorico] = useState<HistoricoAlteracao[]>([]);
  const [produtoAtual, setProdutoAtual] = useState<ProdutoSimples | null>(null);
  const [carregando, setCarregando] = useState(true);

  async function carregarHistoricoDoProduto(produtoId: string) {
    try {
      setCarregando(true);

      const [listaLogs, listaLocalizacoes, dadosProduto] = await Promise.all([
        listarLogProduto(),
        listarLocalizacao(),
        listarProdutoPorId(produtoId).catch(() => null),
      ]);

      if (dadosProduto) {
        setProdutoAtual(dadosProduto);
      }

      const logsDoProduto = listaLogs.filter(
        (log: any) =>
          String(log.produtoID ?? log.produtoId) === String(produtoId),
      );

      const logsFormatados: HistoricoAlteracao[] = logsDoProduto.map(
        (item: any, index: number) => {
          const localizacao = listaLocalizacoes.find(
            (loc: any) => loc.localizacaoID === item.localizacaoIDAnterior,
          );

          return {
            logID: index,
            dataAlteracao: item.dataAlteracao,
            nomeAnterior: item.nomeAnterior,
            precoAnterior: item.precoAnterior,
            localizacaoAnterior:
              localizacao?.nomeLocalizacao ??
              `ID ${item.localizacaoIDAnterior}`,
          };
        },
      );

      setHistorico(logsFormatados);
    } catch (error: any) {
      erro("Erro ao carregar o histórico do produto: " + error.message);
      setHistorico([]);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    if (!router.isReady || !id) return;
    carregarHistoricoDoProduto(String(id));
  }, [router.isReady, id]);

  return {
    id,
    historico,
    produtoAtual,
    carregando,
  };
}
