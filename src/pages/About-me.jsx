import eu from "../assets/eu2.jpg";
import { useTranslation } from "react-i18next";

const AboutMe = () => {
  const { t } = useTranslation();

  return (
    <section
      id="about"
      className="from-darkBlue to-darkBlue/95 bg-gradient-to-b py-20 mx-10"
    >
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-2 text-3xl font-bold md:text-4xl">
            {t("about.title")}{" "}
            <span className="gradient-text">{t("about.subtitle")}</span>
          </h2>
          <div className="from-pink to-purple mx-auto h-1 w-24 bg-gradient-to-r"></div>
        </div>

        <div className="flex flex-col items-center gap-10 md:flex-row">
          <div className="md:w-2/5">
            <div className="relative">
              <div className="from-pink to-purple absolute inset-0 -m-2 rounded-lg bg-gradient-to-tr opacity-20 blur-md"></div>
              <div className="card relative rounded-lg p-1">
                <div className="bg-darkBlue overflow-hidden rounded-lg">
                  <svg
                    className="text-purple/30 h-auto w-full"
                    viewBox="0 0 200 200"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      d="M47.7,-57.2C59.9,-45.8,66.8,-29.1,68.7,-12.1C70.6,4.9,67.4,22.2,57.9,34.8C48.4,47.4,32.6,55.4,15.8,61.3C-1,67.2,-18.9,71,-33.6,65.2C-48.3,59.4,-59.8,44,-65.2,27.3C-70.6,10.7,-69.9,-7.2,-63.4,-22.1C-56.9,-37,-44.5,-48.9,-31.1,-59.8C-17.7,-70.7,-3.3,-80.6,10.3,-79.8C23.9,-79,47.8,-67.5,47.7,-57.2Z"
                      transform="translate(100 100)"
                    />
                  </svg>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={eu}
                      alt="Maria Clara"
                      className="border-purple/30 h-50 w-50 rounded-full border-4 object-cover shadow-md md:h-75 md:w-75"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-3/5">
            <h3 className="text-lightPurple mb-4 text-2xl font-semibold">
              {t("about.area")}
            </h3>
            <p className="mb-2 text-gray-300">{t("about.p1")}</p>
            <p className="mb-2 text-gray-300">{t("about.p2")}</p>
            <p className="mb-2 text-gray-300">{t("about.p3")}</p>
            <p className="mb-2 text-gray-300">{t("about.p4")}</p>
            <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                {
                  icon: "fas fa-user-graduate",
                  title: <>{t("aboutopics.education")}</>,
                  description: (
                    <>
                      {t("aboutopics.edescription")} <br />
                      {t("aboutopics.edgraduation")}
                    </>
                  ),
                  bgColor: "bg-pink/20",
                  iconColor: "text-pink",
                },
                {
                  icon: "fas fa-briefcase",
                  title: <>{t("aboutopics.experience")}</>,
                  description: <>{t("aboutopics.exdescription")}</>,
                  bgColor: "bg-purple/20",
                  iconColor: "text-purple",
                },
                {
                  icon: "fas fa-map-marker-alt",
                  title: <>{t("aboutopics.location")}</>,
                  description: <>{t("aboutopics.locdescription")}</>,
                  bgColor: "bg-pink/20",
                  iconColor: "text-pink",
                },
                {
                  icon: "fas fa-laptop-code",
                  title: "Freelance",
                  description: <>{t("aboutopics.fredescription")}</>,
                  bgColor: "bg-purple/20",
                  iconColor: "text-purple",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`h-12 w-12 rounded-full ${item.bgColor} mr-4 flex items-center justify-center`}
                  >
                    <i className={`${item.icon} ${item.iconColor}`}></i>
                  </div>
                  <div>
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <a
              download="Resume-Maria-Clara-Cayres-de-Almeida.pdf"
              href={t("about.btnlink")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient shadow-pink/20 inline-block rounded-full px-8 py-3 font-medium shadow-lg transition-opacity hover:opacity-90"
            >
              {t("about.btn")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
