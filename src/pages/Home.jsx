import eu from "../assets/eu.jpg";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const Home = () => {
  const { t } = useTranslation();
  useEffect(() => {
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  return (
    // Hero Section
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16"
    >
      <div className="container mx-10 flex flex-col items-center px-4 py-16 md:flex-row">
        <div className="mb-10 text-center md:mb-0 md:w-1/2 md:text-left">
          <p className="text-pink mb-2 text-lg">{t("hero.greeting")}</p>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            <span className="gradient-text">{t("hero.name")}</span>
          </h1>
          <h2 className="text-lightPurple mb-6 text-2xl font-semibold md:text-3xl">
            {t("hero.title")}
          </h2>
          <p className="mx-auto mb-8 max-w-lg text-gray-300 md:mx-0">
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:justify-start">
            <a
              href="#contact"
              className="btn-gradient shadow-pink/20 rounded-full px-8 py-3 font-medium shadow-lg transition-opacity hover:opacity-90"
            >
              {t("hero.cta")}
            </a>
            <a
              href="#projects"
              className="border-purple hover:bg-purple/10 rounded-full border bg-transparent px-8 py-3 font-medium transition-colors"
            >
              {t("hero.projects")}
            </a>
          </div>
        </div>
        <div className="flex justify-center md:w-1/2">
          <div className="relative h-64 w-64 md:h-80 md:w-80">
            <div className="from-pink to-purple absolute inset-0 animate-pulse rounded-full bg-gradient-to-br opacity-20 blur-xl"></div>
            <div className="bg-darkBlue border-purple/30 absolute inset-4 flex items-center justify-center overflow-hidden rounded-full border-2">
              <div className="absolute inset-0 flex items-center justify-center">
                <img src={eu} alt="Maria Clara" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 transform animate-bounce">
        <a
          href="#about"
          className="text-purple hover:text-pink transition-colors"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            ></path>
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Home;
