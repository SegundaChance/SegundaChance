import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { logout, obterUsuarioAutenticado } from "@/pages/api/authService";

export interface UsuarioToken {
  id: string;
  nome: string;
  email: string;
}

export function useAuthHeader() {
  const [usuario, setUsuario] = useState<UsuarioToken | null>(null);
  const [estaAutenticado, setEstaAutenticado] = useState(false);
  const router = useRouter();

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

  const handleLogout = async () => {
    await logout();
    setUsuario(null);
    setEstaAutenticado(false);
    router.push("/login");
  };

  return {
    usuario,
    estaAutenticado,
    handleLogout,
  };
}
