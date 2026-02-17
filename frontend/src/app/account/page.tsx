import { getUser } from "@/actions/auth";
import { redirect } from "next/navigation";
import EditProfileForm from "@/components/EditProfileForm";

export default async function AccountPage() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-[calc(100vh-73px)] bg-cream py-12">
      <div className="mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-tea-600 font-heading text-2xl font-bold text-cream">
              {user.username?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="font-heading text-3xl font-bold text-tea-900">
                Mon Espace Fada
              </h1>
              <p className="text-sm text-tea-500">
                Bonjour, {user.username}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-tea-200/60 bg-white p-8 shadow-sm">
              <h2 className="mb-6 font-heading text-xl font-semibold text-tea-900">
                Informations du profil
              </h2>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-tea-400">
                    Nom d'utilisateur
                  </p>
                  <p className="text-lg font-semibold text-tea-800">
                    {user.username}
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-tea-400">
                    Email
                  </p>
                  <p className="text-lg font-semibold text-tea-800">
                    {user.email}
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-tea-400">
                    Membre depuis
                  </p>
                  <p className="text-lg font-semibold text-tea-800">
                    {new Date(user.createdAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-tea-400">
                    ID Membre
                  </p>
                  <p className="font-mono text-lg font-semibold text-tea-800">
                    #{user.id}
                  </p>
                </div>
              </div>
            </div>

            {/* Edit Profile */}
            <div className="mt-8">
              <EditProfileForm user={user} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="rounded-2xl border border-tea-200/60 bg-white p-6 shadow-sm">
              <h3 className="mb-4 font-heading text-lg font-semibold text-tea-900">
                Statistiques
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg bg-tea-50 p-3">
                  <span className="text-sm text-tea-600">Thes decouverts</span>
                  <span className="font-semibold text-tea-800">
                    {user.favorites?.length || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-sage-50 p-3">
                  <span className="text-sm text-tea-600">Niveau</span>
                  <span className="font-semibold text-sage-700">Debutant</span>
                </div>
              </div>
            </div>

            {/* Favorites */}
            <div className="rounded-2xl border border-tea-200/60 bg-white p-6 shadow-sm">
              <h3 className="mb-4 font-heading text-lg font-semibold text-tea-900">
                Mes Favoris
              </h3>
              {user.favorites && user.favorites.length > 0 ? (
                <div className="space-y-3">
                  {user.favorites.map((fav: any) => (
                    <div
                      key={fav.id}
                      className="flex items-center gap-3 rounded-lg border border-tea-100 p-3 transition-colors duration-200 hover:bg-tea-50"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-tea-100 text-sm">
                        <svg
                          className="h-4 w-4 text-tea-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                          />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-tea-800">
                        {fav.name || fav.title || `The #${fav.id}`}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg bg-tea-50 p-4 text-center">
                  <p className="text-sm text-tea-500">
                    Aucun favori pour le moment.
                  </p>
                  <a
                    href="/collection"
                    className="mt-2 inline-block text-sm font-semibold text-tea-600 underline decoration-tea-300 underline-offset-2"
                  >
                    Decouvrir nos thes
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
