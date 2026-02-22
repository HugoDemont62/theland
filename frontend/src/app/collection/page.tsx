import Link from "next/link";
import { fetchCollectionType } from "@/lib/strapi";
import TeaGrid from "@/components/TeaGrid";

interface TeaCategory {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description?: string;
}

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
  tea_category?: TeaCategory;
}

export default async function CollectionPage() {
  let teas: Tea[] = [];
  let categories: TeaCategory[] = [];

  try {
    [teas, categories] = await Promise.all([
      fetchCollectionType<Tea[]>("teas", {
        populate: ["tea_category", "image"],
        sort: ["name:asc"],
        pagination: { limit: 100 },
      }),
      fetchCollectionType<TeaCategory[]>("tea-categories", {
        sort: ["name:asc"],
      }),
    ]);
  } catch {
    // Strapi might not be running
  }

  return (
    <div className="min-h-[calc(100vh-73px)] bg-cream">
      {/* Hero */}
      <section className="border-b border-tea-200/60 bg-parchment">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-tea-500">
            Collection
          </p>
          <h1 className="font-heading text-5xl font-bold text-tea-900">
            Nos Thes de Fadas
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-tea-600">
            Explorez notre selection de thes d'exception, choisis avec soin et
            un grain de folie aupres des meilleurs jardins du monde.
          </p>
        </div>
      </section>

      {teas.length > 0 ? (
        <TeaGrid teas={teas} categories={categories} />
      ) : (
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="rounded-2xl border border-tea-200/60 bg-white p-16 text-center">
            <h3 className="font-heading text-xl font-semibold text-tea-900">
              La collection arrive bientot !
            </h3>
            <p className="mt-2 text-sm text-tea-500">
              Nos thes sont en cours de preparation. Reviens vite !
            </p>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="border-t border-tea-200/60 bg-parchment">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center">
          <h2 className="font-heading text-2xl font-bold text-tea-900">
            Tu ne trouves pas ton bonheur ?
          </h2>
          <p className="mt-2 text-tea-600">
            Contacte-nous, on a surement un the de fada pour toi !
          </p>
          <Link
            href="/about"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-tea-700 px-6 py-3 text-sm font-semibold text-cream transition-all duration-200 hover:bg-tea-800"
          >
            Decouvrir notre histoire
          </Link>
        </div>
      </section>
    </div>
  );
}
