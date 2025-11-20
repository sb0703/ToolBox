import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useCatalogStore } from "@/stores/catalog";
import ToolCard from "@/components/ToolCard.vue";
const route = useRoute();
const catalog = useCatalogStore();
onMounted(() => catalog.loadMock());
const category = computed(() => catalog.categories.find((c) => c.id === String(route.params.categoryId)));
const tools = computed(() => category.value
    ? catalog.tools.filter((tool) => tool.categoryId === category.value?.id)
    : []);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "category container" },
});
const __VLS_0 = {}.ABreadcrumb;
/** @type {[typeof __VLS_components.ABreadcrumb, typeof __VLS_components.aBreadcrumb, typeof __VLS_components.ABreadcrumb, typeof __VLS_components.aBreadcrumb, ]} */ ;
// @ts-ignore
ABreadcrumb;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "category__crumb" },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "category__crumb" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_4 } = __VLS_3.slots;
const __VLS_5 = {}.ABreadcrumbItem;
/** @type {[typeof __VLS_components.ABreadcrumbItem, typeof __VLS_components.aBreadcrumbItem, typeof __VLS_components.ABreadcrumbItem, typeof __VLS_components.aBreadcrumbItem, ]} */ ;
// @ts-ignore
ABreadcrumbItem;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({}));
const __VLS_7 = __VLS_6({}, ...__VLS_functionalComponentArgsRest(__VLS_6));
const { default: __VLS_9 } = __VLS_8.slots;
const __VLS_10 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
// @ts-ignore
RouterLink;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
    to: "/tools",
}));
const __VLS_12 = __VLS_11({
    to: "/tools",
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
const { default: __VLS_14 } = __VLS_13.slots;
var __VLS_13;
var __VLS_8;
const __VLS_15 = {}.ABreadcrumbItem;
/** @type {[typeof __VLS_components.ABreadcrumbItem, typeof __VLS_components.aBreadcrumbItem, typeof __VLS_components.ABreadcrumbItem, typeof __VLS_components.aBreadcrumbItem, ]} */ ;
// @ts-ignore
ABreadcrumbItem;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({}));
const __VLS_17 = __VLS_16({}, ...__VLS_functionalComponentArgsRest(__VLS_16));
const { default: __VLS_19 } = __VLS_18.slots;
(__VLS_ctx.category?.name || "分类");
// @ts-ignore
[category,];
var __VLS_18;
var __VLS_3;
if (__VLS_ctx.category) {
    // @ts-ignore
    [category,];
    const __VLS_20 = {}.ACard;
    /** @type {[typeof __VLS_components.ACard, typeof __VLS_components.aCard, typeof __VLS_components.ACard, typeof __VLS_components.aCard, ]} */ ;
    // @ts-ignore
    ACard;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
        ...{ class: "category__intro" },
        title: (__VLS_ctx.category.name),
    }));
    const __VLS_22 = __VLS_21({
        ...{ class: "category__intro" },
        title: (__VLS_ctx.category.name),
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    const { default: __VLS_24 } = __VLS_23.slots;
    // @ts-ignore
    [category,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "category__desc" },
    });
    (__VLS_ctx.category.description || "该分类下的工具都在这里");
    // @ts-ignore
    [category,];
    var __VLS_23;
}
if (!__VLS_ctx.category) {
    // @ts-ignore
    [category,];
    const __VLS_25 = {}.AEmpty;
    /** @type {[typeof __VLS_components.AEmpty, typeof __VLS_components.aEmpty, ]} */ ;
    // @ts-ignore
    AEmpty;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
        description: "未找到该分类，返回工具页试试吧",
    }));
    const __VLS_27 = __VLS_26({
        description: "未找到该分类，返回工具页试试吧",
    }, ...__VLS_functionalComponentArgsRest(__VLS_26));
}
else {
    const __VLS_30 = {}.ARow;
    /** @type {[typeof __VLS_components.ARow, typeof __VLS_components.aRow, typeof __VLS_components.ARow, typeof __VLS_components.aRow, ]} */ ;
    // @ts-ignore
    ARow;
    // @ts-ignore
    const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
        gutter: ([16, 16]),
    }));
    const __VLS_32 = __VLS_31({
        gutter: ([16, 16]),
    }, ...__VLS_functionalComponentArgsRest(__VLS_31));
    const { default: __VLS_34 } = __VLS_33.slots;
    for (const [tool] of __VLS_getVForSourceType((__VLS_ctx.tools))) {
        // @ts-ignore
        [tools,];
        const __VLS_35 = {}.ACol;
        /** @type {[typeof __VLS_components.ACol, typeof __VLS_components.aCol, typeof __VLS_components.ACol, typeof __VLS_components.aCol, ]} */ ;
        // @ts-ignore
        ACol;
        // @ts-ignore
        const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({
            key: (tool.id),
            xs: (24),
            sm: (12),
            md: (8),
            lg: (8),
        }));
        const __VLS_37 = __VLS_36({
            key: (tool.id),
            xs: (24),
            sm: (12),
            md: (8),
            lg: (8),
        }, ...__VLS_functionalComponentArgsRest(__VLS_36));
        const { default: __VLS_39 } = __VLS_38.slots;
        /** @type {[typeof ToolCard, ]} */ ;
        // @ts-ignore
        const __VLS_40 = __VLS_asFunctionalComponent(ToolCard, new ToolCard({
            tool: (tool),
        }));
        const __VLS_41 = __VLS_40({
            tool: (tool),
        }, ...__VLS_functionalComponentArgsRest(__VLS_40));
        var __VLS_38;
    }
    var __VLS_33;
}
if (__VLS_ctx.category && !__VLS_ctx.tools.length) {
    // @ts-ignore
    [category, tools,];
    const __VLS_44 = {}.AEmpty;
    /** @type {[typeof __VLS_components.AEmpty, typeof __VLS_components.aEmpty, ]} */ ;
    // @ts-ignore
    AEmpty;
    // @ts-ignore
    const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
        description: "该分类下暂时没有工具",
        ...{ class: "category__empty" },
    }));
    const __VLS_46 = __VLS_45({
        description: "该分类下暂时没有工具",
        ...{ class: "category__empty" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_45));
}
/** @type {__VLS_StyleScopedClasses['category']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['category__crumb']} */ ;
/** @type {__VLS_StyleScopedClasses['category__intro']} */ ;
/** @type {__VLS_StyleScopedClasses['category__desc']} */ ;
/** @type {__VLS_StyleScopedClasses['category__empty']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
