import Link from "next/link";
import Lucide from "@/utils/lucide";
import Button from "../button/button";
import styles from "./header.module.css";
import { createPortal } from "react-dom";
import { TrocaTema } from "@/utils/trocaTema";
import { useAuthHeader } from "@/pages/hooks/useAuthHeader";
import { useMenuLateral } from "@/pages/hooks/useMenuLateral";

const LINKS_MENU = [
  { href: "/login", label: "Login", icone: "LogIn" },
  { href: "/estoque", label: "Estoque", icone: "ShelvingUnit" },
  { href: "/cTProduto", label: "+ Criar Tipo", icone: "PackagePlus" },
  { href: "/cCategoria", label: "+ Criar Categoria", icone: "Grid2X2Plus" },
  { href: "/cLocalizacao", label: "+ Criar Localização", icone: "MapPinPlus" },
  { href: "/cProduto", label: "+ Cadastrar Produto", icone: "HeartPlus" },
  { href: "/cUsuario", label: "+ Cadastrar Usuário", icone: "UserRoundPlus" },
  {
    href: "/cInstituicao",
    label: "+ Cadastrar Instituição",
    icone: "HousePlus",
  },
  { href: "/historico", label: "Histórico Geral", icone: "History" },
  { href: "/home", label: "Tela Inicial", icone: "HouseHeart" },
] as const;

export default function Header() {
  const { usuario, handleLogout } = useAuthHeader();
  const { menuAberto, estaFechando, mounted, abrirMenu, fecharMenu } =
    useMenuLateral();

  const menuLateral = (
    <>
      <div
        className={estaFechando ? styles.overlayClosing : styles.overlay}
        onClick={fecharMenu}
      />

      <aside className={estaFechando ? styles.sidebarClosing : styles.sidebar}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={fecharMenu}
        >
          <Lucide name="X" className="reset_lucide" />
        </button>

        {LINKS_MENU.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={styles.menuLink}
            onClick={fecharMenu}
          >
            {item.label}
            <Lucide name={item.icone} className="reset_lucide" />
          </Link>
        ))}
      </aside>
    </>
  );

  return (
    <>
      <header className="main_header" id={styles.header}>
        <div className="container row" id={styles.info_header}>
          <Link href="/home">
            <img
              className="img"
              id={styles.img}
              src="/svg/Logo.svg"
              alt="Logo do site"
            />
          </Link>

          <div id={styles.div}>
            <div className="row">
              <Button
                className="column no_gap"
                id={styles.user_info}
                onClick={handleLogout}
              >
                {usuario ? (
                  <>
                    <h4 className="h4">{usuario.nome}</h4>
                    <p className="p">{usuario.email}</p>
                  </>
                ) : (
                  <>
                    <h4 className="h4">Nome</h4>
                    <p className="p">email@email.com</p>
                  </>
                )}
              </Button>
            </div>
            <TrocaTema className={`${styles.trocaTema} ${styles.headerIcon}`} />
            <button
              type="button"
              className={`menuIcon ${styles.headerIcon}`}
              onClick={abrirMenu}
            >
              <Lucide name="Menu" />
            </button>
          </div>
        </div>
      </header>

      {mounted && menuAberto && createPortal(menuLateral, document.body)}
    </>
  );
}
