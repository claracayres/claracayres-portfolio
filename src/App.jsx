import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AdminAchievements from "./pages/AdminAchievements";
import AdminProjects from "./pages/AdminProjects";
import AdminSkills from "./pages/AdminSkills";
import Home from "./pages/Home";
import About from "./pages/About-me";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Achievements from "./pages/Achievements";
import Contact from "./pages/Contact";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
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
          }
        />

        <Route path="/admin" element={<AdminAchievements />} />
        <Route path="/admin-projects" element={<AdminProjects />} />
        <Route path="/admin-skills" element={<AdminSkills />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
