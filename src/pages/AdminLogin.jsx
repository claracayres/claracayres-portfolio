import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (login(password)) {
      navigate("/admin");
    } else {
      setError(t("admin.incorrectPassword"));
      setPassword("");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <div className="w-full max-w-md space-y-8">
        <div>
          <div className="flex justify-center">
            <div className="from-pink to-purple rounded-full bg-gradient-to-tr p-4">
              <FontAwesomeIcon icon={faLock} className="text-4xl text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            {t("admin.loginTitle")}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            {t("admin.loginSubtitle")}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="password" className="sr-only">
              {t("admin.passwordPlaceholder")}
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="focus:ring-purple relative block w-full appearance-none rounded-lg border border-gray-700 bg-gray-800 px-3 py-3 text-white placeholder-gray-500 focus:z-10 focus:border-transparent focus:ring-2 focus:outline-none sm:text-sm"
                placeholder={t("admin.passwordPlaceholder")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-300"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>

          {error && (
            <div className="rounded-md border border-red-500 bg-red-900/50 p-4">
              <p className="text-center text-sm text-red-200">{error}</p>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group from-pink to-purple focus:ring-purple relative flex w-full transform justify-center rounded-lg border border-transparent bg-gradient-to-r px-4 py-3 text-sm font-medium text-white transition-all duration-200 hover:scale-105 hover:bg-purple-700 focus:ring-2 focus:ring-offset-2 focus:outline-none"
            >
              {t("admin.loginButton")}
            </button>
          </div>
        </form>

        <div className="text-center">
          <a
            href="/"
            className="text-purple text-sm transition-colors hover:text-purple-300"
          >
            {t("admin.backToSite")}
          </a>
        </div>
      </div>
    </div>
  );
}
