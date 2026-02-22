import { fetchCollectionType } from "@/lib/strapi";
import { getUser, getUserWithFavorites } from "@/actions/auth";
import { notFound } from "next/navigation";
import Link from "next/link";
import FavoriteButton from "@/components/FavoriteButton";

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
  tea_category?: { name: string; slug: string; description?: string };
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; light: string }> = {
  "the-vert": { bg: "bg-matcha-600", text: "text-matcha-700", light: "bg-matcha-50" },
  "the-noir": { bg: "bg-tea-700", text: "text-tea-700", light: "bg-tea-50" },
  oolong: { bg: "bg-sage-600", text: "text-sage-700", light: "bg-sage-50" },
  matcha: { bg: "bg-matcha-700", text: "text-matcha-800", light: "bg-matcha-50" },
  "the-fermente": { bg: "bg-tea-800", text: "text-tea-800", light: "bg-tea-50" },
  "the-blanc": { bg: "bg-tea-400", text: "text-tea-600", light: "bg-tea-50" },
};

function getColors(slug?: string) {
  return CATEGORY_COLORS[slug || ""] || { bg: "bg-tea-600", text: "text-tea-700", light: "bg-tea-50" };
}

export default async function TeaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let teas: Tea[] = [];
  try {
    teas = await fetchCollectionType<Tea[]>("teas", {
      filters: { slug: { $eq: slug } },
      populate: ["tea_category", "image"],
    });
  } catch {
    notFound();
  }

  const tea = teas[0];
  if (!tea) notFound();

  const colors = getColors(tea.tea_category?.slug);

  // Check favorites
  let isFavorite = false;
  const userWithFavs = await getUserWithFavorites();
  if (userWithFavs) {
    isFavorite = (userWithFavs.favorite_teas || []).some((f: any) => f.id === tea.id);
  }

  const user = userWithFavs || (await getUser());

  return (
    <div className="min-h-[calc(100vh-73px)] bg-cream">
      {/* Hero Header */}
      <section className={`${colors.bg} relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-white blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-white blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 py-16 text-center text-white">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center justify-center gap-2 text-sm text-white/70">
            <Link href="/collection" className="hover:text-white">Collection</Link>
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
            <span>{tea.tea_category?.name || "The"}</span>
          </div>

          <h1 className="font-heading text-5xl font-bold md:text-6xl">{tea.name}</h1>
          {tea.tea_category && (
            <p className="mt-3 text-lg text-white/80">{tea.tea_category.name}</p>
          )}
          <p className="mx-auto mt-4 max-w-xl text-white/90">{tea.shortDescription}</p>

          {/* Quick stats */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-6 rounded-2xl bg-white/10 px-8 py-4 backdrop-blur-sm">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5">
                <svg className="h-5 w-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                </svg>
                <span className="text-2xl font-bold">{tea.temperature}°C</span>
              </div>
              <p className="mt-1 text-xs text-white/60">Temperature</p>
            </div>
            <div className="hidden h-10 w-px bg-white/20 sm:block" />
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5">
                <svg className="h-5 w-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-2xl font-bold">{tea.brewingTime} min</span>
              </div>
              <p className="mt-1 text-xs text-white/60">Infusion</p>
            </div>
            <div className="hidden h-10 w-px bg-white/20 sm:block" />
            <div className="text-center">
              <p className="text-lg font-bold">{tea.dosage}</p>
              <p className="mt-1 text-xs text-white/60">Dosage</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            {/* Description */}
            <div className="rounded-2xl border border-tea-200/60 bg-white p-8 shadow-sm">
              <h2 className="mb-4 font-heading text-2xl font-semibold text-tea-900">
                A propos de ce the
              </h2>
              <p className="leading-relaxed text-tea-600">{tea.shortDescription}</p>
              {tea.tea_category?.description && (
                <div className={`mt-6 rounded-xl ${colors.light} p-5`}>
                  <h3 className={`mb-2 font-heading text-sm font-semibold uppercase tracking-wider ${colors.text}`}>
                    {tea.tea_category.name}
                  </h3>
                  <p className="text-sm text-tea-600">{tea.tea_category.description}</p>
                </div>
              )}
            </div>

            {/* Preparation */}
            <div className="rounded-2xl border border-tea-200/60 bg-white p-8 shadow-sm">
              <h2 className="mb-6 font-heading text-2xl font-semibold text-tea-900">
                Guide de preparation
              </h2>
              <div className="space-y-6">
                {[
                  { step: "1", title: "Chauffer l'eau", desc: `Faites chauffer votre eau a ${tea.temperature}°C. Ne la faites pas bouillir pour preserver les aromes.` },
                  { step: "2", title: "Doser le the", desc: `Utilisez ${tea.dosage} pour une infusion optimale.` },
                  { step: "3", title: "Infuser", desc: `Laissez infuser pendant ${tea.brewingTime} minute${tea.brewingTime > 1 ? "s" : ""}. Ne depassez pas le temps pour eviter l'amertume.` },
                  { step: "4", title: "Deguster", desc: "Retirez les feuilles et savourez. Vous pouvez re-infuser 2 a 3 fois." },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${colors.bg} text-sm font-bold text-white`}>
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-tea-900">{item.title}</h3>
                      <p className="mt-1 text-sm text-tea-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {user ? (
              <FavoriteButton teaId={tea.id} teaDocumentId={tea.documentId} initialFavorite={isFavorite} />
            ) : (
              <Link
                href="/login"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-tea-200 bg-white px-5 py-3 text-sm font-semibold text-tea-700 transition-all duration-200 hover:bg-tea-50"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                Connectez-vous pour ajouter aux favoris
              </Link>
            )}

            <div className="rounded-2xl border border-tea-200/60 bg-white p-6 shadow-sm">
              <h3 className="mb-4 font-heading text-lg font-semibold text-tea-900">
                Fiche technique
              </h3>
              <dl className="space-y-3">
                {[
                  { label: "Categorie", value: tea.tea_category?.name || "Non classifie" },
                  { label: "Temperature", value: `${tea.temperature}°C` },
                  { label: "Temps d'infusion", value: `${tea.brewingTime} min` },
                  { label: "Dosage", value: tea.dosage },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between border-b border-tea-100 pb-3 last:border-0 last:pb-0">
                    <dt className="text-sm text-tea-500">{item.label}</dt>
                    <dd className="text-sm font-semibold text-tea-800">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <Link
              href="/collection"
              className="flex items-center gap-2 rounded-xl border border-tea-200 bg-white px-5 py-3 text-sm font-medium text-tea-700 transition-colors hover:bg-tea-50"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Retour a la collection
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
