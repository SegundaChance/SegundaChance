import { useState, useEffect, RefObject } from "react";

export function useCustomSelect(formRef: RefObject<HTMLFormElement | null>) {
  const [selectAberto, setSelectAberto] = useState<Record<string, boolean>>({
    tipo: false,
    categoria: false,
    localizacao: false,
    usuario: false,
  });

  const alternarSelect = (campo: string) => {
    setSelectAberto((prev) => ({
      tipo: campo === "tipo" ? !prev.tipo : false,
      categoria: campo === "categoria" ? !prev.categoria : false,
      localizacao: campo === "localizacao" ? !prev.localizacao : false,
      usuario: campo === "usuario" ? !prev.usuario : false,
    }));
  };

  const fecharTodos = () => {
    setSelectAberto({
      tipo: false,
      categoria: false,
      localizacao: false,
      usuario: false,
    });
  };

  useEffect(() => {
    const fecharAoClicarFora = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        fecharTodos();
      }
    };
    document.addEventListener("mousedown", fecharAoClicarFora);
    return () => document.removeEventListener("mousedown", fecharAoClicarFora);
  }, [formRef]);

  return {
    selectAberto,
    alternarSelect,
    fecharTodos,
  };
}
