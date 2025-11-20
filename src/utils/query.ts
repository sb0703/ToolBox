export type SearchQuery = {
  q?: string;
  tag?: string | null;
  category?: string | null;
  sort?: "az" | "recent";
};

export function readSearchQuery(search: URLSearchParams): SearchQuery {
  return {
    q: search.get("q") || undefined,
    tag: search.get("tag") || undefined,
    category: search.get("category") || undefined,
    sort: (search.get("sort") as any) || "az",
  };
}

export function writeSearchQuery(obj: SearchQuery): Record<string, string> {
  const out: Record<string, string> = {};
  if (obj.q) out.q = obj.q;
  if (obj.tag) out.tag = obj.tag;
  if (obj.category) out.category = obj.category;
  if (obj.sort) out.sort = obj.sort;
  return out;
}
