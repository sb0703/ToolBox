import { computed, onMounted } from "vue";
import GlobalSearch from "@/components/GlobalSearch.vue";
import ToolCard from "@/components/ToolCard.vue";
import { useCatalogStore } from "@/stores/catalog";
import { useUserStore } from "@/stores/user";
const catalog = useCatalogStore();
const user = useUserStore();
onMounted(() => {
    catalog.loadMock();
});
function mapIds(ids) {
    return ids
        .map((id) => catalog.tools.find((t) => t.id === id))
        .filter((tool) => Boolean(tool));
}
const recentTools = computed(() => mapIds(user.profile.recentToolIds));
const pinnedTools = computed(() => mapIds(user.profile.pinnedToolIds));
const recommendedTools = computed(() => {
    const pinnedSet = new Set(user.profile.pinnedToolIds);
    const recentSet = new Set(user.profile.recentToolIds);
    return catalog.tools
        .filter((tool) => !pinnedSet.has(tool.id) && !recentSet.has(tool.id))
        .slice(0, 6);
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
    ...{ class: "home container" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "home__search" },
});
/** @type {[typeof GlobalSearch, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(GlobalSearch, new GlobalSearch({}));
const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
const __VLS_4 = {}.ACard;
/** @type {[typeof __VLS_components.ACard, typeof __VLS_components.aCard, typeof __VLS_components.ACard, typeof __VLS_components.aCard, ]} */ ;
// @ts-ignore
ACard;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    title: "最近使用",
    ...{ class: "home__section" },
}));
const __VLS_6 = __VLS_5({
    title: "最近使用",
    ...{ class: "home__section" },
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
const { default: __VLS_8 } = __VLS_7.slots;
if (!__VLS_ctx.recentTools.length) {
    // @ts-ignore
    [recentTools,];
    const __VLS_9 = {}.AEmpty;
    /** @type {[typeof __VLS_components.AEmpty, typeof __VLS_components.aEmpty, ]} */ ;
    // @ts-ignore
    AEmpty;
    // @ts-ignore
    const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
        description: "暂无历史，去运行一个工具吧",
    }));
    const __VLS_11 = __VLS_10({
        description: "暂无历史，去运行一个工具吧",
    }, ...__VLS_functionalComponentArgsRest(__VLS_10));
}
else {
    const __VLS_14 = {}.ARow;
    /** @type {[typeof __VLS_components.ARow, typeof __VLS_components.aRow, typeof __VLS_components.ARow, typeof __VLS_components.aRow, ]} */ ;
    // @ts-ignore
    ARow;
    // @ts-ignore
    const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({
        gutter: ([16, 16]),
    }));
    const __VLS_16 = __VLS_15({
        gutter: ([16, 16]),
    }, ...__VLS_functionalComponentArgsRest(__VLS_15));
    const { default: __VLS_18 } = __VLS_17.slots;
    for (const [tool] of __VLS_getVForSourceType((__VLS_ctx.recentTools))) {
        // @ts-ignore
        [recentTools,];
        const __VLS_19 = {}.ACol;
        /** @type {[typeof __VLS_components.ACol, typeof __VLS_components.aCol, typeof __VLS_components.ACol, typeof __VLS_components.aCol, ]} */ ;
        // @ts-ignore
        ACol;
        // @ts-ignore
        const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({
            key: (tool.id),
            xs: (24),
            sm: (12),
            md: (8),
            lg: (8),
        }));
        const __VLS_21 = __VLS_20({
            key: (tool.id),
            xs: (24),
            sm: (12),
            md: (8),
            lg: (8),
        }, ...__VLS_functionalComponentArgsRest(__VLS_20));
        const { default: __VLS_23 } = __VLS_22.slots;
        /** @type {[typeof ToolCard, ]} */ ;
        // @ts-ignore
        const __VLS_24 = __VLS_asFunctionalComponent(ToolCard, new ToolCard({
            tool: (tool),
        }));
        const __VLS_25 = __VLS_24({
            tool: (tool),
        }, ...__VLS_functionalComponentArgsRest(__VLS_24));
        var __VLS_22;
    }
    var __VLS_17;
}
var __VLS_7;
const __VLS_28 = {}.ACard;
/** @type {[typeof __VLS_components.ACard, typeof __VLS_components.aCard, typeof __VLS_components.ACard, typeof __VLS_components.aCard, ]} */ ;
// @ts-ignore
ACard;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    title: "常用收藏",
    ...{ class: "home__section" },
}));
const __VLS_30 = __VLS_29({
    title: "常用收藏",
    ...{ class: "home__section" },
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
const { default: __VLS_32 } = __VLS_31.slots;
if (!__VLS_ctx.pinnedTools.length) {
    // @ts-ignore
    [pinnedTools,];
    const __VLS_33 = {}.AEmpty;
    /** @type {[typeof __VLS_components.AEmpty, typeof __VLS_components.aEmpty, ]} */ ;
    // @ts-ignore
    AEmpty;
    // @ts-ignore
    const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
        description: "点击工具卡片中的“收藏”即可加入常用列表",
    }));
    const __VLS_35 = __VLS_34({
        description: "点击工具卡片中的“收藏”即可加入常用列表",
    }, ...__VLS_functionalComponentArgsRest(__VLS_34));
}
else {
    const __VLS_38 = {}.ARow;
    /** @type {[typeof __VLS_components.ARow, typeof __VLS_components.aRow, typeof __VLS_components.ARow, typeof __VLS_components.aRow, ]} */ ;
    // @ts-ignore
    ARow;
    // @ts-ignore
    const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({
        gutter: ([16, 16]),
    }));
    const __VLS_40 = __VLS_39({
        gutter: ([16, 16]),
    }, ...__VLS_functionalComponentArgsRest(__VLS_39));
    const { default: __VLS_42 } = __VLS_41.slots;
    for (const [tool] of __VLS_getVForSourceType((__VLS_ctx.pinnedTools))) {
        // @ts-ignore
        [pinnedTools,];
        const __VLS_43 = {}.ACol;
        /** @type {[typeof __VLS_components.ACol, typeof __VLS_components.aCol, typeof __VLS_components.ACol, typeof __VLS_components.aCol, ]} */ ;
        // @ts-ignore
        ACol;
        // @ts-ignore
        const __VLS_44 = __VLS_asFunctionalComponent(__VLS_43, new __VLS_43({
            key: (tool.id),
            xs: (24),
            sm: (12),
            md: (8),
            lg: (8),
        }));
        const __VLS_45 = __VLS_44({
            key: (tool.id),
            xs: (24),
            sm: (12),
            md: (8),
            lg: (8),
        }, ...__VLS_functionalComponentArgsRest(__VLS_44));
        const { default: __VLS_47 } = __VLS_46.slots;
        /** @type {[typeof ToolCard, ]} */ ;
        // @ts-ignore
        const __VLS_48 = __VLS_asFunctionalComponent(ToolCard, new ToolCard({
            tool: (tool),
        }));
        const __VLS_49 = __VLS_48({
            tool: (tool),
        }, ...__VLS_functionalComponentArgsRest(__VLS_48));
        var __VLS_46;
    }
    var __VLS_41;
}
var __VLS_31;
const __VLS_52 = {}.ACard;
/** @type {[typeof __VLS_components.ACard, typeof __VLS_components.aCard, typeof __VLS_components.ACard, typeof __VLS_components.aCard, ]} */ ;
// @ts-ignore
ACard;
// @ts-ignore
const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
    title: "推荐工具",
    ...{ class: "home__section" },
}));
const __VLS_54 = __VLS_53({
    title: "推荐工具",
    ...{ class: "home__section" },
}, ...__VLS_functionalComponentArgsRest(__VLS_53));
const { default: __VLS_56 } = __VLS_55.slots;
const __VLS_57 = {}.ARow;
/** @type {[typeof __VLS_components.ARow, typeof __VLS_components.aRow, typeof __VLS_components.ARow, typeof __VLS_components.aRow, ]} */ ;
// @ts-ignore
ARow;
// @ts-ignore
const __VLS_58 = __VLS_asFunctionalComponent(__VLS_57, new __VLS_57({
    gutter: ([16, 16]),
}));
const __VLS_59 = __VLS_58({
    gutter: ([16, 16]),
}, ...__VLS_functionalComponentArgsRest(__VLS_58));
const { default: __VLS_61 } = __VLS_60.slots;
for (const [tool] of __VLS_getVForSourceType((__VLS_ctx.recommendedTools))) {
    // @ts-ignore
    [recommendedTools,];
    const __VLS_62 = {}.ACol;
    /** @type {[typeof __VLS_components.ACol, typeof __VLS_components.aCol, typeof __VLS_components.ACol, typeof __VLS_components.aCol, ]} */ ;
    // @ts-ignore
    ACol;
    // @ts-ignore
    const __VLS_63 = __VLS_asFunctionalComponent(__VLS_62, new __VLS_62({
        key: (tool.id),
        xs: (24),
        sm: (12),
        md: (8),
        lg: (8),
    }));
    const __VLS_64 = __VLS_63({
        key: (tool.id),
        xs: (24),
        sm: (12),
        md: (8),
        lg: (8),
    }, ...__VLS_functionalComponentArgsRest(__VLS_63));
    const { default: __VLS_66 } = __VLS_65.slots;
    /** @type {[typeof ToolCard, ]} */ ;
    // @ts-ignore
    const __VLS_67 = __VLS_asFunctionalComponent(ToolCard, new ToolCard({
        tool: (tool),
    }));
    const __VLS_68 = __VLS_67({
        tool: (tool),
    }, ...__VLS_functionalComponentArgsRest(__VLS_67));
    var __VLS_65;
}
var __VLS_60;
var __VLS_55;
/** @type {__VLS_StyleScopedClasses['home']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['home__search']} */ ;
/** @type {__VLS_StyleScopedClasses['home__section']} */ ;
/** @type {__VLS_StyleScopedClasses['home__section']} */ ;
/** @type {__VLS_StyleScopedClasses['home__section']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
