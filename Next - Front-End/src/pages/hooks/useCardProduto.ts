export type UseCardProdutoProps = {
  produtoID?: number;
  nomeProduto?: string;
  preco?: string | number;
  imagem?: string | null | any;
  fantasma?: boolean;
  onDelete?: (produtoId: number) => void;
};

export function useCardProduto({
  produtoID,
  nomeProduto = "",
  preco = 0,
  imagem,
  fantasma = false,
  onDelete,
}: UseCardProdutoProps) {

  // Tratamento de imagem com suporte a Base64 e imagem padrão
  const imagemSrc =
    imagem && !fantasma
      ? imagem.startsWith("data:")
        ? imagem
        : `data:image/jpeg;base64,${imagem}`
      : "/img/CardFantasma.png";

  const imagemAlt = fantasma ? "Produto fantasma" : nomeProduto;
  const linkEditar = fantasma ? "/login" : `/cProduto?id=${produtoID}`;

  const handleExcluir = () => {
    if (!fantasma && onDelete && produtoID !== undefined) {
      onDelete(produtoID);
    }
  };

  return {
    imagemSrc,
    imagemAlt,
    linkEditar,
    handleExcluir,
  };
}
