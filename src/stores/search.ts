import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useCatalogStore } from "./catalog";
import type { SearchQuery } from "@/utils/query";
export const useSearchStore = defineStore("search", () => {
  const catalog = useCatalogStore();
  const query = ref("");
  const tag = ref<string | null>(null);
  const categoryId = ref<string | null>(null);
  const sort = ref<"az" | "recent">("az");

  const results = computed(() => {
    const q = query.value.trim().toLowerCase();
    const list = catalog.tools.filter((t) => {
      const matchQ =
        !q ||
        [t.name, t.summary, t.tags.join(" "), t.slug].some((v) =>
          v.toLowerCase().includes(q)
        );
      const matchTag = !tag.value || t.tags.includes(tag.value);
      const matchCat = !categoryId.value || t.categoryId === categoryId.value;
      return matchQ && matchTag && matchCat;
    });
    if (sort.value === "az")
      return list.sort((a, b) => a.name.localeCompare(b.name));
    return list; // recent: 暂用原顺序
  });
  function setAll(q: SearchQuery) {
    if (q.q !== undefined) query.value = q.q || "";
    tag.value = q.tag ?? null;
    categoryId.value = q.category ?? null;
    sort.value = (q.sort as any) || "az";
  }
  return { query, tag, categoryId, sort, results, setAll };
});
export {};
