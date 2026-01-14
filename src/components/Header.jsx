import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const { t } = useTranslation();
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark"),
  );

  const modeSwitch = () => {
    const html = document.documentElement;
    const newTheme = html.classList.toggle("dark");
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  useEffect(() => {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");

    const toggleMobileMenu = () => {
      mobileMenu.classList.toggle("hidden");
    };

    mobileMenuButton.addEventListener("click", toggleMobileMenu);

    // Active nav link
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    const handleScroll = () => {
      let current = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;

        if (window.pageYOffset >= sectionTop - 200) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").substring(1) === current) {
          link.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listeners on component unmount
    return () => {
      mobileMenuButton.removeEventListener("click", toggleMobileMenu);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <nav className="bg-darkBlue/50 dark:bg-gray-50 fixed z-50 w-full shadow-lg backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <a href="#home" className="gradient-text text-2xl font-bold">
          Clara.<span className="dev">dev</span>
        </a>
        <div className="hidden space-x-8 md:flex">
          <a
            href="#home"
            className="nav-link active hover:text-pink transition-colors"
          >
            {t("nav.home")}
          </a>
          <a
            href="#about"
            className="nav-link hover:text-pink transition-colors"
          >
            {t("nav.about")}
          </a>
          <a
            href="#projects"
            className="nav-link hover:text-pink transition-colors"
          >
            {t("nav.projects")}
          </a>
          <a
            href="#achievements"
            className="nav-link hover:text-pink transition-colors"
          >
            {t("nav.achievements")}
          </a>
          <a
            href="#skills"
            className="nav-link hover:text-pink transition-colors"
          >
            {t("nav.skills")}
          </a>
          <a
            href="#contact"
            className="nav-link hover:text-pink transition-colors"
          >
            {t("nav.contact")}
          </a>
        </div>
        <LanguageSwitcher />
        <button
          onClick={modeSwitch}
          className="bg-lightPurple/20 h-8 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-purple/30"
        >
          <i
            className={`fas ${
              isDark ? "fa-sun text-yellow-200" : "fa-moon text-gray-800"
            }`}
          ></i>
        </button>
        <button
          id="mobile-menu-button"
          className="dev focus:outline-none md:hidden"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      {/* Menu mobile */}
      <div
        id="mobile-menu"
        className="bg-darkBlue/5 hidden backdrop-blur-md md:hidden"
      >
        <div className="container mx-auto flex flex-col space-y-3 px-4 py-3">
          <a
            href="#home"
            className="nav-link active hover:text-pink py-2 transition-colors"
          >
            {t("nav.home")}
          </a>
          <a
            href="#about"
            className="nav-link hover:text-pink py-2 transition-colors"
          >
            {t("nav.about")}
          </a>
          <a
            href="#projects"
            className="nav-link hover:text-pink py-2 transition-colors"
          >
            {t("nav.projects")}
          </a>
          <a
            href="#achievements"
            className="nav-link hover:text-pink py-2 transition-colors"
          >
            {t("nav.achievements")}
          </a>
          <a
            href="#skills"
            className="nav-link hover:text-pink py-2 transition-colors"
          >
            {t("nav.skills")}
          </a>
          <a
            href="#contact"
            className="nav-link hover:text-pink py-2 transition-colors"
          >
            {t("nav.contact")}
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
