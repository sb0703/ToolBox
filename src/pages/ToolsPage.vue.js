import { onMounted } from "vue";
import { useCatalogStore } from "@/stores/catalog";
import { useSearchStore } from "@/stores/search";
import { writeSearchQuery } from "@/utils/query";
import { useRouter } from "vue-router";
import ToolCard from "@/components/ToolCard.vue";
import GlobalSearch from "@/components/GlobalSearch.vue";
const catalog = useCatalogStore();
const search = useSearchStore();
const router = useRouter();
function goSearch() {
    router.push({
        name: "search",
        query: writeSearchQuery({
            q: search.query,
            tag: search.tag || undefined,
            category: search.categoryId || undefined,
            sort: search.sort,
        }),
    });
}
onMounted(() => {
    catalog.loadMock();
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
    ...{ class: "tools container" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "tools__bar" },
});
/** @type {[typeof GlobalSearch, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(GlobalSearch, new GlobalSearch({
    ...{ class: "tools__search" },
}));
const __VLS_1 = __VLS_0({
    ...{ class: "tools__search" },
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
const __VLS_4 = {}.ASelect;
/** @type {[typeof __VLS_components.ASelect, typeof __VLS_components.aSelect, typeof __VLS_components.ASelect, typeof __VLS_components.aSelect, ]} */ ;
// @ts-ignore
ASelect;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    value: (__VLS_ctx.search.categoryId),
    placeholder: "分类",
    allowClear: true,
    ...{ class: "tools__filter" },
}));
const __VLS_6 = __VLS_5({
    value: (__VLS_ctx.search.categoryId),
    placeholder: "分类",
    allowClear: true,
    ...{ class: "tools__filter" },
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
const { default: __VLS_8 } = __VLS_7.slots;
// @ts-ignore
[search,];
for (const [c] of __VLS_getVForSourceType((__VLS_ctx.catalog.categories))) {
    // @ts-ignore
    [catalog,];
    const __VLS_9 = {}.ASelectOption;
    /** @type {[typeof __VLS_components.ASelectOption, typeof __VLS_components.aSelectOption, typeof __VLS_components.ASelectOption, typeof __VLS_components.aSelectOption, ]} */ ;
    // @ts-ignore
    ASelectOption;
    // @ts-ignore
    const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
        key: (c.id),
        value: (c.id),
    }));
    const __VLS_11 = __VLS_10({
        key: (c.id),
        value: (c.id),
    }, ...__VLS_functionalComponentArgsRest(__VLS_10));
    const { default: __VLS_13 } = __VLS_12.slots;
    (c.name);
    var __VLS_12;
}
var __VLS_7;
const __VLS_14 = {}.ASelect;
/** @type {[typeof __VLS_components.ASelect, typeof __VLS_components.aSelect, typeof __VLS_components.ASelect, typeof __VLS_components.aSelect, ]} */ ;
// @ts-ignore
ASelect;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({
    value: (__VLS_ctx.search.tag),
    placeholder: "标签",
    allowClear: true,
    ...{ class: "tools__filter" },
}));
const __VLS_16 = __VLS_15({
    value: (__VLS_ctx.search.tag),
    placeholder: "标签",
    allowClear: true,
    ...{ class: "tools__filter" },
}, ...__VLS_functionalComponentArgsRest(__VLS_15));
const { default: __VLS_18 } = __VLS_17.slots;
// @ts-ignore
[search,];
for (const [tg] of __VLS_getVForSourceType((__VLS_ctx.catalog.tags))) {
    // @ts-ignore
    [catalog,];
    const __VLS_19 = {}.ASelectOption;
    /** @type {[typeof __VLS_components.ASelectOption, typeof __VLS_components.aSelectOption, typeof __VLS_components.ASelectOption, typeof __VLS_components.aSelectOption, ]} */ ;
    // @ts-ignore
    ASelectOption;
    // @ts-ignore
    const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({
        key: (tg),
        value: (tg),
    }));
    const __VLS_21 = __VLS_20({
        key: (tg),
        value: (tg),
    }, ...__VLS_functionalComponentArgsRest(__VLS_20));
    const { default: __VLS_23 } = __VLS_22.slots;
    (tg);
    var __VLS_22;
}
var __VLS_17;
const __VLS_24 = {}.ASegmented;
/** @type {[typeof __VLS_components.ASegmented, typeof __VLS_components.aSegmented, ]} */ ;
// @ts-ignore
ASegmented;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    value: (__VLS_ctx.search.sort),
    options: ([
        { label: 'A-Z', value: 'az' },
        { label: '最近', value: 'recent' },
    ]),
}));
const __VLS_26 = __VLS_25({
    value: (__VLS_ctx.search.sort),
    options: ([
        { label: 'A-Z', value: 'az' },
        { label: '最近', value: 'recent' },
    ]),
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
// @ts-ignore
[search,];
const __VLS_29 = {}.AButton;
/** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
// @ts-ignore
AButton;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
    ...{ 'onClick': {} },
    type: "default",
}));
const __VLS_31 = __VLS_30({
    ...{ 'onClick': {} },
    type: "default",
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
let __VLS_33;
let __VLS_34;
const __VLS_35 = ({ click: {} },
    { onClick: (__VLS_ctx.goSearch) });
const { default: __VLS_36 } = __VLS_32.slots;
// @ts-ignore
[goSearch,];
var __VLS_32;
const __VLS_37 = {}.ARow;
/** @type {[typeof __VLS_components.ARow, typeof __VLS_components.aRow, typeof __VLS_components.ARow, typeof __VLS_components.aRow, ]} */ ;
// @ts-ignore
ARow;
// @ts-ignore
const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({
    gutter: ([16, 16]),
}));
const __VLS_39 = __VLS_38({
    gutter: ([16, 16]),
}, ...__VLS_functionalComponentArgsRest(__VLS_38));
const { default: __VLS_41 } = __VLS_40.slots;
for (const [t] of __VLS_getVForSourceType((__VLS_ctx.search.results))) {
    // @ts-ignore
    [search,];
    const __VLS_42 = {}.ACol;
    /** @type {[typeof __VLS_components.ACol, typeof __VLS_components.aCol, typeof __VLS_components.ACol, typeof __VLS_components.aCol, ]} */ ;
    // @ts-ignore
    ACol;
    // @ts-ignore
    const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({
        key: (t.id),
        xs: (24),
        sm: (12),
        md: (8),
        lg: (8),
    }));
    const __VLS_44 = __VLS_43({
        key: (t.id),
        xs: (24),
        sm: (12),
        md: (8),
        lg: (8),
    }, ...__VLS_functionalComponentArgsRest(__VLS_43));
    const { default: __VLS_46 } = __VLS_45.slots;
    /** @type {[typeof ToolCard, ]} */ ;
    // @ts-ignore
    const __VLS_47 = __VLS_asFunctionalComponent(ToolCard, new ToolCard({
        tool: (t),
    }));
    const __VLS_48 = __VLS_47({
        tool: (t),
    }, ...__VLS_functionalComponentArgsRest(__VLS_47));
    var __VLS_45;
}
var __VLS_40;
if (!__VLS_ctx.search.results.length) {
    // @ts-ignore
    [search,];
    const __VLS_51 = {}.AEmpty;
    /** @type {[typeof __VLS_components.AEmpty, typeof __VLS_components.aEmpty, ]} */ ;
    // @ts-ignore
    AEmpty;
    // @ts-ignore
    const __VLS_52 = __VLS_asFunctionalComponent(__VLS_51, new __VLS_51({
        description: "没有找到匹配的工具",
        ...{ class: "tools__empty" },
    }));
    const __VLS_53 = __VLS_52({
        description: "没有找到匹配的工具",
        ...{ class: "tools__empty" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_52));
}
/** @type {__VLS_StyleScopedClasses['tools']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['tools__bar']} */ ;
/** @type {__VLS_StyleScopedClasses['tools__search']} */ ;
/** @type {__VLS_StyleScopedClasses['tools__filter']} */ ;
/** @type {__VLS_StyleScopedClasses['tools__filter']} */ ;
/** @type {__VLS_StyleScopedClasses['tools__empty']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
