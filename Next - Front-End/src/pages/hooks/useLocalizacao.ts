import { useState } from "react";
import { erro, notificacao } from "@/utils/toast";
import { criarLocalizacao } from "../api/localizacaoService";

export function useLocalizacao() {
  const [localizacao, setLocalizacao] = useState<string>("");
  const [carregando, setCarregando] = useState<boolean>(false);

  async function handleCadastro(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!localizacao.trim()) {
      erro("O nome da localização é obrigatório.");
      return;
    }

    try {
      setCarregando(true);
      await criarLocalizacao({ nomeLocalizacao: localizacao });
      notificacao("Criação realizada com sucesso!");
      setLocalizacao("");
    } catch (error: any) {
      erro(error.message || "Erro ao criar localização.");
    } finally {
      setCarregando(false);
    }
  }

  return {
    localizacao,
    setLocalizacao,
    carregando,
    handleCadastro,
  };
}
