import { computed } from "vue";
import { useRouter } from "vue-router";
import { useSearchStore } from "@/stores/search";
import { useCatalogStore } from "@/stores/catalog";
import { writeSearchQuery } from "@/utils/query";
const router = useRouter();
const search = useSearchStore();
const catalog = useCatalogStore();
const options = computed(() => {
    const q = search.query.trim().toLowerCase();
    if (!q)
        return [];
    const toolOpts = catalog.tools
        .filter((t) => [t.name, t.slug, ...t.tags].some((v) => v.toLowerCase().includes(q)))
        .slice(0, 8)
        .map((t) => ({ value: t.id, label: `🔧 ${t.name} · ${t.summary}` }));
    const tagOpts = catalog.tags
        .filter((tg) => tg.toLowerCase().includes(q))
        .slice(0, 5)
        .map((tg) => ({ value: `tag:${tg}`, label: `# ${tg}` }));
    return [...toolOpts, ...tagOpts];
});
function onSearch(val) {
    search.query = val;
}
function onSelect(val) {
    if (val.startsWith("tag:")) {
        search.tag = val.slice(4);
        router.push({ name: "tools" });
    }
    else {
        router.push({ name: "tool-detail", params: { toolId: val } });
    }
}
function goSearch() {
    router.push({ name: "search", query: writeSearchQuery({ q: search.query }) });
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "gsearch" },
});
const __VLS_0 = {}.AAutoComplete;
/** @type {[typeof __VLS_components.AAutoComplete, typeof __VLS_components.aAutoComplete, typeof __VLS_components.AAutoComplete, typeof __VLS_components.aAutoComplete, ]} */ ;
// @ts-ignore
AAutoComplete;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onSelect': {} },
    ...{ 'onSearch': {} },
    value: (__VLS_ctx.search.query),
    ...{ class: "gsearch__ac" },
    options: (__VLS_ctx.options),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onSelect': {} },
    ...{ 'onSearch': {} },
    value: (__VLS_ctx.search.query),
    ...{ class: "gsearch__ac" },
    options: (__VLS_ctx.options),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
const __VLS_6 = ({ select: {} },
    { onSelect: (__VLS_ctx.onSelect) });
const __VLS_7 = ({ search: {} },
    { onSearch: (__VLS_ctx.onSearch) });
const { default: __VLS_8 } = __VLS_3.slots;
// @ts-ignore
[search, options, onSelect, onSearch,];
const __VLS_9 = {}.AInputSearch;
/** @type {[typeof __VLS_components.AInputSearch, typeof __VLS_components.aInputSearch, ]} */ ;
// @ts-ignore
AInputSearch;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
    ...{ 'onSearch': {} },
    placeholder: "搜索工具、标签或分类",
    allowClear: true,
}));
const __VLS_11 = __VLS_10({
    ...{ 'onSearch': {} },
    placeholder: "搜索工具、标签或分类",
    allowClear: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
let __VLS_13;
let __VLS_14;
const __VLS_15 = ({ search: {} },
    { onSearch: (__VLS_ctx.goSearch) });
// @ts-ignore
[goSearch,];
var __VLS_12;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['gsearch']} */ ;
/** @type {__VLS_StyleScopedClasses['gsearch__ac']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
