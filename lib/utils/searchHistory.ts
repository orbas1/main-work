const KEY = "gig_search_history";

export function getSearchHistory(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function addSearchTerm(term: string) {
  if (typeof window === "undefined" || !term) return;
  const history = getSearchHistory().filter((t) => t !== term);
  history.unshift(term);
  localStorage.setItem(KEY, JSON.stringify(history.slice(0, 5)));
}
