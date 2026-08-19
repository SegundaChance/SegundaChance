import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { erro, notificacao } from "@/utils/toast";
import { login, logout, obterUsuarioAutenticado } from "../api/authService";

export interface TokenUsuario {
  nome: string;
}

export function useAuth() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<TokenUsuario | null>(null);
  const [estaAutenticado, setEstaAutenticado] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    const dados = obterUsuarioAutenticado();
    if (dados) {
      setUsuario(dados);
      setEstaAutenticado(true);
    } else {
      setEstaAutenticado(false);
      setUsuario(null);
    }
  }, []);

  const autenticar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(email, senha);
      notificacao("Login bem sucedido!");
      router.push("/home");
    } catch (error: any) {
      const mensagemErro =
        error.response?.data || error.message || "Erro ao fazer login";
      erro(mensagemErro);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUsuario(null);
    setEstaAutenticado(false);
    router.push("/login");
  };

  return {
    usuario,
    estaAutenticado,
    email,
    setEmail,
    senha,
    setSenha,
    autenticar,
    handleLogout,
  };
}
