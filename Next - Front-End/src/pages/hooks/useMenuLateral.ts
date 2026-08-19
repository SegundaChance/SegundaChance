import { useEffect, useState } from "react";

export function useMenuLateral() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [estaFechando, setEstaFechando] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const abrirMenu = () => {
    setEstaFechando(false);
    setMenuAberto(true);
  };

  const fecharMenu = () => {
    setEstaFechando(true);
    setTimeout(() => {
      setMenuAberto(false);
      setEstaFechando(false);
    }, 300);
  };

  return {
    menuAberto,
    estaFechando,
    mounted,
    abrirMenu,
    fecharMenu,
  };
}
