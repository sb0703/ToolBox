import { computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCatalogStore } from "@/stores/catalog";
import { useSearchStore } from "@/stores/search";
import ToolCard from "@/components/ToolCard.vue";
import { readSearchQuery, writeSearchQuery } from "@/utils/query";
const catalog = useCatalogStore();
const search = useSearchStore();
const route = useRoute();
const router = useRouter();
onMounted(() => {
    catalog.loadMock();
    search.setAll(readSearchQuery(new URLSearchParams(route.query)));
});
watch(() => route.query, (q) => {
    search.setAll(readSearchQuery(new URLSearchParams(q)));
});
function apply() {
    router.replace({
        name: "search",
        query: writeSearchQuery({
            q: search.query,
            tag: search.tag || undefined,
            category: search.categoryId || undefined,
            sort: search.sort,
        }),
    });
}
const metaText = computed(() => {
    const segs = [];
    if (search.query)
        segs.push(`关键词：${search.query}`);
    if (search.tag)
        segs.push(`标签：${search.tag}`);
    if (search.categoryId)
        segs.push(`分类：${catalog.categories.find((c) => c.id === search.categoryId)?.name}`);
    return segs.join(" · ");
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "search container" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "search__bar" },
});
const __VLS_0 = {}.AInput;
/** @type {[typeof __VLS_components.AInput, typeof __VLS_components.aInput, ]} */ ;
// @ts-ignore
AInput;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    value: (__VLS_ctx.search.query),
    placeholder: "搜索关键词",
    ...{ class: "search__q" },
    allowClear: true,
}));
const __VLS_2 = __VLS_1({
    value: (__VLS_ctx.search.query),
    placeholder: "搜索关键词",
    ...{ class: "search__q" },
    allowClear: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
// @ts-ignore
[search,];
const __VLS_5 = {}.ASelect;
/** @type {[typeof __VLS_components.ASelect, typeof __VLS_components.aSelect, typeof __VLS_components.ASelect, typeof __VLS_components.aSelect, ]} */ ;
// @ts-ignore
ASelect;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    value: (__VLS_ctx.search.categoryId),
    placeholder: "分类",
    allowClear: true,
    ...{ class: "search__filter" },
}));
const __VLS_7 = __VLS_6({
    value: (__VLS_ctx.search.categoryId),
    placeholder: "分类",
    allowClear: true,
    ...{ class: "search__filter" },
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
const { default: __VLS_9 } = __VLS_8.slots;
// @ts-ignore
[search,];
for (const [c] of __VLS_getVForSourceType((__VLS_ctx.catalog.categories))) {
    // @ts-ignore
    [catalog,];
    const __VLS_10 = {}.ASelectOption;
    /** @type {[typeof __VLS_components.ASelectOption, typeof __VLS_components.aSelectOption, typeof __VLS_components.ASelectOption, typeof __VLS_components.aSelectOption, ]} */ ;
    // @ts-ignore
    ASelectOption;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
        key: (c.id),
        value: (c.id),
    }));
    const __VLS_12 = __VLS_11({
        key: (c.id),
        value: (c.id),
    }, ...__VLS_functionalComponentArgsRest(__VLS_11));
    const { default: __VLS_14 } = __VLS_13.slots;
    (c.name);
    var __VLS_13;
}
var __VLS_8;
const __VLS_15 = {}.ASelect;
/** @type {[typeof __VLS_components.ASelect, typeof __VLS_components.aSelect, typeof __VLS_components.ASelect, typeof __VLS_components.aSelect, ]} */ ;
// @ts-ignore
ASelect;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
    value: (__VLS_ctx.search.tag),
    placeholder: "标签",
    allowClear: true,
    ...{ class: "search__filter" },
}));
const __VLS_17 = __VLS_16({
    value: (__VLS_ctx.search.tag),
    placeholder: "标签",
    allowClear: true,
    ...{ class: "search__filter" },
}, ...__VLS_functionalComponentArgsRest(__VLS_16));
const { default: __VLS_19 } = __VLS_18.slots;
// @ts-ignore
[search,];
for (const [tg] of __VLS_getVForSourceType((__VLS_ctx.catalog.tags))) {
    // @ts-ignore
    [catalog,];
    const __VLS_20 = {}.ASelectOption;
    /** @type {[typeof __VLS_components.ASelectOption, typeof __VLS_components.aSelectOption, typeof __VLS_components.ASelectOption, typeof __VLS_components.aSelectOption, ]} */ ;
    // @ts-ignore
    ASelectOption;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
        key: (tg),
        value: (tg),
    }));
    const __VLS_22 = __VLS_21({
        key: (tg),
        value: (tg),
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    const { default: __VLS_24 } = __VLS_23.slots;
    (tg);
    var __VLS_23;
}
var __VLS_18;
const __VLS_25 = {}.ASegmented;
/** @type {[typeof __VLS_components.ASegmented, typeof __VLS_components.aSegmented, ]} */ ;
// @ts-ignore
ASegmented;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
    value: (__VLS_ctx.search.sort),
    options: ([
        { label: 'A-Z', value: 'az' },
        { label: '最近', value: 'recent' },
    ]),
}));
const __VLS_27 = __VLS_26({
    value: (__VLS_ctx.search.sort),
    options: ([
        { label: 'A-Z', value: 'az' },
        { label: '最近', value: 'recent' },
    ]),
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
// @ts-ignore
[search,];
const __VLS_30 = {}.AButton;
/** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
// @ts-ignore
AButton;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
    ...{ 'onClick': {} },
    type: "primary",
}));
const __VLS_32 = __VLS_31({
    ...{ 'onClick': {} },
    type: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
let __VLS_34;
let __VLS_35;
const __VLS_36 = ({ click: {} },
    { onClick: (__VLS_ctx.apply) });
const { default: __VLS_37 } = __VLS_33.slots;
// @ts-ignore
[apply,];
var __VLS_33;
if (__VLS_ctx.metaText) {
    // @ts-ignore
    [metaText,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "search__meta" },
    });
    (__VLS_ctx.metaText);
    // @ts-ignore
    [metaText,];
}
const __VLS_38 = {}.ARow;
/** @type {[typeof __VLS_components.ARow, typeof __VLS_components.aRow, typeof __VLS_components.ARow, typeof __VLS_components.aRow, ]} */ ;
// @ts-ignore
ARow;
// @ts-ignore
const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({
    gutter: ([12, 12]),
}));
const __VLS_40 = __VLS_39({
    gutter: ([12, 12]),
}, ...__VLS_functionalComponentArgsRest(__VLS_39));
const { default: __VLS_42 } = __VLS_41.slots;
for (const [t] of __VLS_getVForSourceType((__VLS_ctx.search.results))) {
    // @ts-ignore
    [search,];
    const __VLS_43 = {}.ACol;
    /** @type {[typeof __VLS_components.ACol, typeof __VLS_components.aCol, typeof __VLS_components.ACol, typeof __VLS_components.aCol, ]} */ ;
    // @ts-ignore
    ACol;
    // @ts-ignore
    const __VLS_44 = __VLS_asFunctionalComponent(__VLS_43, new __VLS_43({
        key: (t.id),
        xs: (24),
        sm: (12),
        md: (8),
        lg: (8),
    }));
    const __VLS_45 = __VLS_44({
        key: (t.id),
        xs: (24),
        sm: (12),
        md: (8),
        lg: (8),
    }, ...__VLS_functionalComponentArgsRest(__VLS_44));
    const { default: __VLS_47 } = __VLS_46.slots;
    /** @type {[typeof ToolCard, ]} */ ;
    // @ts-ignore
    const __VLS_48 = __VLS_asFunctionalComponent(ToolCard, new ToolCard({
        tool: (t),
    }));
    const __VLS_49 = __VLS_48({
        tool: (t),
    }, ...__VLS_functionalComponentArgsRest(__VLS_48));
    var __VLS_46;
}
var __VLS_41;
if (!__VLS_ctx.search.results.length) {
    // @ts-ignore
    [search,];
    const __VLS_52 = {}.AEmpty;
    /** @type {[typeof __VLS_components.AEmpty, typeof __VLS_components.aEmpty, ]} */ ;
    // @ts-ignore
    AEmpty;
    // @ts-ignore
    const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
        description: "没有匹配的结果",
        ...{ class: "search__empty" },
    }));
    const __VLS_54 = __VLS_53({
        description: "没有匹配的结果",
        ...{ class: "search__empty" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_53));
}
/** @type {__VLS_StyleScopedClasses['search']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['search__bar']} */ ;
/** @type {__VLS_StyleScopedClasses['search__q']} */ ;
/** @type {__VLS_StyleScopedClasses['search__filter']} */ ;
/** @type {__VLS_StyleScopedClasses['search__filter']} */ ;
/** @type {__VLS_StyleScopedClasses['search__meta']} */ ;
/** @type {__VLS_StyleScopedClasses['search__empty']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
