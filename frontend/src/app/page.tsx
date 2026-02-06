import { getUser } from "@/actions/auth";
import Link from "next/link";

export default async function HomePage() {
  const user = await getUser();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Motifs décoratifs */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-10 top-20 h-64 w-64 rounded-full bg-teal-400 blur-3xl"></div>
        <div className="absolute right-10 bottom-20 h-96 w-96 rounded-full bg-emerald-400 blur-3xl"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 py-20">
        {/* Hero Section */}
        <div className="mx-auto max-w-5xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/80 px-6 py-2 shadow-lg backdrop-blur-sm">
            <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500"></div>
            <span className="text-sm font-medium text-emerald-700">
              Nouvelle infusion disponible 🌿
            </span>
          </div>

          {/* Titre principal avec animation */}
          <h1 className="mb-6 animate-fade-in text-7xl font-black leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-teal-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
              Thé Fada
            </span>
            <br />
            <span className="text-5xl text-emerald-900">
              L'infusion qui rend dingue ! 🍵
            </span>
          </h1>

          <p className="mb-12 text-xl leading-relaxed text-emerald-700">
            Bienvenue dans l'univers délirant du thé premium. <br />
            Des saveurs folles, des mélanges improbables, et une communauté de passionnés.
          </p>

          {/* CTA Buttons */}
          {user ? (
            <div className="space-y-4">
              <div className="rounded-2xl bg-white/80 p-8 shadow-xl backdrop-blur-sm">
                <div className="mb-4 flex items-center justify-center gap-3">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 text-3xl shadow-lg">
                    👋
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-emerald-600">Content de te revoir,</p>
                    <p className="text-2xl font-bold text-emerald-900">{user.username}</p>
                  </div>
                </div>

                <Link
                  href="/account"
                  className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <span>Accéder à mon espace</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/register"
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <span>Rejoindre l'aventure</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-teal-600 bg-white/50 px-8 py-4 text-lg font-bold text-teal-700 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:scale-105"
              >
                <span>Se connecter</span>
              </Link>
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="mx-auto mt-24 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              emoji: "🌿",
              title: "Thés d'exception",
              desc: "Des mélanges uniques qui cassent les codes",
              color: "from-emerald-500 to-teal-500"
            },
            {
              emoji: "🔥",
              title: "Communauté active",
              desc: "Échange avec des passionnés aussi fadas que toi",
              color: "from-teal-500 to-cyan-500"
            },
            {
              emoji: "🎁",
              title: "Découvertes folles",
              desc: "Chaque mois, de nouvelles saveurs déjantées",
              color: "from-cyan-500 to-emerald-500"
            }
          ].map((feature, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl bg-white/80 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className={`absolute inset-0 -z-0 bg-gradient-to-br ${feature.color} opacity-0 transition-opacity duration-300 group-hover:opacity-10`}></div>

              <div className="relative z-10">
                <div className="mb-4 text-5xl">{feature.emoji}</div>
                <h3 className="mb-2 text-xl font-bold text-emerald-900">
                  {feature.title}
                </h3>
                <p className="text-emerald-700">{feature.desc}</p>
              </div>

              {/* Petit accent décoratif */}
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-teal-200 to-emerald-200 opacity-20 blur-2xl"></div>
            </div>
          ))}
        </div>

        {/* Section Citation */}
        <div className="mx-auto mt-24 max-w-3xl">
          <div className="relative rounded-3xl bg-gradient-to-r from-teal-600 to-emerald-600 p-12 text-center shadow-2xl">
            <div className="absolute -left-4 -top-4 text-6xl text-white/20">"</div>
            <p className="text-2xl font-bold italic text-white">
              Le thé, c'est pas juste de l'eau chaude avec des feuilles dedans.
              <br />
              C'est un art de vivre, une philosophie, une folie douce.
            </p>
            <div className="absolute -bottom-4 -right-4 text-6xl text-white/20">"</div>
            <div className="mt-6">
              <p className="text-sm font-semibold text-emerald-100">
                — Un sage qui avait bu trop de thé
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Style pour l'animation */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}