import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import styles from "./detalhe.module.css";
import Link from "next/link";
import Lucide from "@/utils/lucide";
import { formatarPreco } from "@/utils/formatacao";
import { useDetalheProduto } from "@/pages/hooks/useDetalheProduto";

export default function Detalhe() {
  const { id, produto, imagemSrc, carregando } = useDetalheProduto();

  return (
    <>
      <Header />
      <main className="min_height">
        <section className="container column">
          <article className="grid info">
            <div className="column">
              <div className={styles.imgContainer}>
                <img
                  id={styles.img}
                  src={imagemSrc}
                  alt={produto?.nomeProduto || "Imagem do produto"}
                  className={`img small_radius ${
                    produto?.statusProduto ? styles.ativoImg : styles.inativoImg
                  }`}
                />

                <h3
                  className={
                    produto?.statusProduto ? styles.ativoH3 : styles.inativoH3
                  }
                >
                  {produto?.statusProduto ? "Ativo" : "Inativo"}
                </h3>
              </div>
              <div className="row">
                <h4>Código:</h4>
                <p>
                  {carregando ? "Carregando..." : (produto?.codigo ?? "N/A")}
                </p>
              </div>
            </div>

            <div className="column start grid_to_column">
              <h1>{carregando ? "Carregando..." : produto?.nomeProduto}</h1>
              <h3>
                {carregando
                  ? "Carregando..."
                  : formatarPreco(Number(produto?.preco))}
              </h3>
              <p>
                {carregando
                  ? "Carregando..."
                  : produto?.descricao || "Sem descrição."}
              </p>
            </div>

            <div className="column start">
              <div className="row">
                <Lucide name="Package" className="reset_lucide" />
                <div className="column start small_gap grid_to_row">
                  <h3>Tipo:</h3>
                  <p>{produto?.tipoProdutoID ?? "Não informado"}</p>
                </div>
              </div>

              <div className="row">
                <Lucide name="Grid2X2" className="reset_lucide" />
                <div className="column start small_gap grid_to_row">
                  <h3>Categoria:</h3>
                  <p>
                    {produto?.nomeCategoria ||
                      (produto?.categoriaID
                        ? "Carregando..."
                        : "Não informado")}
                  </p>
                </div>
              </div>

              <div className="row">
                <Lucide name="MapPin" className="reset_lucide" />
                <div className="column start small_gap grid_to_row">
                  <h3>Localização:</h3>
                  <p>
                    {produto?.nomeLocalizacao ||
                      (produto?.localizacaoID
                        ? "Carregando..."
                        : "Não informado")}
                  </p>
                </div>
              </div>

              <div className="row">
                <Lucide name="RulerDimensionLine" className="reset_lucide" />
                <div className="column start small_gap grid_to_row">
                  <h3>Tamanho:</h3>
                  <p>{produto?.tamanho || "Não informado"}</p>
                </div>
              </div>

              <div className="row">
                <Lucide name="User" className="reset_lucide" />
                <div className="column start small_gap grid_to_row">
                  <h3>Usuário:</h3>
                  <p>
                    {produto?.nomeUsuario ||
                      (produto?.usuarioID ? "Carregando..." : "Não informado")}
                  </p>
                </div>
              </div>
            </div>
          </article>

          <div className="row">
            <Link
              id={styles.historico}
              className="small_width"
              href={`/historico/${id}`}
            >
              <Lucide name="NotepadText" className="reset_lucide" />
            </Link>
            <Link href="/home" className="btn2">
              Voltar
            </Link>
            <Link
              id={styles.button}
              href={`/cProduto?id=${id}`}
              className="btn"
            >
              Editar
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
