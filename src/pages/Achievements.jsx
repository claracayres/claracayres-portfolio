import { useTranslation } from "react-i18next";
import SimpleCarousel from "../components/Carousel";
import English from "../assets/Certificates/Learn English Intermediate Grammar-1.png";
import english from "../assets/Certificates/english.jpg";
import backEnd from "../assets/Certificates/IBM back-end development.png";
import frontJohn from "../assets/Certificates/HTML, CSS, and Javascript for Web Developers-1.png";
import estrPython from "../assets/Certificates/Estrutura de dados em python-1.png";

const Achievements = () => {
  const { t } = useTranslation();
  const englishUci = import.meta.glob(
    "../assets/Certificates/English UCI/*.png",
    { eager: true },
  );
  const images1 = Object.values(englishUci).map((mod) => mod.default);
  const finalImageList1 = [English, ...images1];

  const ibmBackEnd = import.meta.glob(
    "../assets/Certificates/IBM back-end/*.png",
    { eager: true },
  );
  const images2 = Object.values(ibmBackEnd).map((mod) => mod.default);
  const finalImageList2 = [backEnd, ...images2];

  const webDevJHU = import.meta.glob(
    "../assets/Certificates/Web Dev John Hopkins/*.png",
    { eager: true },
  );
  const images3 = Object.values(webDevJHU).map((mod) => mod.default);
  const finalImageList3 = [frontJohn, ...images3];

  const meta = import.meta.glob("../assets/Certificates/Meta/*.png", {
    eager: true,
  });
  const images4 = Object.values(meta).map((mod) => mod.default);
  const finalImageList4 = [...images4];

  return (
    <section
      id="achievements"
      className="from-darkBlue/95 to-darkBlue bg-gradient-to-b py-20 mx-10"
    >
      {/* Container for the achievements section */}
      <div className="container mx-auto px-4">
        {/* Container for the achievements title */}
        <div className="mb-16 text-center">
          <h2 className="mb-2 text-3xl font-bold md:text-4xl">
            {t("achievements.title")}{" "}
            <span className="gradient-text">{t("achievements.subtitle")}</span>
          </h2>
          <div className="from-pink to-purple mx-auto h-1 w-24 bg-gradient-to-r"></div>
          <p className="mx-auto mt-4 max-w-2xl text-gray-300">
            {t("achievements.description")}
          </p>
        </div>

        {/* Grid layout for the achievements */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <div className="project-card card flex h-full flex-col justify-between overflow-hidden rounded-xl">
            <div className="from-pink to-purple flex h-70 items-center justify-center overflow-hidden bg-gradient-to-br">
              <SimpleCarousel images={finalImageList1} />
            </div>

            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <h3 className="mb-2 text-xl font-semibold">
                  Learn English Intermediate Grammar
                </h3>
                <p className="mb-4 font-semibold text-gray-400 italic">
                  University of California, Irvine <br />{" "}
                  {t("achievements.card1.date")}
                </p>
                <p className="mb-4 min-h-[80px] text-gray-400">
                  {t("achievements.card1.description")}
                </p>
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                <span className="bg-pink/20 text-pink rounded-full px-3 py-1 text-xs">
                  English
                </span>
                <span className="bg-purple/20 text-purple rounded-full px-3 py-1 text-xs">
                  Adjectives
                </span>
                <span className="bg-lightPurple/20 text-lightPurple rounded-full px-3 py-1 text-xs">
                  Clauses
                </span>
                <span className="bg-pink/20 text-pink rounded-full px-3 py-1 text-xs">
                  Grammar
                </span>
                <span className="bg-purple/20 text-purple rounded-full px-3 py-1 text-xs">
                  Vocabulary
                </span>
              </div>

              <div className="mt-auto">
                <a
                  href="https://www.coursera.org/account/accomplishments/specialization/84278JLPIK94"
                  target="blank"
                  className="text-pink transition-colors hover:text-white"
                >
                  <i className="fas fa-external-link-alt"></i>{" "}
                  {t("achievements.certificate")}
                </a>
              </div>
            </div>
          </div>
          {/* Card 2 */}
          <div className="project-card card flex h-full flex-col justify-between overflow-hidden rounded-xl">
            <div className="from-pink to-purple flex h-70 items-center justify-center overflow-hidden bg-gradient-to-br">
              <img
                src={english}
                alt="Developing AI Applications with Python and Flask"
                width={"100%"}
              />
            </div>
            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <h3 className="mb-2 text-xl font-semibold">
                  Beyond the Basics: Advanced Grammar
                </h3>
                <p className="mb-4 font-semibold text-gray-400 italic">
                  Wake Tech <br /> {t("achievements.card2.date")}
                </p>
                <p className="mb-4 text-gray-400">
                  {t("achievements.card2.description")}
                </p>
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                <span className="bg-pink/20 text-pink rounded-full px-3 py-1 text-xs">
                  English
                </span>
                <span className="bg-purple/20 text-purple rounded-full px-3 py-1 text-xs">
                  Grammar
                </span>
                <span className="bg-lightPurple/20 text-lightPurple rounded-full px-3 py-1 text-xs">
                  Vocabulary
                </span>
                <span className="bg-pink/20 text-pink rounded-full px-3 py-1 text-xs">
                  Conversation
                </span>
              </div>

              <div className="mt-auto">
                <a
                  href={english}
                  target="blank"
                  className="text-pink transition-colors hover:text-white"
                >
                  <i className="fas fa-external-link-alt"></i>{" "}
                  {t("achievements.certificate")}
                </a>
              </div>
            </div>
          </div>
          {/* Card 3 */}
          <div className="project-card card flex h-full flex-col justify-between overflow-hidden rounded-xl">
            <div className="from-pink to-purple flex h-70 items-center justify-center overflow-hidden bg-gradient-to-br">
              <SimpleCarousel images={finalImageList2} />
            </div>
            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <h3 className="mb-2 text-xl font-semibold">
                  IBM Back-End Development Professional Certificate
                </h3>
                <p className="mb-4 font-semibold text-gray-400 italic">
                  IBM <br />
                  {t("achievements.card3.date")}
                </p>
                <p className="mb-4 text-gray-400">
                  {t("achievements.card3.description")}
                </p>
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                <span className="bg-pink/20 text-pink rounded-full px-3 py-1 text-xs">
                  Python
                </span>
                <span className="bg-purple/20 text-purple rounded-full px-3 py-1 text-xs">
                  Flask
                </span>
                <span className="bg-lightPurple/20 text-lightPurple rounded-full px-3 py-1 text-xs">
                  Docker
                </span>
                <span className="bg-pink/20 text-pink rounded-full px-3 py-1 text-xs">
                  Kubernetes
                </span>
                <span className="bg-purple/20 text-purple rounded-full px-3 py-1 text-xs">
                  Microservices
                </span>
                <span className="bg-lightPurple/20 text-lightPurple rounded-full px-3 py-1 text-xs">
                  CI/CD
                </span>
              </div>

              <div className="mt-auto">
                <a
                  href="https://coursera.org/share/efe845ebd8e85c811815e568972a73c7"
                  target="blank"
                  className="text-pink transition-colors hover:text-white"
                >
                  <i className="fas fa-external-link-alt"></i>{" "}
                  {t("achievements.certificate")}
                </a>
              </div>
            </div>
          </div>
          {/* Card 4 */}
          <div className="project-card card flex h-full flex-col justify-between overflow-hidden rounded-xl">
            <div className="from-pink to-purple flex h-70 items-center justify-center overflow-hidden bg-gradient-to-br">
              <SimpleCarousel images={finalImageList3} />
            </div>
            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <h3 className="mb-2 text-xl font-semibold">
                  HTML, CSS, and Javascript for Web Developers
                </h3>
                <p className="mb-4 font-semibold text-gray-400 italic">
                  Johns Hopkins University <br /> April, 2025
                </p>
                <p className="mb-4 text-gray-400">
                  {t("achievements.card4.description")}
                </p>
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                <span className="bg-pink/20 text-pink rounded-full px-3 py-1 text-xs">
                  HTML5
                </span>
                <span className="bg-purple/20 text-purple rounded-full px-3 py-1 text-xs">
                  CSS3
                </span>
                <span className="bg-lightPurple/20 text-lightPurple rounded-full px-3 py-1 text-xs">
                  JavaScript
                </span>
                <span className="bg-pink/20 text-pink rounded-full px-3 py-1 text-xs">
                  AJAX
                </span>
                <span className="bg-purple/20 text-purple rounded-full px-3 py-1 text-xs">
                  UI/UX Design
                </span>
                <span className="bg-lightPurple/20 text-lightPurple rounded-full px-3 py-1 text-xs">
                  Responsive Design
                </span>
              </div>

              <div className="mt-auto">
                <a
                  href="https://coursera.org/share/81640d8b5ac271200908ac2247213225"
                  target="blank"
                  className="text-pink transition-colors hover:text-white"
                >
                  <i className="fas fa-external-link-alt"></i>{" "}
                  {t("achievements.certificate")}
                </a>
              </div>
            </div>
          </div>
          {/* Card 5 */}
          <div className="project-card card lg: flex h-full flex-col justify-between overflow-hidden rounded-xl">
            <div className="from-pink to-purple flex h-70 items-center justify-center overflow-hidden bg-gradient-to-br">
              <img
                src={estrPython}
                alt="Data Structures in Python"
                width={"100%"}
              />
            </div>
            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <h3 className="mb-2 text-xl font-semibold">
                  {t("achievements.card5.title")}
                </h3>
                <p className="mb-4 font-semibold text-gray-400 italic">
                  Anhanguera <br /> {t("achievements.card5.date")}
                </p>
                <p className="mb-4 text-gray-400">
                  {t("achievements.card5.description")}
                </p>
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                <span className="bg-pink/20 text-pink rounded-full px-3 py-1 text-xs">
                  Python
                </span>
                <span className="bg-purple/20 text-purple rounded-full px-3 py-1 text-xs">
                  Data Structures
                </span>
                <span className="bg-lightPurple/20 text-lightPurple rounded-full px-3 py-1 text-xs">
                  Algorithms
                </span>
                <span className="bg-pink/20 text-pink rounded-full px-3 py-1 text-xs">
                  Programming
                </span>
              </div>

              <div className="mt-auto">
                <a
                  href={estrPython}
                  target="blank"
                  className="text-pink transition-colors hover:text-white"
                >
                  <i className="fas fa-external-link-alt"></i>{" "}
                  {t("achievements.certificate")}
                </a>
              </div>
            </div>
          </div>

          {/* Card 6 */}
          <div className="project-card card lg: flex h-full flex-col justify-between overflow-hidden rounded-xl">
            <div className="from-pink to-purple flex h-70 items-center justify-center overflow-hidden bg-gradient-to-br">
              <SimpleCarousel images={finalImageList4} />
            </div>
            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <h3 className="mb-2 text-xl font-semibold">
                  {t("achievements.card6.title")}
                </h3>
                <p className="mb-4 font-semibold text-gray-400 italic">
                  Meta <br /> {t("achievements.card6.date")}
                </p>
                <p className="mb-4 text-gray-400">
                  {t("achievements.card6.description")}
                </p>
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                <span className="bg-pink/20 text-pink rounded-full px-3 py-1 text-xs">
                  Html5
                </span>
                <span className="bg-purple/20 text-purple rounded-full px-3 py-1 text-xs">
                  CSS3
                </span>
                <span className="bg-lightPurple/20 text-lightPurple rounded-full px-3 py-1 text-xs">
                  React
                </span>
                <span className="bg-pink/20 text-pink rounded-full px-3 py-1 text-xs">
                  UX/UI
                </span>
                <span className="bg-purple/20 text-purple rounded-full px-3 py-1 text-xs">
                  JavaScript
                </span>
              </div>

              <div className="mt-auto">
                <a
                  href={estrPython}
                  target="blank"
                  className="text-pink transition-colors hover:text-white"
                >
                  <i className="fas fa-external-link-alt"></i>{" "}
                  {t("achievements.certificate")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
