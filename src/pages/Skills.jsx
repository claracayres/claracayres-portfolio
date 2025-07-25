import { useTranslation } from "react-i18next";

const Skills = () => {
  const { t } = useTranslation();

  return (
    <section
      id="skills"
      className="from-darkBlue to-darkBlue/95 bg-gradient-to-b py-20"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-2 text-3xl font-bold md:text-4xl">
            {t("skills.title")}{" "}
            <span className="gradient-text">{t("skills.subtitle")}</span>
          </h2>
          <div className="from-pink to-purple mx-auto h-1 w-24 bg-gradient-to-r"></div>
          <p className="mx-auto mt-4 max-w-2xl text-gray-300">
            {t("skills.description")}
          </p>
        </div>

        {/* Skills List */}
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
          {[
            { name: "HTML & CSS", percentage: 85 },
            { name: "JavaScript", percentage: 50 },
            { name: "React", percentage: 85 },
            { name: "Node.js", percentage: 80 },
            { name: "UI/UX Design", percentage: 75 },
            { name: "Python", percentage: 50 },
          ].map((skill, index) => (
            <div key={index}>
              <div className="mb-2 flex justify-between">
                <span className="font-medium">{skill.name}</span>
                <span className="text-pink">{skill.percentage}%</span>
              </div>
              <div className="skill-bar">
                <div
                  className="skill-progress"
                  style={{ width: `${skill.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Technologies & Tools */}
        <div className="mt-20">
          <h3 className="text-lightPurple mb-10 text-center text-2xl font-semibold">
            {t("skills.technologies")}
          </h3>
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {[
              { icon: "fab fa-html5", color: "text-pink", name: "HTML5" },
              { icon: "fab fa-css3-alt", color: "text-purple", name: "CSS3" },
              { icon: "fab fa-js", color: "text-pink", name: "JavaScript" },
              { icon: "fab fa-react", color: "text-purple", name: "React" },
              { icon: "fab fa-node-js", color: "text-pink", name: "Node.js" },
              { icon: "fab fa-git-alt", color: "text-purple", name: "Git" },
              { icon: "fab fa-figma", color: "text-pink", name: "Figma" },
              { icon: "fab fa-python", color: "text-purple", name: "Python" },
              { icon: "fab fa-docker", color: "text-pink", name: "Docker" },
              {
                icon: "fab fa-microsoft",
                color: "text-purple",
                name: "Microsoft Azure",
              },
            ].map((tech, index) => {
              const totalItems = 10;
              const itemsPerRow = 6;
              const itemsInLastRow = totalItems % itemsPerRow;
              const isFirstOfLastRow = index === totalItems - itemsInLastRow;

              return (
                <div
                  key={index}
                  className={`card hover:glow flex flex-col items-center justify-center rounded-lg p-4 transition-all ${
                    isFirstOfLastRow ? "lg:col-start-2" : ""
                  }`}
                >
                  <i className={`${tech.icon} text-4xl ${tech.color} mb-3`}></i>
                  <span className="text-sm">{tech.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
