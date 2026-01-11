import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (login(password)) {
      navigate("/admin");
    } else {
      setError("Senha incorreta. Tente novamente.");
      setPassword("");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <div className="w-full max-w-md space-y-8">
        <div>
          <div className="flex justify-center">
            <div className="rounded-full bg-gradient-to-tr from-pink to-purple p-4">
              <FontAwesomeIcon icon={faLock} className="text-4xl text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Digite a senha para acessar o painel administrativo
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="password" className="sr-only">
              Senha
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="relative block w-full appearance-none rounded-lg border border-gray-700 bg-gray-800 px-3 py-3 text-white placeholder-gray-500 focus:z-10 focus:border-transparent focus:ring-2 focus:ring-purple focus:outline-none sm:text-sm"
                placeholder="Digite a senha"
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
              className="group relative flex w-full transform justify-center rounded-lg border border-transparent bg-gradient-to-r from-pink to-purple px-4 py-3 text-sm font-medium text-white transition-all duration-200 hover:scale-105 hover:bg-purple-700 focus:ring-2 focus:ring-purple focus:ring-offset-2 focus:outline-none"
            >
              Entrar
            </button>
          </div>
        </form>

        <div className="text-center">
          <a
            href="/"
            className="text-sm text-purple transition-colors hover:text-purple-300"
          >
            ← Voltar para o site
          </a>
        </div>
      </div>
    </div>
  );
}
