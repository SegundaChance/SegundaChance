// hooks/useLogProduto.ts
import { erro } from "@/utils/toast";
import { useEffect, useState } from "react";
import { listarLogProduto } from "../api/logProdutoService";
import { listarLocalizacao } from "../api/localizacaoService";

export type HistoricoAlteracao = {
  logID: number;
  dataAlteracao: string;
  nomeAnterior: string;
  precoAnterior: number;
  localizacaoAnterior: string;
};

export function useLogProduto() {
  const [logs, setLogs] = useState<HistoricoAlteracao[]>([]);
  const [carregando, setCarregando] = useState(true);

  async function carregarHistoricoCompleto() {
    try {
      setCarregando(true);
      const [listaLogs, listaLocalizacoes] = await Promise.all([
        listarLogProduto(),
        listarLocalizacao(),
      ]);

      const logsFormatados: HistoricoAlteracao[] = listaLogs.map(
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

      setLogs(logsFormatados);
    } catch (error: any) {
      erro("Erro ao carregar o histórico geral: " + error.message);
      setLogs([]);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarHistoricoCompleto();
  }, []);

  return {
    logs,
    carregando,
    recarregarHistorico: carregarHistoricoCompleto,
  };
}
