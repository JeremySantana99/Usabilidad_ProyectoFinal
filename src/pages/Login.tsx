import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AccessibleForm from "../components/AccessibleForm";
import { useAuth } from "../stores/auth";
import { useA11y } from "../a11y/accessibilityStore";

export default function Login() {
  const auth = useAuth();
  const a11y = useA11y();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const ok = await auth.login(email.trim(), password);
    if (ok) navigate("/app");
    else setError("Credenciales incorrectas");
  }

  return (
    <AccessibleForm className="max-w-md mx-auto p-6 border rounded-lg bg-white">
      <h2 className="text-2xl font-semibold mb-4">Iniciar sesión</h2>
      <form onSubmit={submit} aria-describedby="login-desc">
        <p id="login-desc" className="sr-only">Formulario de inicio de sesión. Utiliza tu correo y contraseña.</p>

        <label className="block mb-2">
          <span className="text-sm font-medium">Correo</span>
          <input
            className="mt-1 block w-full rounded border px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            aria-required
          />
        </label>

        <label className="block mb-2">
          <span className="text-sm font-medium">Contraseña</span>
          <input
            className="mt-1 block w-full rounded border px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            aria-required
          />
        </label>

        {error && <div role="alert" className="text-red-600 mb-2">{error}</div>}

        <div className="flex gap-2">
          <button
            type="submit"
            className={`px-4 py-2 rounded bg-blue-600 text-white ${a11y.largeTargets ? 'min-w-[120px] h-14' : ''}`}
          >Iniciar</button>
          <button type="button" onClick={() => navigate("/register")} className="px-4 py-2 rounded border">Registrarme</button>
        </div>
      </form>
    </AccessibleForm>
  );
}
