export function readSearchQuery(search) {
    return {
        q: search.get("q") || undefined,
        tag: search.get("tag") || undefined,
        category: search.get("category") || undefined,
        sort: search.get("sort") || "az",
    };
}
export function writeSearchQuery(obj) {
    const out = {};
    if (obj.q)
        out.q = obj.q;
    if (obj.tag)
        out.tag = obj.tag;
    if (obj.category)
        out.category = obj.category;
    if (obj.sort)
        out.sort = obj.sort;
    return out;
}
