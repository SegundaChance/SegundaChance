// useCategoria.ts
import { erro, notificacao } from "@/utils/toast";
import { useEffect, useRef, useState } from "react";
import { TipoProduto } from "@/types/tipoProdutoInterface";
import { cadastrarCategoria } from "../api/categoriaService";
import { listarTipoProduto } from "../api/tipoProdutoService";

export function useCategoria() {
  const [categoria, setCategoria] = useState("");
  const [valorTipo, setValorTipo] = useState("");
  const [selectAberto, setSelectAberto] = useState(false);
  const [tiposProduto, setTiposProduto] = useState<TipoProduto[]>([]);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    async function carregarTipos() {
      try {
        const dados = await listarTipoProduto();

        if (Array.isArray(dados)) {
          setTiposProduto(dados);
        } else {
          setTiposProduto([]);
        }
      } catch (err: any) {
        console.error("Erro detalhado ao buscar tipos:", err);
        erro("Não foi possível carregar os tipos de produto.");
        setTiposProduto([]);
      }
    }
    carregarTipos();
  }, []);

  useEffect(() => {
    const fecharAoClicarFora = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setSelectAberto(false);
      }
    };

    document.addEventListener("mousedown", fecharAoClicarFora);

    return () => {
      document.removeEventListener("mousedown", fecharAoClicarFora);
    };
  }, []);

  async function handleCadastro(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!valorTipo) {
      erro("Selecione um tipo.");
      return;
    }

    try {
      await cadastrarCategoria({
        nomeCategoria: categoria,
        tipoProdutoID: Number(valorTipo),
      });
      notificacao("Cadastro realizado com sucesso!");
      setCategoria("");
      setValorTipo("");
    } catch (error: any) {
      erro(error.message);
    }
  }

  const alternarSelect = () => {
    setSelectAberto((prev) => !prev);
  };

  const handleSelecionarOpcao = (valor: string) => {
    setValorTipo(valor);
    setSelectAberto(false);
  };

  const labelExibida =
    tiposProduto?.find((tipo: any) => {
      return String(tipo.tipoId) === valorTipo;
    })?.nomeTipo || "";

  return {
    categoria,
    setCategoria,
    valorTipo,
    selectAberto,
    tiposProduto,
    formRef,
    handleCadastro,
    alternarSelect,
    handleSelecionarOpcao,
    labelExibida,
  };
}
