import Fuse from "fuse.js";
import { searchItems, SearchItem } from "./data";

const fuse = new Fuse<SearchItem>(searchItems, {
  keys: ["title", "description"],
  threshold: 0.3,
});

export function search(query: string): SearchItem[] {
  if (!query) return [];
  return fuse.search(query).map((r) => r.item);
}
