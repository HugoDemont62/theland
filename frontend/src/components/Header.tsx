import Link from "next/link";
import { getUser, logout } from "@/actions/auth";

export default async function Header() {
  const user = await getUser();

  return (
    <header className="border-b border-gray-200 bg-white shadow-sm">
      <nav className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo / Titre */}
        <Link href="/frontend/public" className="text-2xl font-bold text-gray-900">
          MonApp
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          <Link
            href="/frontend/public"
            className="text-gray-600 transition-colors hover:text-gray-900"
          >
            Accueil
          </Link>

          {user ? (
            <>
              <Link
                href="/account"
                className="text-gray-600 transition-colors hover:text-gray-900"
              >
                Mon Compte
              </Link>
              <span className="text-sm text-gray-500">
                Bonjour, {user.username}
              </span>
              <form action={logout}>
                <button
                  type="submit"
                  className="rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
                >
                  Déconnexion
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
              >
                Connexion
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
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
