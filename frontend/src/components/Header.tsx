import Link from "next/link";
import { getUser, logout } from "@/actions/auth";
import SearchBar from "./SearchBar";

export default async function Header() {
  const user = await getUser();

  return (
    <header className="sticky top-0 z-50 border-b border-tea-200/60 bg-cream/80 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-3 transition-opacity duration-200 hover:opacity-80"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tea-600 font-heading text-lg font-bold text-cream">
            TF
          </div>
          <div className="hidden sm:block">
            <h1 className="font-heading text-xl font-bold tracking-tight text-tea-800">
              The Fada
            </h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-tea-500">
              L'infusion de la folie
            </p>
          </div>
        </Link>

        {/* Nav Links */}
        <div className="hidden items-center gap-1 lg:flex">
          {[
            { href: "/", label: "Accueil" },
            { href: "/collection", label: "Collection" },
            { href: "/about", label: "Notre Histoire" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-tea-700 transition-colors duration-200 hover:bg-tea-100 hover:text-tea-900"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Search + Auth */}
        <div className="flex items-center gap-3">
          <SearchBar />

          {user ? (
            <>
              <Link
                href="/account"
                className="flex items-center gap-2 rounded-full bg-tea-100 px-4 py-2 transition-colors duration-200 hover:bg-tea-200"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-tea-600 text-xs font-bold text-cream">
                  {user.username?.charAt(0).toUpperCase()}
                </div>
                <span className="hidden text-sm font-medium text-tea-800 sm:inline">
                  {user.username}
                </span>
              </Link>
              <form action={logout}>
                <button
                  type="submit"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-tea-500 transition-colors duration-200 hover:bg-red-50 hover:text-red-600"
                >
                  <span className="hidden sm:inline">Deconnexion</span>
                  <svg className="h-4 w-4 sm:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                  </svg>
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden rounded-lg px-4 py-2 text-sm font-medium text-tea-700 transition-colors duration-200 hover:bg-tea-100 sm:block"
              >
                Connexion
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-tea-700 px-4 py-2 text-sm font-medium text-cream transition-all duration-200 hover:bg-tea-800"
              >
                S'inscrire
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
