import { surface, mutedText } from "../utils/theme";
import { pages } from "../config/navigation";
import Icon from "./Icons";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function Footer({ theme }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <footer className="relative z-10 mx-auto max-w-7xl px-5 pb-8 md:px-8">
      <div className={`overflow-hidden rounded-[2.5rem] border backdrop-blur-xl ${surface(theme)}`}>
        <div className="grid gap-8 p-8 md:grid-cols-[1.2fr_.8fr_.8fr] md:p-10">
          <div>
            <div className="mb-5 flex items-center font-black tracking-tight">
              <span className={`grid h-10 w-10 mr-2 place-items-center rounded-2xl ${theme === "dark" ? "bg-white text-black" : "bg-slate-950 text-white"}`}>C</span>
              Clara<span className="text-fuchsia-500">.dev</span>
            </div>
            <p className={`max-w-md ${mutedText(theme)}`}>{t("footer.text")}</p>
          </div>

          <div>
            <p className={`mb-4 text-sm uppercase tracking-[0.25em] ${mutedText(theme)}`}>{t("footer.pages")}</p>
            <div className="grid gap-2">
              {pages.map((page) => (
                <button key={page.path} onClick={() => navigate(page.path)} className={`text-left transition hover:text-fuchsia-400 ${mutedText(theme)}`}>{t(`nav.${page.key}`)}</button>
              ))}
            </div>
          </div>

          <div>
            <p className={`mb-4 text-sm uppercase tracking-[0.25em] ${mutedText(theme)}`}>{t("footer.social")}</p>
            <div className="flex gap-3">
              {[
                { icon: "github", href: "https://github.com/claracayres" },
                { icon: "linkedin", href: "https://www.linkedin.com/in/maria-clara-cayres-de-almeida" },
                { icon: "mail", href: "mailto:clara.cayres1205@gmail.com" },
              ].map((item) => (
                <a key={item.icon} href={item.href} className={`grid h-11 w-11 place-items-center rounded-2xl border transition hover:scale-105 ${surface(theme)}`}>
                  <Icon name={item.icon} size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={`border-t px-8 py-5 text-sm md:px-10 ${theme === "dark" ? "border-white/10 bg-black/20 text-white/40" : "border-slate-200 bg-slate-950/5 text-slate-500"}`}>
          <div className="flex flex-col justify-between gap-3 md:flex-row">
            <span>© 2026 Clara Cayres. React • Tailwind • Framer Motion.</span>
            <span>{t("footer.available")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;