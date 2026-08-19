import { useState, useEffect } from "react";

export function useCarrossel(imagens: string[], tempoTrocaMs = 10000) {
  const [imagemAtual, setImagemAtual] = useState(0);

  useEffect(() => {
    if (!imagens || imagens.length === 0) return;

    const interval = setInterval(() => {
      setImagemAtual((prev) => (prev + 1) % imagens.length);
    }, tempoTrocaMs);

    return () => clearInterval(interval);
  }, [imagens, tempoTrocaMs]);

  return { imagemAtual };
}
