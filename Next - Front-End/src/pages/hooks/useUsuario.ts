// hooks/useUsuario.ts
import { useState } from "react";
import { erro, notificacao } from "@/utils/toast";
import { cadastrarUsuario } from "../api/usuarioService";

export function useUsuario() {
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [carregando, setCarregando] = useState<boolean>(false);

  function limparFormulario() {
    setNome("");
    setEmail("");
    setSenha("");
    setTelefone("");
  }

  async function salvarUsuario(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setCarregando(true);
      const dados = {
        nome,
        email,
        senha,
        telefone,
      };

      await cadastrarUsuario(dados);
      notificacao("Usuário cadastrado com sucesso!");
      limparFormulario();
    } catch (error: any) {
      erro(error.message || "Erro ao cadastrar!");
    } finally {
      setCarregando(false);
    }
  }

  return {
    nome,
    setNome,
    email,
    setEmail,
    senha,
    setSenha,
    telefone,
    setTelefone,
    carregando,
    salvarUsuario,
  };
}
