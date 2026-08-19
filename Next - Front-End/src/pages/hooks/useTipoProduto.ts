// useTipoProduto.ts
import { useState } from "react";
import { erro, notificacao } from "@/utils/toast";
import { criarTipoProduto } from "../api/tipoProdutoService";

export function useTipoProduto() {
  const [nomeTipo, setNomeTipo] = useState<string>("");
  const [carregando, setCarregando] = useState<boolean>(false);

  async function handleCadastro(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!nomeTipo.trim()) {
      erro("O nome do tipo de produto não pode estar vazio.");
      return;
    }

    try {
      setCarregando(true);
      await criarTipoProduto({ nomeTipo } as any);
      notificacao("Tipo de produto criado com sucesso!");
      setNomeTipo("");
    } catch (error: any) {
      erro(error.message || "Erro ao criar tipo de produto.");
    } finally {
      setCarregando(false);
    }
  }

  return {
    nomeTipo,
    setNomeTipo,
    carregando,
    handleCadastro,
  };
}
