import PageShell from "../layouts/PageShell";
import { surface, mutedText } from "../utils/theme";
import Icon from "../components/Icons";
import ResumeButton from "../components/ResumeButton";
import { useTranslation } from "react-i18next";

function ContactPage({  theme }) {
  const { t } = useTranslation();

  return (
    <PageShell eyebrow={t("contact.eyebrow")} title={t("contact.title")} theme={theme}>
      <div className={`relative overflow-hidden rounded-[2.5rem] border p-8 text-center md:p-16 ${surface(theme, true)}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(217,70,239,.30),transparent_30%),radial-gradient(circle_at_70%_70%,rgba(34,211,238,.25),transparent_35%)]" />
        <div className="relative">
          <Icon name="rocket" className="mx-auto mb-6 text-lime-400" size={42} />
          <p className={`mx-auto max-w-2xl text-lg leading-8 ${mutedText(theme)}`}>{t("contact.text")}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="mailto:clara.cayres1205@gmail.com" className={`inline-flex items-center gap-2 rounded-full px-6 py-4 font-bold transition hover:scale-105 ${theme === "dark" ? "bg-white text-black" : "bg-slate-950 text-white"}`}><Icon name="mail" size={18} /> Email</a>
            <a href="https://www.linkedin.com/in/maria-clara-cayres-de-almeida" target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 rounded-full border px-6 py-4 font-bold transition hover:scale-105 ${surface(theme)}`}><Icon name="linkedin" size={18} /> LinkedIn</a>
            <a href="https://github.com/claracayres" target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 rounded-full border px-6 py-4 font-bold transition hover:scale-105 ${surface(theme)}`}><Icon name="github" size={18} /> GitHub</a>
            <ResumeButton t={t} theme={theme} />
          </div>
          <div className={`mt-10 flex items-center justify-center gap-2 ${mutedText(theme)}`}><Icon name="map" size={16} /> Brazil • United States experience</div>
        </div>
      </div>
    </PageShell>
  );
}

export default ContactPage;