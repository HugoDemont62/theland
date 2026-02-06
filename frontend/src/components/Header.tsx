import Link from "next/link";
import { getUser, logout } from "@/actions/auth";

export default async function Header() {
  const user = await getUser();

  return (
    <header className="relative border-b border-amber-200/50 bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 shadow-md">
      <nav className="container relative z-10 mx-auto flex items-center justify-between px-6 py-5">
        {/* Logo avec icône de théière */}
        <Link href="/" className="group flex items-center gap-3 transition-all duration-300 hover:scale-105">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 text-2xl shadow-lg transition-transform group-hover:rotate-12">
            🍵
          </div>
          <div>
            <h1 className="bg-gradient-to-r from-teal-700 via-emerald-600 to-teal-700 bg-clip-text text-3xl font-black tracking-tight text-transparent">
              Thé Fada
            </h1>
            <p className="text-xs italic text-emerald-600">L'infusion de la folie</p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="group relative overflow-hidden rounded-lg px-4 py-2 font-medium text-teal-700 transition-all duration-300 hover:text-teal-900"
          >
            <span className="relative z-10">Accueil</span>
            <div className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-teal-100 to-emerald-100 transition-transform duration-300 group-hover:translate-y-0"></div>
          </Link>

          {user ? (
            <>
              <Link
                href="/account"
                className="group relative overflow-hidden rounded-lg px-4 py-2 font-medium text-teal-700 transition-all duration-300 hover:text-teal-900"
              >
                <span className="relative z-10">Mon Compte</span>
                <div className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-teal-100 to-emerald-100 transition-transform duration-300 group-hover:translate-y-0"></div>
              </Link>

              <div className="flex items-center gap-2 rounded-full bg-white/60 px-4 py-2 shadow-sm backdrop-blur-sm">
                <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500"></div>
                <span className="text-sm font-medium text-emerald-800">
                  {user.username}
                </span>
              </div>

              <form action={logout}>
                <button
                  type="submit"
                  className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-2.5 font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <span className="relative z-10">Déconnexion</span>
                  <div className="absolute inset-0 -z-0 bg-gradient-to-r from-rose-600 to-pink-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg border-2 border-teal-600 px-6 py-2.5 font-semibold text-teal-700 transition-all duration-300 hover:scale-105 hover:bg-teal-50"
              >
                Connexion
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-gradient-to-r from-teal-600 to-emerald-600 px-6 py-2.5 font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Inscription
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}