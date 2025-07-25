import React from "react";
import { Analytics } from "@vercel/analytics/react";
import { useEffect } from "react";
import { initDomScripts } from "/Script";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About-me";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Achievements from "./pages/Achievements";
import Contact from "./pages/Contact";
import BackToTop from "./components/BackToTop";

function App() {
  useEffect(() => {
    initDomScripts(); // roda tudo depois que o DOM estiver pronto
  }, []);

  return (
    <>
      <Header />
      <main>
        <section id="home">
          <Home />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="achievements">
          <Achievements />
        </section>
        <section id="skills">
          <Skills />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />
      <BackToTop />
      <Analytics />
    </>
  );
}

export default App;
