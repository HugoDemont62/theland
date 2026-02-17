"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const identifier = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erreur de connexion");
        setLoading(false);
        return;
      }

      window.location.href = "/account";
    } catch {
      setError("Une erreur est survenue. Veuillez reessayer.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-cream px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-tea-100">
            <svg
              className="h-7 w-7 text-tea-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </div>
          <h1 className="font-heading text-3xl font-bold text-tea-900">
            Bon retour, fada !
          </h1>
          <p className="mt-2 text-sm text-tea-500">
            Connecte-toi a ton espace The Fada
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-tea-200/60 bg-white p-8 shadow-sm">
          {error && (
            <div className="mb-6 animate-shake rounded-lg border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm font-medium text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-tea-700"
              >
                Adresse email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full rounded-lg border border-tea-200 bg-cream/50 px-4 py-2.5 text-sm text-tea-900 outline-none transition-all duration-200 placeholder:text-tea-400 focus:border-tea-400 focus:ring-2 focus:ring-tea-200"
                placeholder="vous@exemple.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-tea-700"
              >
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full rounded-lg border border-tea-200 bg-cream/50 px-4 py-2.5 text-sm text-tea-900 outline-none transition-all duration-200 placeholder:text-tea-400 focus:border-tea-400 focus:ring-2 focus:ring-tea-200"
                placeholder="Votre mot de passe"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-tea-700 px-4 py-3 text-sm font-semibold text-cream transition-all duration-200 hover:bg-tea-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-cream border-t-transparent" />
                  Connexion en cours...
                </span>
              ) : (
                "Se connecter"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-tea-500">
              Pas encore de compte ?{" "}
              <Link
                href="/register"
                className="font-semibold text-tea-700 underline decoration-tea-300 underline-offset-2 transition-colors hover:text-tea-900"
              >
                Creer un compte
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
