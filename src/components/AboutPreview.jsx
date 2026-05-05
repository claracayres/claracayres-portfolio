import { surface, mutedText } from "../utils/theme";
import Icon from "./Icons";
import { useNavigate } from "react-router-dom";
function AboutPreview({ t, theme }) {
  const navigate = useNavigate();
  return (
    <section className="mt-20 grid gap-6 lg:grid-cols-[.85fr_1.15fr]">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-fuchsia-400">
          {t("home.aboutEyebrow")}
        </p>
        <h2 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
          {t("home.aboutTitle")}
        </h2>
      </div>
      <div className={`rounded-4xl border p-7 ${surface(theme)}`}>
        <p className={`text-xl leading-9 ${mutedText(theme)}`}>
          {t("home.aboutText")}
        </p>
        <button
          onClick={() => navigate("/sobre")}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-fuchsia-500 to-cyan-400 px-6 py-4 font-black text-white transition hover:scale-105"
        >
          {t("home.learnMore")} <Icon name="arrow" />
        </button>
      </div>
    </section>
  );
}

export default AboutPreview;
