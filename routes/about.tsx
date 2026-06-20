import { define } from "@/utils/state.ts";
import Header from "@/components/Header/Header.tsx";
import Footer from "@/components/Footer/Footer.tsx";
import AboutContent from "@/content/about.mdx";
import { aboutComponents } from "@/components/about/kit.tsx";
import styles from "./about.module.css";

export default define.page(function About() {
  return (
    <>
      <Header active="about" />
      <main id="main" class={styles.main}>
        <AboutContent components={aboutComponents} />
      </main>
      <Footer />
    </>
  );
});
