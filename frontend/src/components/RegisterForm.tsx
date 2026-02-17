"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, confirmPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erreur lors de l'inscription");
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
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sage-100">
            <svg
              className="h-7 w-7 text-sage-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
              />
            </svg>
          </div>
          <h1 className="font-heading text-3xl font-bold text-tea-900">
            Deviens un fada !
          </h1>
          <p className="mt-2 text-sm text-tea-500">
            Cree ton compte et rejoins la communaute The Fada
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-tea-200/60 bg-white p-8 shadow-sm">
          {error && (
            <div className="mb-6 animate-shake rounded-lg border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm font-medium text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="mb-1.5 block text-sm font-medium text-tea-700"
              >
                Nom d'utilisateur
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                minLength={3}
                className="w-full rounded-lg border border-tea-200 bg-cream/50 px-4 py-2.5 text-sm text-tea-900 outline-none transition-all duration-200 placeholder:text-tea-400 focus:border-tea-400 focus:ring-2 focus:ring-tea-200"
                placeholder="VotrePseudo"
              />
              <p className="mt-1 text-xs text-tea-400">Minimum 3 caracteres</p>
            </div>

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
                minLength={6}
                className="w-full rounded-lg border border-tea-200 bg-cream/50 px-4 py-2.5 text-sm text-tea-900 outline-none transition-all duration-200 placeholder:text-tea-400 focus:border-tea-400 focus:ring-2 focus:ring-tea-200"
                placeholder="Minimum 6 caracteres"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1.5 block text-sm font-medium text-tea-700"
              >
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                minLength={6}
                className="w-full rounded-lg border border-tea-200 bg-cream/50 px-4 py-2.5 text-sm text-tea-900 outline-none transition-all duration-200 placeholder:text-tea-400 focus:border-tea-400 focus:ring-2 focus:ring-tea-200"
                placeholder="Retapez votre mot de passe"
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
                  Inscription en cours...
                </span>
              ) : (
                "Creer mon compte"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-tea-500">
              Deja membre ?{" "}
              <Link
                href="/login"
                className="font-semibold text-tea-700 underline decoration-tea-300 underline-offset-2 transition-colors hover:text-tea-900"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
