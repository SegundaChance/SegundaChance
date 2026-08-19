import DataTable from "@/components/datatable/datatable";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Link from "next/link";
import { useLogProduto } from "../hooks/useLogProduto";
import { useLista } from "../hooks/useLista";

export default function Historico() {
  const { logs } = useLogProduto();

  const {
    paginaAtual,
    totalPaginas,
    itensPaginados,
    paginasVisiveis,
    irParaPagina,
    proximaPagina,
    paginaAnterior,
    primeiraPagina,
    ultimaPagina,
  } = useLista({ itens: logs, itensPorPagina: 5 });

  return (
    <>
      <Header />
      <main className="min_height">
        <section className="container column space_between">
          <h1 className="h1">Histórico Geral</h1>
          <table className="table">
            <thead>
              <tr className="tr small_padding">
                <th>Data da alteração</th>
                <th>Produto</th>
                <th>Preço Anterior</th>
                <th>Local Anterior</th>
              </tr>
            </thead>
            <tbody className="line column">
              {itensPaginados.map((item) => (
                <DataTable
                  key={item.logID}
                  dataAlteracao={item.dataAlteracao}
                  nomeAnterior={item.nomeAnterior}
                  precoAnterior={item.precoAnterior}
                  nomeLocalizacaoAnterior={item.localizacaoAnterior}
                />
              ))}
            </tbody>
          </table>

          {totalPaginas > 1 ? (
            <div className="row">
              <Link href={`/home`} className="btn2">
                Voltar
              </Link>
              <nav>
                <ul className="paginacao">
                  <li
                    className="btn small_width"
                    onClick={primeiraPagina}
                    style={{
                      opacity: paginaAtual === 1 ? 0.25 : 1,
                      cursor: paginaAtual === 1 ? "not-allowed" : "pointer",
                    }}
                  >
                    {"<<"}
                  </li>

                  <li
                    className="btn small_width"
                    onClick={paginaAnterior}
                    style={{
                      opacity: paginaAtual === 1 ? 0.5 : 1,
                      cursor: paginaAtual === 1 ? "not-allowed" : "pointer",
                    }}
                  >
                    {"<"}
                  </li>

                  {paginasVisiveis.map((pagina) => (
                    <li
                      key={pagina}
                      onClick={() => irParaPagina(pagina)}
                      className={`${paginaAtual === pagina ? "btn" : "btn2"} small_width`}
                    >
                      {pagina}
                    </li>
                  ))}

                  <li
                    className="btn small_width"
                    onClick={proximaPagina}
                    style={{
                      opacity: paginaAtual === totalPaginas ? 0.5 : 1,
                      cursor:
                        paginaAtual === totalPaginas
                          ? "not-allowed"
                          : "pointer",
                    }}
                  >
                    {">"}
                  </li>

                  <li
                    className="btn small_width"
                    onClick={ultimaPagina}
                    style={{
                      opacity: paginaAtual === totalPaginas ? 0.25 : 1,
                      cursor:
                        paginaAtual === totalPaginas
                          ? "not-allowed"
                          : "pointer",
                    }}
                  >
                    {">>"}
                  </li>
                </ul>
              </nav>
            </div>
          ) : (
            <Link href={`/home`} className="btn2">
              Voltar
            </Link>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
