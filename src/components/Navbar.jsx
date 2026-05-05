import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { pages } from "../config/navigation";
import { surface, mutedText } from '../utils/theme';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import Icon from './Icons';

function Navbar({ theme, setTheme }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  function goTo(path) {
    navigate(path);
    setOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const { t, i18n } = useTranslation();

  function navText(page) {
    return t(`nav.${page.key}`);
  }
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [hoverTop, setHoverTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    const handleMouseMove = (e) => {
      if (e.clientY < 80) {
        setHoverTop(true);
      } else {
        setHoverTop(false);
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        isHome && !scrolled && !hoverTop
          ? 'pointer-events-none -translate-y-full opacity-0'
          : `translate-y-0 border-b opacity-100 backdrop-blur-2xl ${
              theme === 'dark'
                ? 'border-white/10 bg-[#060617]/65'
                : 'border-slate-200 bg-white/70'
            }`
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <button
          onClick={() => goTo('/')}
          className="group flex items-center font-black tracking-tight"
        >
          <span
            className={`mr-2 grid h-9 w-9 place-items-center rounded-2xl transition group-hover:rotate-12 ${theme === 'dark' ? 'bg-white text-black' : 'bg-slate-950 text-white'}`}
          >
            C
          </span>
          Clara<span className="text-fuchsia-500">.dev</span>
        </button>

        <div
          className={`hidden items-center gap-2 rounded-full border p-1 md:flex ${surface(theme)}`}
        >
          {pages.map((page) => (
            <button
              key={page.path}
              onClick={() => goTo(page.path)}
              className={`relative rounded-full px-4 py-2 text-sm transition ${
                location.pathname === page.path
                  ? theme === 'dark'
                    ? 'text-black'
                    : 'text-white'
                  : `${mutedText(theme)} hover:opacity-100`
              }`}
            >
              {location.pathname === page.path ? (
                <motion.span
                  layoutId="active-pill"
                  className={`absolute inset-0 rounded-full ${theme === 'dark' ? 'bg-white' : 'bg-slate-950'}`}
                />
              ) : null}
              <span className="relative z-10">{navText(page)}</span>
            </button>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <button
            onClick={() =>
              i18n.changeLanguage(i18n.language === 'en' ? 'pt' : 'en')
            }
            className={`rounded-full border px-4 py-2 text-sm font-bold ${surface(theme)}`}
          >
            {i18n.language === 'en' ? 'PT' : 'EN'}
          </button>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`grid h-10 w-10 place-items-center rounded-full border ${surface(theme)}`}
            aria-label="Toggle theme"
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={17} />
          </button>
          <button
            onClick={() => goTo('/contato')}
            className="rounded-full bg-linear-to-r from-fuchsia-500 to-cyan-400 px-5 py-2 text-sm font-bold text-white transition hover:scale-105"
          >
            {t('nav.talk')}
          </button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="md:hidden"
          aria-label="Open menu"
        >
          {open ? <Icon name="x" /> : <Icon name="menu" />}
        </button>
      </nav>

      {open ? (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mx-5 mb-4 rounded-3xl border p-5 md:hidden ${surface(theme, true)}`}
        >
          {pages.map((page) => (
            <button
              key={page.path}
              onClick={() => goTo(page.path)}
              className={`block w-full rounded-2xl px-4 py-3 text-left ${
                location.pathname === page.path
                  ? 'bg-linear-to-r from-fuchsia-500 to-cyan-400 text-white'
                  : `${mutedText(theme)} hover:bg-black/5 dark:hover:bg-white/10`
              }`}
            >
              {navText(page)}
            </button>
          ))}
          <div className="mt-4 flex gap-2">
            <button
              onClick={() =>
                i18n.changeLanguage(i18n.language === 'en' ? 'pt' : 'en')
              }
              className="flex-1 rounded-2xl border px-4 py-3 font-bold"
            >
              {i18n.language === 'en' ? 'Português' : 'English'}
            </button>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-2xl border px-4 py-3"
            >
              <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
            </button>
          </div>
        </motion.div>
      ) : null}
    </header>
  );
}

export default Navbar;
