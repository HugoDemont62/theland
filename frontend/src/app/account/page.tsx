import { getUser } from "@/actions/auth";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-12">
      {/* Motifs décoratifs */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-10 top-20 h-64 w-64 rounded-full bg-teal-400 blur-3xl"></div>
        <div className="absolute right-10 bottom-20 h-96 w-96 rounded-full bg-emerald-400 blur-3xl"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          {/* En-tête avec avatar */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 text-5xl shadow-2xl">
              🍵
            </div>
            <h1 className="mb-2 text-4xl font-black text-emerald-900">
              Mon Espace Thé
            </h1>
            <p className="text-lg text-emerald-600">
              Bienvenue dans ton univers, <span className="font-bold">{user.username}</span> ! 👋
            </p>
          </div>

          {/* Grille des infos */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Carte Profil */}
            <div className="group relative overflow-hidden rounded-2xl bg-white/90 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
              {/* Accent décoratif */}
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-teal-200 to-emerald-200 opacity-30 blur-2xl transition-opacity duration-300 group-hover:opacity-50"></div>

              <div className="relative z-10">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 text-2xl shadow-lg">
                    👤
                  </div>
                  <h2 className="text-2xl font-bold text-emerald-900">
                    Mes Informations
                  </h2>
                </div>

                <div className="space-y-6">
                  <div className="group/item">
                    <label className="mb-2 block text-sm font-bold uppercase tracking-wide text-emerald-600">
                      Nom d'utilisateur
                    </label>
                    <div className="rounded-xl bg-gradient-to-r from-teal-50 to-emerald-50 p-4 transition-all duration-300 group-hover/item:shadow-md">
                      <p className="text-xl font-bold text-emerald-900">{user.username}</p>
                    </div>
                  </div>

                  <div className="group/item">
                    <label className="mb-2 block text-sm font-bold uppercase tracking-wide text-emerald-600">
                      Email
                    </label>
                    <div className="rounded-xl bg-gradient-to-r from-teal-50 to-emerald-50 p-4 transition-all duration-300 group-hover/item:shadow-md">
                      <p className="text-xl font-bold text-emerald-900">{user.email}</p>
                    </div>
                  </div>

                  <div className="group/item">
                    <label className="mb-2 block text-sm font-bold uppercase tracking-wide text-emerald-600">
                      ID Membre
                    </label>
                    <div className="rounded-xl bg-gradient-to-r from-teal-50 to-emerald-50 p-4 transition-all duration-300 group-hover/item:shadow-md">
                      <p className="font-mono text-sm text-emerald-700">#{user.id}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Carte Statistiques */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-600 to-emerald-600 p-8 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
              <div className="relative z-10">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-2xl shadow-lg backdrop-blur-sm">
                    📊
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    Tes Stats
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                    <p className="text-sm font-bold uppercase tracking-wide text-teal-100">
                      Membre depuis
                    </p>
                    <p className="mt-1 text-2xl font-black text-white">
                      Aujourd'hui 🎉
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                    <p className="text-sm font-bold uppercase tracking-wide text-teal-100">
                      Thés découverts
                    </p>
                    <p className="mt-1 text-2xl font-black text-white">
                      {user.favorites?.length || 0} thés
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                    <p className="text-sm font-bold uppercase tracking-wide text-teal-100">
                      Niveau
                    </p>
                    <p className="mt-1 text-2xl font-black text-white">
                      Débutant 🌱
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section Favoris */}
          {user.favorites && user.favorites.length > 0 ? (
            <div className="mt-8">
              <div className="relative overflow-hidden rounded-2xl bg-white/90 p-8 shadow-xl backdrop-blur-sm">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-2xl shadow-lg">
                    ⭐
                  </div>
                  <h2 className="text-2xl font-bold text-emerald-900">
                    Mes Thés Favoris ({user.favorites.length})
                  </h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {user.favorites.map((fav: any, i: number) => (
                    <div
                      key={fav.id}
                      className="group relative overflow-hidden rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-white to-emerald-50 p-4 transition-all duration-300 hover:scale-105 hover:border-teal-400 hover:shadow-lg animate-fade-in"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">🍵</span>
                        <div>
                          <h3 className="font-bold text-emerald-900">
                            {fav.name || fav.title || `Thé #${fav.id}`}
                          </h3>
                          {fav.description && (
                            <p className="text-sm text-emerald-600">{fav.description}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-8 text-center">
              <div className="relative overflow-hidden rounded-2xl bg-white/90 p-12 shadow-xl backdrop-blur-sm">
                <div className="text-6xl mb-4">🫖</div>
                <h3 className="mb-2 text-2xl font-bold text-emerald-900">
                  Aucun favori pour le moment
                </h3>
                <p className="text-emerald-600">
                  Explore notre collection et ajoute tes thés préférés !
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}