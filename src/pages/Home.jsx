/* eslint-disable no-unused-vars */
import PageShell from '../layouts/PageShell';
import DeveloperPassport from '../components/DeveloperPassport';
import InfiniteProjectLoop from '../components/InfiniteProjectsLoop';
import TechCloud from '../components/TechCloud';
import AboutPreview from '../components/AboutPreview';
import AnimatedGradientText from '../components/ui/AnimatedGradientText';
import { surface, mutedText } from '../utils/theme';
import { motion } from 'framer-motion';
import Icon from '../components/Icons';
import { useTranslation } from 'react-i18next';
import ResumeButton from '../components/ResumeButton';
import { useNavigate } from 'react-router-dom';

function HomePage({ setActivePage, setSelectedProject, lang, theme }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <PageShell theme={theme} noNavSpace={true}>
      <div className="relative grid min-h-[78vh] items-center gap-10 overflow-hidden rounded-[3rem] border border-white/10 px-5 py-10 md:px-10 lg:grid-cols-[1fr_.85fr]">
        <div className="absolute inset-0 -z-10 bg-linear-to-br from-fuchsia-500/10 via-transparent to-cyan-400/10" />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative z-10"
        >
          <div
            className={`mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm backdrop-blur ${surface(
              theme,
            )}`}
          >
            {t('hero.badge')}
          </div>

          <h1 className="max-w-4xl text-5xl leading-[0.9] font-black tracking-[-0.07em] md:text-7xl lg:text-8xl">
            {t('hero.titleA')}{' '}
            <AnimatedGradientText>{t('hero.titleB')}</AnimatedGradientText>
          </h1>

          <p
            className={`mt-7 max-w-xl text-base leading-8 md:text-lg ${mutedText(
              theme,
            )}`}
          >
            {t('hero.text')}
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <button
              onClick={() => navigate('/projetos')}
              className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-fuchsia-500 via-purple-500 to-cyan-400 px-7 py-4 text-sm font-bold text-white shadow-[0_0_40px_rgba(217,70,239,.35)] transition hover:scale-105"
            >
              {t('hero.explore')}
              <Icon
                name="arrow"
                className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </button>

            <ResumeButton t={t} theme={theme} />
          </div>

          <div className="mt-10 flex flex-wrap gap-3 text-xs font-bold tracking-[0.22em] uppercase opacity-60">
            <span>React</span>
            <span>•</span>
            <span>JavaScript</span>
            <span>•</span>
            <span>APIs</span>
            <span>•</span>
            <span>Creative Web</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40, rotate: 4 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          className="relative z-10 flex justify-center lg:justify-end"
        >
          <DeveloperPassport theme={theme} />
        </motion.div>

        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
      </div>

      <InfiniteProjectLoop
        setActivePage={setActivePage}
        setSelectedProject={setSelectedProject}
        t={t}
        lang={lang}
        theme={theme}
      />
      <TechCloud theme={theme} t={t} />
      <AboutPreview setActivePage={setActivePage} t={t} theme={theme} />
    </PageShell>
  );
}

export default HomePage;
