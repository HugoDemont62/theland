"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

interface TeaCategory {
  id: number;
  name: string;
  slug: string;
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
  tea_category?: TeaCategory;
}

interface TeaGridProps {
  teas: Tea[];
  categories: TeaCategory[];
}

const CATEGORY_COLORS: Record<string, { color: string; accent: string; badge: string }> = {
  "the-vert": { color: "bg-matcha-100", accent: "text-matcha-700", badge: "bg-matcha-50 text-matcha-600" },
  "the-noir": { color: "bg-tea-100", accent: "text-tea-700", badge: "bg-tea-50 text-tea-600" },
  oolong: { color: "bg-sage-100", accent: "text-sage-700", badge: "bg-sage-50 text-sage-600" },
  matcha: { color: "bg-matcha-200", accent: "text-matcha-800", badge: "bg-matcha-100 text-matcha-700" },
  "the-fermente": { color: "bg-tea-200", accent: "text-tea-800", badge: "bg-tea-100 text-tea-700" },
  "the-blanc": { color: "bg-cream-dark", accent: "text-tea-600", badge: "bg-tea-50 text-tea-500" },
};

function getTeaColors(slug?: string) {
  return CATEGORY_COLORS[slug || ""] || { color: "bg-tea-100", accent: "text-tea-700", badge: "bg-tea-50 text-tea-600" };
}

type SortOption = "name-asc" | "name-desc" | "temp-asc" | "temp-desc" | "time-asc" | "time-desc";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "name-asc", label: "Nom A-Z" },
  { value: "name-desc", label: "Nom Z-A" },
  { value: "temp-asc", label: "Temperature croissante" },
  { value: "temp-desc", label: "Temperature decroissante" },
  { value: "time-asc", label: "Infusion courte d'abord" },
  { value: "time-desc", label: "Infusion longue d'abord" },
];

export default function TeaGrid({ teas, categories }: TeaGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("name-asc");

  const filteredAndSorted = useMemo(() => {
    let result = [...teas];

    if (selectedCategory) {
      result = result.filter((t) => t.tea_category?.slug === selectedCategory);
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "temp-asc":
          return a.temperature - b.temperature;
        case "temp-desc":
          return b.temperature - a.temperature;
        case "time-asc":
          return a.brewingTime - b.brewingTime;
        case "time-desc":
          return b.brewingTime - a.brewingTime;
        default:
          return 0;
      }
    });

    return result;
  }, [teas, selectedCategory, sortBy]);

  return (
    <div>
      {/* Filters bar */}
      <div className="border-b border-tea-200/60 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-center justify-between gap-4 py-4">
            {/* Categories */}
            <div className="flex gap-1 overflow-x-auto">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  !selectedCategory
                    ? "bg-tea-700 text-cream"
                    : "text-tea-600 hover:bg-tea-100"
                }`}
              >
                Tous ({teas.length})
              </button>
              {categories.map((cat) => {
                const count = teas.filter((t) => t.tea_category?.slug === cat.slug).length;
                if (count === 0) return null;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      selectedCategory === cat.slug
                        ? "bg-tea-700 text-cream"
                        : "text-tea-600 hover:bg-tea-100"
                    }`}
                  >
                    {cat.name} ({count})
                  </button>
                );
              })}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="rounded-lg border border-tea-200 bg-cream/50 px-3 py-2 text-sm text-tea-700 outline-none focus:border-tea-400 focus:ring-2 focus:ring-tea-200"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="mx-auto max-w-7xl px-6 pt-6">
        <p className="text-sm text-tea-500">
          {filteredAndSorted.length} the{filteredAndSorted.length > 1 ? "s" : ""}{" "}
          {selectedCategory ? `dans "${categories.find((c) => c.slug === selectedCategory)?.name}"` : ""}
        </p>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-4">
        {filteredAndSorted.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredAndSorted.map((tea) => {
              const colors = getTeaColors(tea.tea_category?.slug);
              return (
                <Link
                  key={tea.id}
                  href={`/collection/${tea.slug}`}
                  className="group overflow-hidden rounded-2xl border border-tea-200/60 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-tea-300 hover:shadow-xl hover:shadow-tea-200/40"
                >
                  <div className={`${colors.color} flex h-44 flex-col justify-between p-5`}>
                    <span className={`${colors.badge} w-fit rounded-full px-3 py-1 text-xs font-semibold`}>
                      {tea.tea_category?.name || "The"}
                    </span>
                    <h3 className={`font-heading text-xl font-bold ${colors.accent}`}>
                      {tea.name}
                    </h3>
                  </div>
                  <div className="p-5">
                    <p className="text-sm leading-relaxed text-tea-600 line-clamp-2">
                      {tea.shortDescription}
                    </p>
                    <div className="mt-4 flex gap-4">
                      <div className="flex items-center gap-1.5">
                        <svg className="h-3.5 w-3.5 text-tea-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                        </svg>
                        <span className="text-xs text-tea-500">{tea.temperature}°C</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <svg className="h-3.5 w-3.5 text-tea-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-xs text-tea-500">{tea.brewingTime} min</span>
                      </div>
                    </div>
                    <div className="mt-3 rounded-lg bg-tea-50 px-3 py-2">
                      <p className="text-xs text-tea-500">Dosage : {tea.dosage}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-tea-200/60 bg-white p-12 text-center">
            <p className="text-tea-500">Aucun the dans cette categorie.</p>
            <button
              onClick={() => setSelectedCategory(null)}
              className="mt-3 text-sm font-semibold text-tea-600 underline decoration-tea-300 underline-offset-2"
            >
              Voir tous les thes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
