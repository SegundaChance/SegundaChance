import styles from "./estoque.module.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import Lista from "@/components/lista/lista";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min_height">
        <section id={styles.section}>
          <Lista />
        </section>
      </main>
      <Footer />
    </>
  );
}
