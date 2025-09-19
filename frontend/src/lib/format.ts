import type { Category } from "../types/participant";

export function formatCategory(category: Category): string {
  switch (category) {
    case "_5KM":
      return "5 km";
    case "_10KM":
      return "10 km";
    case "HALF_MARATHON":
      return "Half Marathon";
    case "MARATHON":
      return "Full Marathon";
    default:
      return String(category)
        .replaceAll("_", " ")
        .toLowerCase()
        .replace(/\b\w/g, (c) => c.toUpperCase());
  }
}


