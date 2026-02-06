import { getUser } from "@/actions/auth";
import Link from "next/link";

export default async function HomePage() {
  const user = await getUser();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="mb-6 text-5xl font-bold text-gray-900">
          Bienvenue sur MonApp
        </h1>

        <p className="mb-8 text-xl text-gray-600">
          Une application avec authentification Strapi et Next.js
        </p>

        {user ? (
          <div className="rounded-lg bg-green-50 p-6">
            <p className="text-lg text-green-800">
              Bonjour <strong>{user.username}</strong> ! Vous êtes connecté.
            </p>
            <Link
              href="/account"
              className="mt-4 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
            >
              Accéder à mon compte
            </Link>
          </div>
        ) : (
          <div className="space-x-4">
            <Link
              href="/login"
              className="inline-block rounded-lg border border-gray-300 px-6 py-3 text-gray-700 transition-colors hover:bg-gray-50"
            >
              Se connecter
            </Link>
            <Link
              href="/register"
              className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
            >
              S'inscrire
            </Link>
          </div>
        )}

        <div className="mt-16 rounded-lg bg-gray-50 p-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">
            Fonctionnalités
          </h2>
          <ul className="space-y-2 text-left text-gray-600">
            <li>✅ Authentification complète (login/register/logout)</li>
            <li>✅ Gestion des sessions avec cookies HTTP-only</li>
            <li>✅ Protection des routes</li>
            <li>✅ Interface moderne et responsive</li>
            <li>✅ Intégration Strapi backend</li>
          </ul>
        </div>
      </div>
    </div>
  );
}