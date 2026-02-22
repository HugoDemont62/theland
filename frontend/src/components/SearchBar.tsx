"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface SearchResult {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  temperature: number;
  brewingTime: number;
  tea_category?: { name: string; slug: string };
}

const CATEGORY_COLORS: Record<string, string> = {
  "the-vert": "bg-matcha-100 text-matcha-700",
  "the-noir": "bg-tea-100 text-tea-700",
  oolong: "bg-sage-100 text-sage-700",
  matcha: "bg-matcha-200 text-matcha-800",
  "the-fermente": "bg-tea-200 text-tea-800",
  "the-blanc": "bg-tea-50 text-tea-500",
};

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!query.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/teas/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.data || []);
        setOpen(true);
      } catch {
        setResults([]);
      }
      setLoading(false);
    }, 250);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  function handleSelect() {
    setQuery("");
    setOpen(false);
    setResults([]);
  }

  return (
    <div ref={ref} className="relative">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-tea-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder="Rechercher un the..."
          className="w-48 rounded-lg border border-tea-200 bg-cream/80 py-2 pl-9 pr-3 text-sm text-tea-900 outline-none transition-all duration-200 placeholder:text-tea-400 focus:w-64 focus:border-tea-400 focus:ring-2 focus:ring-tea-200"
        />
        {loading && (
          <div className="absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 animate-spin rounded-full border border-tea-400 border-t-transparent" />
        )}
      </div>

      {/* Dropdown */}
      {open && results.length > 0 && (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-xl border border-tea-200 bg-white shadow-xl">
          {results.map((tea) => (
            <Link
              key={tea.id}
              href={`/collection/${tea.slug}`}
              onClick={handleSelect}
              className="flex items-start gap-3 border-b border-tea-100 px-4 py-3 transition-colors last:border-0 hover:bg-tea-50"
            >
              <div className="flex-1">
                <p className="text-sm font-semibold text-tea-900">{tea.name}</p>
                <p className="mt-0.5 text-xs text-tea-500 line-clamp-1">
                  {tea.shortDescription}
                </p>
              </div>
              {tea.tea_category && (
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    CATEGORY_COLORS[tea.tea_category.slug] || "bg-tea-100 text-tea-600"
                  }`}
                >
                  {tea.tea_category.name}
                </span>
              )}
            </Link>
          ))}
        </div>
      )}

      {open && query.trim() && results.length === 0 && !loading && (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-xl border border-tea-200 bg-white p-4 text-center shadow-xl">
          <p className="text-sm text-tea-500">Aucun the trouve pour "{query}"</p>
        </div>
      )}
    </div>
  );
}
