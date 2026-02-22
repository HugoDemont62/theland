import Link from "next/link";
import { fetchCollectionType } from "@/lib/strapi";

interface Shop {
  id: number;
  name: string;
  address?: string;
  description?: string;
}

export default async function Footer() {
  let shops: Shop[] = [];
  try {
    shops = await fetchCollectionType<Shop[]>("recommended-shops");
  } catch {
    // Strapi indisponible ou aucun magasin
  }

  return (
    <footer className="border-t border-tea-200 bg-tea-900 text-tea-100">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className={`grid gap-12 ${shops.length > 0 ? "md:grid-cols-5" : "md:grid-cols-4"}`}>
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block">
              <h3 className="font-heading text-2xl font-bold text-cream">
                The Fada
              </h3>
              <p className="mt-1 text-sm text-tea-400">
                L'infusion de la folie
              </p>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-tea-300">
              Des thes d'exception pour des moments de folie douce au quotidien.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-tea-400">
              Explorer
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Accueil" },
                { href: "/collection", label: "Notre Collection" },
                { href: "/about", label: "Notre Histoire" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-tea-300 transition-colors duration-200 hover:text-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-tea-400">
              Mon Compte
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/login", label: "Connexion" },
                { href: "/register", label: "Inscription" },
                { href: "/account", label: "Mon Espace" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-tea-300 transition-colors duration-200 hover:text-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Magasins recommandés */}
          {shops.length > 0 && (
            <div>
              <h4 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-tea-400">
                Nos Boutiques
              </h4>
              <ul className="space-y-4">
                {shops.map((shop) => (
                  <li key={shop.id}>
                    <p className="text-sm font-semibold text-tea-200">{shop.name}</p>
                    {shop.address && (
                      <p className="mt-0.5 text-xs text-tea-400">{shop.address}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-tea-400">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-tea-300">
              <li>contact@thefada.fr</li>
              <li>04 91 00 00 00</li>
              <li>42 Rue du The, Marseille</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-tea-800 pt-8 sm:flex-row">
          <p className="text-xs text-tea-500">
            &copy; {new Date().getFullYear()} The Fada. Tous droits reserves.
          </p>
          <p className="text-xs text-tea-500">
            Fait avec amour et une bonne dose de folie.
          </p>
        </div>
      </div>
    </footer>
  );
}
