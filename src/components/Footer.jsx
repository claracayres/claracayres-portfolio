import { useTranslation } from "react-i18next";
const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-darkBlue border-purple/20 border-t py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4 md:mb-0">
            <a href="#home" className="gradient-text text-2xl font-bold">
              Clara.<span className="text-white">dev</span>
            </a>
          </div>

          <div className="mb-4 text-center md:mb-0 md:text-left">
            <p className="text-gray-400">
              ©2025 Clara Cayres. {t("footer.rights")}
            </p>
          </div>

          <div className="flex space-x-4 lg:mx-15">
            <a
              href="https://www.linkedin.com/in/maria-clara-cayres-de-almeida"
              target="_blank"
              className="hover:text-pink text-gray-400 transition-colors"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a
              href="https://github.com/claracayres"
              target="_blank"
              className="hover:text-purple text-gray-400 transition-colors"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href="https://instagram.com/clara.cayres"
              target="_blank"
              className="hover:text-purple text-gray-400 transition-colors"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
