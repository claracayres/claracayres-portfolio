import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEye,
  faEyeSlash,
  faLock,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";

export default function AdminLogin({ theme }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useTranslation();

  const isDark = theme === "dark";

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (login(password.trim())) {
      navigate("/admin");
      return;
    }

    setError(t("admin.incorrectPassword"));
    setPassword("");
  };

  return (
    <main
      className={`relative flex min-h-screen items-center mt-20 justify-center overflow-hidden px-4 py-10 transition-colors duration-500 ${
        isDark
          ? "bg-slate-950 text-white"
          : "bg-[#f7f4ef] text-slate-950"
      }`}
    >
      <div
        className={`absolute inset-0 ${
          isDark
            ? "bg-[radial-gradient(circle_at_top_left,rgba(236,72,153,0.28),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.24),transparent_34%)]"
            : "bg-[radial-gradient(circle_at_top_left,rgba(236,72,153,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.18),transparent_34%)]"
        }`}
      />

      <div
        className={`absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl ${
          isDark ? "bg-fuchsia-500/10" : "bg-pink-300/25"
        }`}
      />

      <Link
        to="/"
        className={`absolute left-5 top-5 z-10 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold backdrop-blur-xl transition hover:-translate-x-1 ${
          isDark
            ? "border-white/10 bg-white/5 text-white/75 hover:bg-white/10 hover:text-white"
            : "border-slate-200 bg-white/70 text-slate-600 shadow-lg shadow-slate-200/60 hover:bg-white hover:text-slate-950"
        }`}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        {t("admin.backToSite")}
      </Link>

      <section className="relative z-10 w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-[1.7rem] bg-gradient-to-br from-fuchsia-500 via-pink-500 to-cyan-400 shadow-2xl shadow-fuchsia-500/20">
            <FontAwesomeIcon icon={faShieldHalved} className="text-3xl text-white" />
          </div>

          <p
            className={`mb-3 text-xs font-black uppercase tracking-[0.35em] ${
              isDark ? "text-cyan-200/80" : "text-fuchsia-600"
            }`}
          >
            Admin Area
          </p>

          <h1 className="text-4xl font-black tracking-tight md:text-5xl">
            {t("admin.loginTitle")}
          </h1>

          <p
            className={`mx-auto mt-4 max-w-sm text-sm leading-6 ${
              isDark ? "text-white/55" : "text-slate-600"
            }`}
          >
            {t("admin.loginSubtitle")}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`rounded-[2rem] border p-6 shadow-2xl backdrop-blur-2xl md:p-8 ${
            isDark
              ? "border-white/10 bg-white/[0.06] shadow-black/30"
              : "border-slate-200 bg-white/85 shadow-slate-200/70"
          }`}
        >
          <label
            htmlFor="password"
            className={`mb-3 block text-sm font-bold ${
              isDark ? "text-white/75" : "text-slate-700"
            }`}
          >
            {t("admin.passwordPlaceholder")}
          </label>

          <div className="relative">
            <FontAwesomeIcon
              icon={faLock}
              className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 ${
                isDark ? "text-white/35" : "text-slate-400"
              }`}
            />

            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError("");
              }}
              placeholder={t("admin.passwordPlaceholder")}
              className={`block w-full rounded-2xl border px-12 py-4 text-sm font-semibold outline-none transition focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-300/10 ${
                isDark
                  ? "border-white/10 bg-slate-950/60 text-white placeholder:text-white/30"
                  : "border-slate-200 bg-white text-slate-950 placeholder:text-slate-400"
              }`}
            />

            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className={`absolute right-4 top-1/2 -translate-y-1/2 transition ${
                isDark
                  ? "text-white/45 hover:text-white"
                  : "text-slate-400 hover:text-slate-950"
              }`}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>

          {error && (
            <div className="mt-4 rounded-2xl border border-red-400/20 bg-red-500/10 p-4">
              <p className="text-center text-sm font-bold text-red-500">
                {error}
              </p>
            </div>
          )}

          <button
            type="submit"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-pink-500 to-cyan-400 px-5 py-4 text-sm font-black uppercase tracking-[0.18em] text-white shadow-xl shadow-fuchsia-500/15 transition hover:scale-[1.02] hover:shadow-cyan-500/20 focus:outline-none focus:ring-4 focus:ring-cyan-300/20"
          >
            {t("admin.loginButton")}
          </button>
        </form>

        <p
          className={`mt-6 text-center text-xs leading-5 ${
            isDark ? "text-white/35" : "text-slate-500"
          }`}
        >
          Private dashboard for managing portfolio projects, skills and content.
        </p>
      </section>
    </main>
  );
}