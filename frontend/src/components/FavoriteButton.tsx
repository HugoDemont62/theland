"use client";

import { useState } from "react";

interface FavoriteButtonProps {
  teaId: number;
  teaDocumentId: string;
  initialFavorite: boolean;
}

export default function FavoriteButton({ teaId, initialFavorite }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const [loading, setLoading] = useState(false);

  async function toggleFavorite() {
    setLoading(true);
    try {
      const res = await fetch("/api/favorites/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teaId }),
      });

      const data = await res.json();
      if (data.success) {
        setIsFavorite(data.isFavorite);
      }
    } catch {
      // silently fail
    }
    setLoading(false);
  }

  return (
    <button
      onClick={toggleFavorite}
      disabled={loading}
      className={`flex w-full items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold transition-all duration-200 disabled:opacity-50 ${
        isFavorite
          ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
          : "border-tea-200 bg-white text-tea-700 hover:bg-tea-50"
      }`}
    >
      <svg
        className="h-5 w-5"
        fill={isFavorite ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={isFavorite ? 0 : 1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
      {loading ? "..." : isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
    </button>
  );
}
