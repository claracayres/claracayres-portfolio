import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { API_ENDPOINTS } from "../config/api";

const Skills = () => {
  const { t } = useTranslation();
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [animatedSkills, setAnimatedSkills] = useState({}); // Estado para animações
  const [hasAnimated, setHasAnimated] = useState(false); // Para animar apenas uma vez
  const skillsRef = useRef(null);

  // Fetch skills from API
  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(API_ENDPOINTS.SKILLS);
      if (response.ok) {
        const data = await response.json();
        setSkills(data);
      } else {
        console.error("Erro ao buscar skills:", response.status);
      }
    } catch (error) {
      console.error("Erro ao buscar skills:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Animate skills on scroll - CORRIGIDO
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Remove a condição de hasAnimated para que funcione sempre
          if (entry.isIntersecting && skills.length > 0) {
            // Só anima se ainda não foi animado
            if (!hasAnimated) {
              setHasAnimated(true);

              // Animar skills de programação
              const programmingSkills = skills.filter(
                (skill) => !skill.category || skill.category === "programming",
              );

              programmingSkills.forEach((skill, index) => {
                setTimeout(() => {
                  setAnimatedSkills((prev) => ({
                    ...prev,
                    [skill._id || index]: skill.percentage,
                  }));
                }, index * 150); // Delay escalonado para cada skill
              });
            }
          }
        });
      },
      {
        threshold: 0.2, // Reduzido para detectar mais cedo
        rootMargin: "0px 0px -100px 0px", // Margem para ativar antes
      },
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => observer.disconnect();
  }, [skills, hasAnimated]);

  // Separar skills por categoria
  const programmingSkills = skills.filter(
    (skill) => !skill.category || skill.category === "programming",
  );
  const toolsSkills = skills.filter((skill) => skill.category === "tools");
  const designSkills = skills.filter((skill) => skill.category === "design");

  return (
    <section id="skills" ref={skillsRef} className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-2 text-3xl font-bold md:text-4xl">
            {t("skills.title")}{" "}
            <span className="gradient-text">{t("skills.subtitle")}</span>
          </h2>
          <div className="from-pink to-purple mx-auto h-1 w-24 bg-gradient-to-r"></div>
          <p className="mx-auto mt-4 max-w-2xl">
            {t("skills.description")}
          </p>
        </div>

        {/* Skills List */}
        {isLoading ? (
          <div className="text-center">
            <div className="border-pink inline-block h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
            <p className="mt-2 text-gray-400">Carregando skills...</p>
          </div>
        ) : (
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
            {programmingSkills.map((skill, index) => (
              <div key={skill._id || index} className="skill-item">
                <div className="mb-2 flex justify-between">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-pink font-semibold">
                    {/* Mostra a porcentagem real se já foi animado, caso contrário 0 */}
                    {hasAnimated
                      ? skill.percentage
                      : animatedSkills[skill._id || index] || 0}
                    %
                  </span>
                </div>
                <div className="skill-bar dark:bg-darkBlue/50 h-3 w-full overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="skill-progress from-pink to-purple h-full rounded-full bg-gradient-to-r transition-all duration-1000 ease-out"
                    style={{
                      // Se já foi animado, mantém a largura total, caso contrário usa o estado animado
                      width: hasAnimated
                        ? `${skill.percentage}%`
                        : `${animatedSkills[skill._id || index] || 0}%`,
                      transitionDelay: `${index * 150}ms`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Technologies & Tools */}
        <div className="mt-20">
          <h3 className="text-lightPurple dark:text-darkBlue mb-10 text-center text-2xl font-semibold">
            {t("skills.technologies")}
          </h3>
          {isLoading ? (
            <div className="text-center">
              <div className="border-pink inline-block h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-10">
              {toolsSkills.concat(designSkills).map((tech, index) => {
                const totalItems = toolsSkills.length + designSkills.length;
                const itemsPerRow = 6;
                const itemsInLastRow = totalItems % itemsPerRow;
                const isFirstOfLastRow = index === totalItems - itemsInLastRow;

                return (
                  <div
                    key={tech._id || index}
                    className={`card hover:glow flex h-30 w-30 transform flex-col items-center justify-center rounded-lg p-4 text-center transition-all duration-300 hover:scale-105 ${
                      isFirstOfLastRow && itemsInLastRow > 0
                        ? "lg:col-start-2"
                        : ""
                    }`}
                    style={{
                      animationDelay: `${(programmingSkills.length + index) * 100}ms`,
                    }}
                  >
                    {tech.icon ? (
                      <i
                        className={`${tech.icon} text-4xl ${tech.color || "text-pink"} mb-3`}
                      ></i>
                    ) : (
                      <div
                        className={`text-4xl ${tech.color || "text-pink"} mb-3`}
                      >
                        ⚡
                      </div>
                    )}
                    <span className="text-sm">{tech.name}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;
