import Button from "@/components/button/button";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Link from "next/link";
import Lucide from "@/utils/lucide";
import { useCategoria } from "../hooks/useCategoria";

export default function CadastroCategoria() {
  const {
    categoria,
    setCategoria,
    valorTipo,
    selectAberto,
    tiposProduto,
    formRef,
    handleCadastro,
    alternarSelect,
    handleSelecionarOpcao,
    labelExibida,
  } = useCategoria();

  return (
    <>
      <Header />
      <main className="min_height">
        <svg
          width="313"
          height="590"
          viewBox="0 0 313 590"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="fixed path2"
          style={{ left: "0" }}
        >
          <path
            d="M0 109.002C17.5003 109.002 147.819 -34.6658 208.195 28.5686C281.301 105.137 137.521 125.098 138.875 209.814C140.446 308.076 298.245 287.843 299.985 396.703C302.34 544.035 22.0093 577.488 0 577.488"
            strokeWidth="20"
            strokeLinecap="round"
          />
        </svg>

        <svg
          width="313"
          height="590"
          viewBox="0 0 313 590"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="fixed path2"
          style={{ right: "0" }}
        >
          <path
            d="M312.5 577.5C312.5 577.5 77.8148 563.562 77.8148 469.65C77.8148 387.284 204.507 379.047 204.507 298.199C204.507 219.164 12.5 241 12.5 131.741C12.5 -29.8913 196.591 -4.19628 312.5 73.8153"
            strokeWidth="20"
            strokeLinecap="round"
          />
        </svg>

        <section className="container column max_width">
          <form className="form info2" ref={formRef} onSubmit={handleCadastro}>
            <h1>Criar Categoria</h1>

            <div className="campo_form max_width">
              <Lucide name="Grid2X2Plus" className="lucide" />
              <input
                type="text"
                id="nomeCategoria"
                placeholder=" "
                className="input"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                required
              />
              <label htmlFor="nomeCategoria" className="label">
                Nome
              </label>
            </div>

            <div
              className={`campo_select max_width ${
                selectAberto ? "open" : ""
              } ${valorTipo ? "has-value" : ""}`}
            >
              <Lucide
                name="Package"
                className="lucide rotate"
                style={{
                  transition: "transform 0.2s ease",
                  transform: selectAberto
                    ? "translateY(-50%) rotate(180deg)"
                    : "translateY(-50%)",
                }}
              />

              <div
                className="select max_width"
                tabIndex={0}
                onClick={alternarSelect}
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  paddingLeft: "50px",
                }}
              >
                <span>{labelExibida}</span>
              </div>

              <label className="label">Tipo</label>

              {selectAberto && (
                <ul className="dropdown_options" style={{ display: "block" }}>
                  <li onClick={() => handleSelecionarOpcao("")}>
                    <Lucide name="RectangleEllipsis" className="reset_lucide" />
                    Nenhum
                  </li>

                  {tiposProduto?.map((tipo: any) => (
                    <li
                      key={tipo.tipoId}
                      onClick={() => handleSelecionarOpcao(String(tipo.tipoId))}
                    >
                      {tipo.nomeTipo}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="row">
              <Link href="/home" className="btn2">
                Voltar
              </Link>

              <Button type="submit">Salvar</Button>
            </div>
          </form>
        </section>
      </main>

      <Footer />
    </>
  );
}
