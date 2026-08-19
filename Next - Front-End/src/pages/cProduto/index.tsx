import Link from "next/link";
import Lucide from "@/utils/lucide";
import Button from "@/components/button/button";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import { useProdutoForm } from "../hooks/useProduto";
import { useCustomSelect } from "../hooks/useCustomSelect";

const METADADOS_SELECTS = {
  tipo: { label: "Tipo", icone: "Package" as const },
  categoria: { label: "Categoria", icone: "Grid2X2" as const },
  localizacao: { label: "Localização", icone: "MapPin" as const },
  usuario: { label: "Usuário", icone: "User" as const },
};

export default function CadastroProduto() {
  const {
    telaEditar,
    formRef,
    titulo,
    setTitulo,
    preco,
    setPreco,
    descricao,
    setDescricao,
    tamanho,
    setTamanho,
    preview,
    carregando,
    listaTipos,
    listaLocalizacoes,
    listaUsuarios,
    categoriasFiltradas,
    valoresSelect,
    handleFileChange,
    handleRemoveImage,
    handleSelecionarOpcao,
    salvarProduto,
    renderizarPreview,
  } = useProdutoForm();

  const { selectAberto, alternarSelect } = useCustomSelect(formRef);

  const renderSelectCustomizado = (campo: keyof typeof METADADOS_SELECTS) => {
    const config = METADADOS_SELECTS[campo];
    const valorAtual = valoresSelect[campo];
    const aberto = selectAberto[campo];

    let listaAlvo: any[] = [];
    let extrairNome = (item: any) => "";
    let extrairId = (item: any) => "";

    if (campo === "tipo") {
      listaAlvo = listaTipos;
      extrairNome = (item) => item.nomeTipo || "";
      extrairId = (item) =>
        String(
          item.tipoId ?? item.tipoProdutoID ?? item.tipoProdutoId ?? item.id,
        );
    } else if (campo === "categoria") {
      listaAlvo = categoriasFiltradas;
      extrairNome = (item) => item.nomeCategoria || "";
      extrairId = (item) =>
        String(item.categoriaId ?? item.categoriaID ?? item.id);
    } else if (campo === "localizacao") {
      listaAlvo = listaLocalizacoes;
      extrairNome = (item) => item.nomeLocalizacao || "";
      extrairId = (item) =>
        String(item.localizacaoId ?? item.localizacaoID ?? item.id);
    } else if (campo === "usuario") {
      listaAlvo = listaUsuarios;
      extrairNome = (item) => item.nome || item.nomeUsuario || "";
      extrairId = (item) => String(item.usuarioId ?? item.usuarioID ?? item.id);
    }

    const itemSelecionado = listaAlvo.find(
      (item) => extrairId(item) === valorAtual,
    );
    const labelExibida = itemSelecionado ? extrairNome(itemSelecionado) : "";

    const aoSelecionar = (valor: string) => {
      handleSelecionarOpcao(campo, valor);
      alternarSelect("");
    };

    return (
      <div
        className={`campo_select ${aberto ? "open" : ""} ${valorAtual ? "has-value" : ""}`}
      >
        <Lucide
          name={config.icone}
          className="lucide rotate"
          style={{
            transition: "transform 0.2s ease",
            transform: aberto
              ? "translateY(-50%) rotate(180deg)"
              : "translateY(-50%)",
          }}
        />
        <div
          className="select"
          tabIndex={0}
          onClick={() => alternarSelect(campo)}
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            paddingLeft: "50px",
          }}
        >
          <span>{labelExibida}</span>
        </div>
        <label className="label">{config.label}</label>

        {aberto && (
          <ul className="dropdown_options">
            <li onClick={() => aoSelecionar("")}>
              <Lucide name="RectangleEllipsis" className="reset_lucide" />{" "}
              Nenhum
            </li>
            {listaAlvo.map((opcao, index) => {
              const idMapeado = extrairId(opcao);
              return (
                <li
                  key={`select-${campo}-${index}`}
                  onClick={() => aoSelecionar(idMapeado)}
                >
                  {extrairNome(opcao)}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  };

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

        <section className="container column">
          <h1 className="h1">{telaEditar ? "Editar" : "Cadastrar"} Produto</h1>

          <div className="info column">
            <form
              className="form grid"
              ref={formRef}
              onSubmit={salvarProduto}
              id="form-produto"
            >
              <div className="column full_height">
                <div className="campo_img">
                  <label htmlFor="upload-foto" className="input_upload">
                    {preview ? (
                      <div className="relative_pos full_size_preview">
                        <img
                          src={renderizarPreview(preview)}
                          alt="Preview"
                          className="preview_img"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="btn_delete"
                        >
                          X
                        </button>
                      </div>
                    ) : (
                      <>
                        <Lucide
                          name="Upload"
                          size={24}
                          className="upload_lucide"
                        />
                        <span>Escolher Imagem</span>
                      </>
                    )}
                  </label>
                  <input
                    id="upload-foto"
                    type="file"
                    accept="image/*"
                    className="input_img"
                    required={!telaEditar && !preview}
                    onChange={handleFileChange}
                    disabled={carregando}
                  />
                </div>
              </div>

              <div className="column full_height">
                <div className="campo_form">
                  <Lucide name="ALargeSmall" className="lucide" />
                  <input
                    type="text"
                    id="titulo"
                    placeholder=" "
                    className="input"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    disabled={carregando}
                    required
                  />
                  <label htmlFor="titulo" className="label">
                    Título
                  </label>
                </div>
                <div className="campo_form">
                  <Lucide name="Tag" className="lucide" />
                  <input
                    type="text"
                    id="preco"
                    placeholder=" "
                    className="input"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                    disabled={carregando}
                    required
                  />
                  <label htmlFor="preco" className="label">
                    Preço
                  </label>
                </div>
                <div className="campo_form">
                  <Lucide
                    name="MessageSquareText"
                    className="lucide desc_lucide"
                  />
                  <textarea
                    id="descricao"
                    placeholder=" "
                    className="textarea"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    disabled={carregando}
                  />
                  <label htmlFor="descricao" className="label">
                    Descrição
                  </label>
                </div>
              </div>

              <div className="column full_height">
                {renderSelectCustomizado("tipo")}
                {renderSelectCustomizado("categoria")}
                {renderSelectCustomizado("localizacao")}
                {renderSelectCustomizado("usuario")}

                <div className="campo_form">
                  <Lucide name="RulerDimensionLine" className="lucide" />
                  <input
                    type="text"
                    id="tamanho"
                    placeholder=" "
                    className="input"
                    value={tamanho}
                    onChange={(e) => setTamanho(e.target.value)}
                    disabled={carregando}
                    required
                  />
                  <label htmlFor="tamanho" className="label">
                    Tamanho
                  </label>
                </div>
              </div>
            </form>
            <div className="row">
              <Link href="/home" className="btn2">
                Voltar
              </Link>
              <Button type="submit" form="form-produto" disabled={carregando}>
                {carregando ? "Salvando..." : "Salvar"}
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
