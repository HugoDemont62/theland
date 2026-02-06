"use client";

import { useFormState, useFormStatus } from "react-dom";
import { register } from "@/actions/auth";
import Link from "next/link";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 px-4 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {pending ? (
          <>
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            Inscription en cours...
          </>
        ) : (
          <>
            Rejoindre Thé Fada
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </>
        )}
      </span>
      <div className="absolute inset-0 -z-0 bg-gradient-to-r from-teal-700 to-emerald-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
    </button>
  );
}

export default function RegisterForm() {
  const [state, formAction] = useFormState(register, { error: "" });

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 px-4 py-12">
      {/* Motifs décoratifs */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-20 top-40 h-64 w-64 animate-pulse rounded-full bg-teal-400 blur-3xl"></div>
        <div className="absolute right-20 bottom-40 h-96 w-96 animate-pulse rounded-full bg-emerald-400 blur-3xl [animation-delay:1s]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo au-dessus */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 text-4xl shadow-2xl transition-transform duration-300 hover:scale-110 hover:rotate-12">
            🍵
          </div>
          <h1 className="bg-gradient-to-r from-teal-700 via-emerald-600 to-teal-700 bg-clip-text text-4xl font-black text-transparent">
            Thé Fada
          </h1>
          <p className="text-sm italic text-emerald-600">Deviens un vrai fada du thé</p>
        </div>

        {/* Formulaire */}
        <div className="relative overflow-hidden rounded-2xl bg-white/90 p-8 shadow-2xl backdrop-blur-sm">
          {/* Accent décoratif */}
          <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br from-teal-200 to-emerald-200 opacity-30 blur-2xl"></div>

          <h2 className="relative mb-6 text-center text-2xl font-bold text-emerald-900">
            Rejoins la tribu ! 🚀
          </h2>

          {state?.error && (
            <div className="mb-6 animate-shake rounded-xl border-2 border-rose-200 bg-rose-50 p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚠️</span>
                <p className="font-medium text-rose-700">{state.error}</p>
              </div>
            </div>
          )}

          <form action={formAction} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-bold text-emerald-900"
              >
                Nom d'utilisateur
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                minLength={3}
                className="w-full rounded-xl border-2 border-emerald-200 bg-white/50 px-4 py-3 font-medium text-emerald-900 backdrop-blur-sm transition-all duration-300 placeholder:text-emerald-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/20"
                placeholder="TeaLover123"
              />
              <p className="mt-1 text-xs text-emerald-600">Minimum 3 caractères</p>
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-bold text-emerald-900"
              >
                Adresse email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full rounded-xl border-2 border-emerald-200 bg-white/50 px-4 py-3 font-medium text-emerald-900 backdrop-blur-sm transition-all duration-300 placeholder:text-emerald-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/20"
                placeholder="ton-email@exemple.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-bold text-emerald-900"
              >
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                minLength={6}
                className="w-full rounded-xl border-2 border-emerald-200 bg-white/50 px-4 py-3 font-medium text-emerald-900 backdrop-blur-sm transition-all duration-300 placeholder:text-emerald-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/20"
                placeholder="••••••••"
              />
              <p className="mt-1 text-xs text-emerald-600">Minimum 6 caractères</p>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-bold text-emerald-900"
              >
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                minLength={6}
                className="w-full rounded-xl border-2 border-emerald-200 bg-white/50 px-4 py-3 font-medium text-emerald-900 backdrop-blur-sm transition-all duration-300 placeholder:text-emerald-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/20"
                placeholder="••••••••"
              />
            </div>

            <SubmitButton />
          </form>

          <div className="relative mt-8 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-emerald-200"></div>
            </div>
            <div className="relative">
              <span className="bg-white px-4 text-sm text-emerald-600">
                Déjà membre ?
              </span>
            </div>
          </div>

          <Link
            href="/login"
            className="mt-6 block rounded-xl border-2 border-teal-600 bg-white/50 py-3 text-center font-bold text-teal-700 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:bg-teal-50"
          >
            Se connecter
          </Link>
        </div>

        {/* Petite note sympa */}
        <p className="mt-6 text-center text-xs text-emerald-600">
          🌿 En rejoignant Thé Fada, tu acceptes de devenir complètement accro au thé
        </p>
      </div>
    </div>
  );
}