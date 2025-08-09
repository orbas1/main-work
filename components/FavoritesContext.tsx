"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Gig } from "@/lib/types/gig";

interface FavoritesContextValue {
  favorites: Gig[];
  toggleFavorite: (gig: Gig) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Gig[]>([]);

  const toggleFavorite = (gig: Gig) => {
    setFavorites((prev) =>
      prev.find((g) => g.id === gig.id)
        ? prev.filter((g) => g.id !== gig.id)
        : [...prev, gig]
    );
  };

  const isFavorite = (id: number) => favorites.some((g) => g.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
