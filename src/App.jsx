import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Achievements from "./pages/Achievements";
import Contact from "./pages/Contact";
import ProjectDetails from "./pages/ProjectDetails";
import FloatingOrb from "./components/ui/FloatingOrb";

import { useScrollToTop } from "./hooks/useScrollToTop";
import { useTheme } from "./hooks/useTheme";
import { getThemeClass } from "./utils/theme";

function App() {
  const [theme, setTheme] = useTheme();
  useScrollToTop();
  return (
    <main
      className={`relative min-h-screen overflow-hidden font-sans transition-colors duration-500 ${getThemeClass(
        theme
      )}`}
    >
      <FloatingOrb className="top-32 -left-32 h-72 w-72 bg-fuchsia-600/35" />

      <Navbar theme={theme} setTheme={setTheme} />
      
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<Home theme={theme} />} />
          <Route path="/sobre" element={<About theme={theme} />} />
          <Route path="/projetos" element={<Projects theme={theme} />} />
          <Route
            path="/projetos/:slug"
            element={<ProjectDetails theme={theme} />}
          />
          <Route path="/contato" element={<Contact theme={theme} />} />

          <Route path="/admin-login" element={<AdminLogin theme={theme}/>} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard theme={theme} setTheme={setTheme} />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Footer theme={theme} />
        <BackToTop />
      </div>
    </main>
  );
}

export default App;
