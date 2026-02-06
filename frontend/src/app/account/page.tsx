import { getUser } from "@/actions/auth";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const user = await getUser();

  // Si pas connecté, rediriger vers /login
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Mon Compte</h1>

        <div className="rounded-lg bg-white p-6 shadow-lg">
          <div className="mb-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Informations personnelles
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nom d'utilisateur
                </label>
                <p className="mt-1 text-lg text-gray-900">{user.username}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <p className="mt-1 text-lg text-gray-900">{user.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  ID utilisateur
                </label>
                <p className="mt-1 text-sm text-gray-600">{user.id}</p>
              </div>
            </div>
          </div>

          {/* Section Favoris si disponible */}
          {user.favorites && user.favorites.length > 0 && (
            <div className="mt-6 border-t border-gray-200 pt-6">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                Mes Favoris
              </h2>
              <div className="space-y-2">
                {user.favorites.map((fav: any) => (
                  <div
                    key={fav.id}
                    className="rounded-lg bg-gray-50 p-3 text-gray-900"
                  >
                    {fav.name || fav.title || `Favori #${fav.id}`}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}