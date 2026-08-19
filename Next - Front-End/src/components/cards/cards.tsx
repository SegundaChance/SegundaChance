import Link from "next/link";
import Lucide from "@/utils/lucide";
import styles from "./cards.module.css";
import Button from "@/components/button/button";
import { formatarPreco } from "@/utils/formatacao";
import { useCardProduto } from "@/pages/hooks/useCardProduto";

type CardProps = {
  produtoID?: number;
  nomeProduto?: string;
  preco?: string | number;
  imagem?: string | null | any;
  fantasma?: boolean;
  onDelete?: (produtoId: number) => void;
};

export default function Card({
  produtoID,
  nomeProduto = "",
  preco = 0,
  imagem,
  fantasma = false,
  onDelete = () => {},
}: CardProps) {
  const { imagemSrc, imagemAlt, linkEditar, handleExcluir } = useCardProduto({
    produtoID,
    nomeProduto,
    preco,
    imagem,
    fantasma,
    onDelete,
  });

  return (
    <article className="column">
      <li
        id={!fantasma ? styles.card : undefined}
        className={fantasma ? styles.cardFantasma : ""}
      >
        <div className={`${styles.imagemContainer} fit_content`}>
          {!fantasma && produtoID !== undefined ? (
            <Link href={`/detalhe/${produtoID}`}>
              <img className={styles.img} src={imagemSrc} alt={imagemAlt} />
            </Link>
          ) : (
            <img className={styles.img} src={imagemSrc} alt={imagemAlt} />
          )}

          <h3 className={`${styles.tituloProduto} title dark`}>
            {fantasma ? (
              <>
                <Lucide name="CircleQuestionMark" className="reset_lucide" />
                <Lucide name="CircleQuestionMark" className="reset_lucide" />
                <Lucide name="CircleQuestionMark" className="reset_lucide" />
              </>
            ) : (
              nomeProduto
            )}
          </h3>
        </div>

        <span className={styles.preco}>
          {fantasma ? "Preço" : formatarPreco(Number(preco || 0))}
        </span>

        <div
          className={`row no_gap to_column2 ${styles.botoes}`}
          id={fantasma ? styles.botoes : undefined}
        >
          <Button
            className={`${styles.btn_card} ${styles.excluir}`}
            onClick={handleExcluir}
            disabled={fantasma}
          >
            <Lucide name="Delete" className="reset_lucide icon_branco" />
            <p className="p white">Excluir</p>
          </Button>

          <Link
            href={linkEditar}
            className={`btn ${styles.btn_card} ${styles.editar}`}
          >
            <Lucide name="SquarePen" className="reset_lucide icon_branco" />
            <p className="p white">Editar</p>
          </Link>
        </div>
      </li>
    </article>
  );
}
