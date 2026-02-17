import { getUser } from "@/actions/auth";
import Link from "next/link";
import { fetchCollectionType } from "@/lib/strapi";

interface Tea {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  shortDescription: string;
  brewingTime: number;
  temperature: number;
  dosage: string;
  image?: { url: string };
  tea_category?: { name: string; slug: string };
}

const VALUES = [
  {
    title: "Selection",
    description:
      "Chaque the est choisi pour sa qualite exceptionnelle aupres de producteurs de confiance.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    title: "Fraicheur",
    description:
      "Nos thes sont importes en petits lots pour garantir une fraicheur optimale.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
  },
  {
    title: "Savoir-faire",
    description:
      "Des conseils de preparation pour sublimer chaque infusion.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
      </svg>
    ),
  },
];

const CATEGORY_COLORS: Record<string, { color: string; accent: string }> = {
  "the-vert": { color: "bg-matcha-100", accent: "text-matcha-700" },
  "the-noir": { color: "bg-tea-100", accent: "text-tea-700" },
  oolong: { color: "bg-sage-100", accent: "text-sage-700" },
  matcha: { color: "bg-matcha-200", accent: "text-matcha-800" },
  "the-fermente": { color: "bg-tea-200", accent: "text-tea-800" },
  "the-blanc": { color: "bg-cream-dark", accent: "text-tea-600" },
};

function getTeaColors(categorySlug?: string) {
  if (categorySlug && CATEGORY_COLORS[categorySlug]) {
    return CATEGORY_COLORS[categorySlug];
  }
  return { color: "bg-tea-100", accent: "text-tea-700" };
}

export default async function HomePage() {
  const user = await getUser();

  let teas: Tea[] = [];
  try {
    teas = await fetchCollectionType<Tea[]>("teas", {
      populate: ["tea_category", "image"],
      pagination: { limit: 4 },
      sort: ["createdAt:desc"],
    });
  } catch {
    // Strapi might not be running
  }

  return (
    <div className="bg-cream">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-tea-50 to-cream" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 md:pb-32 md:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="animate-fade-up mb-4 text-sm font-medium uppercase tracking-[0.2em] text-tea-500">
              Bienvenue chez The Fada
            </p>
            <h1 className="animate-fade-up font-heading text-5xl font-bold leading-tight text-tea-900 [animation-delay:100ms] md:text-7xl">
              L'infusion{" "}
              <span className="italic text-tea-600">de la folie</span>
            </h1>
            <p className="animate-fade-up mt-6 text-lg leading-relaxed text-tea-600 [animation-delay:200ms] md:text-xl">
              Des thes d'exception, des melanges improbables et une communaute
              de passionnes completement fadas. Bienvenue dans la famille !
            </p>

            <div className="animate-fade-up mt-10 flex flex-col items-center justify-center gap-4 [animation-delay:300ms] sm:flex-row">
              <Link
                href="/collection"
                className="inline-flex items-center gap-2 rounded-lg bg-tea-700 px-8 py-3.5 text-sm font-semibold text-cream transition-all duration-200 hover:bg-tea-800 hover:shadow-lg"
              >
                Decouvrir nos thes
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-lg border border-tea-300 bg-white/50 px-8 py-3.5 text-sm font-semibold text-tea-700 transition-all duration-200 hover:bg-white hover:shadow-md"
              >
                Notre Histoire
              </Link>
            </div>

            {user && (
              <div className="animate-fade-up mt-8 [animation-delay:400ms]">
                <div className="inline-flex items-center gap-2 rounded-full bg-sage-100 px-5 py-2.5 text-sm text-sage-700">
                  <div className="h-2 w-2 rounded-full bg-sage-500" />
                  Content de te revoir, {user.username} !
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 48" fill="none" className="w-full">
            <path d="M0 48h1440V24C1200 0 960 48 720 24S240 48 0 24v24z" fill="var(--color-cream)" />
          </svg>
        </div>
      </section>

      {/* Featured Teas from Strapi */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-16 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-tea-500">
            Selection
          </p>
          <h2 className="font-heading text-4xl font-bold text-tea-900">
            Nos thes du moment
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-tea-600">
            Une selection de fada pour les fadas. Des thes qui vont vous rendre
            completement accros.
          </p>
        </div>

        {teas.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teas.map((tea) => {
              const colors = getTeaColors(tea.tea_category?.slug);
              return (
                <div
                  key={tea.id}
                  className="group cursor-pointer rounded-2xl border border-tea-200/60 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-tea-300 hover:shadow-xl hover:shadow-tea-200/40"
                >
                  <div className={`mb-5 flex h-40 items-end rounded-xl ${colors.color} p-4 transition-transform duration-300 group-hover:scale-[1.02]`}>
                    <span className={`text-xs font-semibold uppercase tracking-wider ${colors.accent}`}>
                      {tea.tea_category?.name || "The"}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-tea-900">
                    {tea.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-tea-600">
                    {tea.shortDescription}
                  </p>
                  <div className="mt-3 flex gap-4">
                    <div className="flex items-center gap-1.5">
                      <svg className="h-3.5 w-3.5 text-tea-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                      </svg>
                      <span className="text-xs text-tea-500">{tea.temperature}&#176;C</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg className="h-3.5 w-3.5 text-tea-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-xs text-tea-500">{tea.brewingTime} min</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-tea-200/60 bg-white p-12 text-center">
            <p className="text-tea-500">
              Nos thes arrivent bientot... Patience, ca va etre de la folie !
            </p>
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/collection"
            className="inline-flex items-center gap-2 text-sm font-semibold text-tea-600 transition-colors duration-200 hover:text-tea-800"
          >
            Voir toute la collection
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Values Section */}
      <section className="border-y border-tea-200/60 bg-parchment">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-16 text-center">
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-tea-500">
              Nos Valeurs
            </p>
            <h2 className="font-heading text-4xl font-bold text-tea-900">
              Pourquoi on est fadas
            </h2>
          </div>

          <div className="grid gap-12 md:grid-cols-3">
            {VALUES.map((value) => (
              <div key={value.title} className="text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-tea-100 text-tea-600">
                  {value.icon}
                </div>
                <h3 className="font-heading text-xl font-semibold text-tea-900">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-tea-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="relative overflow-hidden rounded-3xl bg-tea-800 px-8 py-16 text-center md:px-16">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -left-10 -top-10 h-64 w-64 rounded-full bg-tea-400 blur-3xl" />
            <div className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-tea-500 blur-3xl" />
          </div>
          <div className="relative">
            <svg className="mx-auto mb-6 h-8 w-8 text-tea-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
            </svg>
            <p className="mx-auto max-w-2xl font-heading text-2xl font-medium leading-relaxed text-cream md:text-3xl">
              Le the, c'est pas juste de l'eau chaude avec des feuilles dedans.
              C'est un art de vivre, une philosophie, une folie douce.
            </p>
            <p className="mt-6 text-sm text-tea-400">
              &mdash; Un sage completement fada
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-tea-200/60 bg-sage-50">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <h2 className="font-heading text-3xl font-bold text-tea-900 md:text-4xl">
            Deviens un vrai fada du the
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-tea-600">
            Cree ton compte pour sauvegarder tes thes preferes et rejoindre
            la communaute des fadas.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {!user ? (
              <>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-lg bg-tea-700 px-8 py-3.5 text-sm font-semibold text-cream transition-all duration-200 hover:bg-tea-800 hover:shadow-lg"
                >
                  Rejoindre les fadas
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-lg border border-tea-300 px-8 py-3.5 text-sm font-semibold text-tea-700 transition-all duration-200 hover:bg-white"
                >
                  J'ai deja un compte
                </Link>
              </>
            ) : (
              <Link
                href="/account"
                className="inline-flex items-center gap-2 rounded-lg bg-tea-700 px-8 py-3.5 text-sm font-semibold text-cream transition-all duration-200 hover:bg-tea-800 hover:shadow-lg"
              >
                Mon espace fada
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
