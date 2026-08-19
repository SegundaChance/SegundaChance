import Lucide from "@/utils/lucide";
import styles from "./lista.module.css";
import Card from "@/components/cards/cards";
import { useRef } from "react";
import { useLista } from "@/pages/hooks/useLista";
import { useCustomSelect } from "@/pages/hooks/useCustomSelect";
import { useListaProdutos } from "@/pages/hooks/useListaProdutos";

const LABELS_ORDENACAO: Record<string, string> = {
  "": "",
  menor: "Menor Preço",
  maior: "Maior Preço",
  alfabetica: "A-Z",
  "alfabetica-contraria": "Z-A",
};

const ICONES_ORDENACAO: Record<string, any> = {
  "": "Filter",
  menor: "ChartNoAxesColumnDecreasing",
  maior: "ChartNoAxesColumnIncreasing",
  alfabetica: "ArrowDownAZ",
  "alfabetica-contraria": "ArrowDownZA",
};

export default function Lista() {
  const selectRef = useRef<HTMLDivElement>(null);

  const {
    paginaAtual,
    setPaginaAtual,
    ordenacao,
    pesquisa,
    setPesquisa,
    statusFiltro,
    itensPorPagina,
    produtosFiltrados,
    cardsExibidos,
    totalPaginas,
    confirmarExcluir,
    handleMudarItensPorPagina,
    handleMudarStatus,
    handleSelecionarOrdenacao,
  } = useListaProdutos();

  const { selectAberto, alternarSelect, fecharTodos } = useCustomSelect(
    selectRef as any,
  );

  const {
    paginasVisiveis,
    proximaPagina,
    paginaAnterior,
    primeiraPagina,
    ultimaPagina,
  } = useLista({
    itens: produtosFiltrados,
    itensPorPagina,
  });

  const dropdownAberto = selectAberto.tipo;

  const onSelectOrdenacao = (valor: string) => {
    handleSelecionarOrdenacao(valor);
    fecharTodos();
  };

  return (
    <div id={styles.lista}>
      <div className="row to_column">
        <div className="row to_column2" id={styles.filtros}>
          {/* Input de Pesquisa */}
          <div className="campo_form">
            <Lucide name="Search" className="lucide" />
            <input
              type="text"
              id="pesquisa"
              placeholder=" "
              className="input"
              value={pesquisa}
              onChange={(e) => {
                setPesquisa(e.target.value);
                setPaginaAtual(1);
              }}
            />
            <label htmlFor="pesquisa" className="label">
              Pesquise seu produto...
            </label>
          </div>

          {/* Select Customizado */}
          <div
            className={`campo_select ${dropdownAberto ? "open" : ""} ${
              ordenacao ? "has-value" : ""
            }`}
            ref={selectRef}
          >
            <Lucide
              name={ICONES_ORDENACAO[ordenacao]}
              className="lucide rotate"
              style={{
                transition: "transform 0.2s ease",
                transform: dropdownAberto
                  ? "translateY(-50%) rotate(180deg)"
                  : "translateY(-50%)",
              }}
            />
            <div
              className="select"
              tabIndex={0}
              onClick={() => alternarSelect("tipo")}
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                paddingLeft: "50px",
              }}
            >
              <span>{LABELS_ORDENACAO[ordenacao]}</span>
            </div>
            <label className="label">Filtrar</label>

            {dropdownAberto && (
              <ul className="dropdown_options" style={{ display: "block" }}>
                <li onClick={() => onSelectOrdenacao("")}>
                  <Lucide name="RectangleEllipsis" className="reset_lucide" />{" "}
                  Nenhum
                </li>
                <li onClick={() => onSelectOrdenacao("menor")}>
                  <Lucide
                    name="ChartNoAxesColumnDecreasing"
                    className="reset_lucide"
                  />{" "}
                  Menor Preço
                </li>
                <li onClick={() => onSelectOrdenacao("maior")}>
                  <Lucide
                    name="ChartNoAxesColumnIncreasing"
                    className="reset_lucide"
                  />{" "}
                  Maior Preço
                </li>
                <li onClick={() => onSelectOrdenacao("alfabetica")}>
                  <Lucide name="ArrowDownAZ" className="reset_lucide" /> A-Z
                </li>
                <li onClick={() => onSelectOrdenacao("alfabetica-contraria")}>
                  <Lucide name="ArrowDownZA" className="reset_lucide" /> Z-A
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* Botões de Filtros e Input de Quantidade */}
        <div className="row">
          <div
            className="campo_form"
            style={{
              minWidth: "90px",
              width: "90px",
              margin: 0,
              position: "relative",
            }}
          >
            <input
              type="number"
              id="itensPorPagina"
              className="input"
              min="1"
              value={itensPorPagina}
              onChange={(e) => handleMudarItensPorPagina(e.target.value)}
              style={{
                textAlign: "center",
                paddingLeft: "10px",
                paddingRight: "30px",
              }}
            />
            <label
              htmlFor="itensPorPagina"
              className="label"
              style={{ left: "15px" }}
            >
              Qtd.
            </label>

            <div className={styles.spin_controles}>
              <button
                type="button"
                onClick={() =>
                  handleMudarItensPorPagina(String(itensPorPagina + 1))
                }
                className={styles.spin_btn}
              >
                <Lucide
                  name="ChevronUp"
                  className="reset_lucide"
                  style={{ width: "14px", height: "14px" }}
                />
              </button>
              <button
                type="button"
                onClick={() =>
                  handleMudarItensPorPagina(
                    String(Math.max(1, itensPorPagina - 1)),
                  )
                }
                className={styles.spin_btn}
              >
                <Lucide
                  name="ChevronDown"
                  className="reset_lucide"
                  style={{ width: "14px", height: "14px" }}
                />
              </button>
            </div>
          </div>

          <button
            id={styles.btn_inativo}
            onClick={() => handleMudarStatus("inativo")}
            style={{ opacity: statusFiltro === "inativo" ? 1 : 0.35 }}
          >
            <Lucide name="ShieldX" className="reset_lucide" />
          </button>

          <button
            id={styles.btn_ativo}
            onClick={() => handleMudarStatus("ativo")}
            style={{ opacity: statusFiltro === "ativo" ? 1 : 0.35 }}
          >
            <Lucide name="ShieldCheck" className="reset_lucide" />
          </button>

          <button
            id={styles.btn_padrao}
            onClick={() => handleMudarStatus("todos")}
            style={{ opacity: statusFiltro === "todos" ? 1 : 0.35 }}
          >
            <Lucide name="ShieldEllipsis" className="reset_lucide" />
          </button>
        </div>
      </div>

      {/* Listagem de Cards */}
      <ul className={`row ${styles.cards}`}>
        {produtosFiltrados.length > 0 ? (
          cardsExibidos.map((item, index) => (
            <Card
              key={item?.produtoID ?? `fantasma-${index}`}
              fantasma={!item}
              {...(item || {})}
              onDelete={() => item && confirmarExcluir(item.produtoID)}
            />
          ))
        ) : (
          <p className="info">Não foi possível encontrar seu produto...</p>
        )}
      </ul>

      {/* Paginação */}
      {totalPaginas > 1 && (
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
                opacity: paginaAtual === 1 ? 0.35 : 1,
                cursor: paginaAtual === 1 ? "not-allowed" : "pointer",
              }}
            >
              {"<"}
            </li>
            {paginasVisiveis.map((pagina) => (
              <li
                key={`pag-${pagina}`}
                onClick={() => setPaginaAtual(pagina)}
                className={`${paginaAtual === pagina ? "btn" : "btn2"} small_width`}
              >
                {pagina}
              </li>
            ))}
            <li
              className="btn small_width"
              onClick={proximaPagina}
              style={{
                opacity: paginaAtual === totalPaginas ? 0.35 : 1,
                cursor:
                  paginaAtual === totalPaginas ? "not-allowed" : "pointer",
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
                  paginaAtual === totalPaginas ? "not-allowed" : "pointer",
              }}
            >
              {">>"}
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
