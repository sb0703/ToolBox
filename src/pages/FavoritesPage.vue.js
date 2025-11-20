import { computed, onMounted, reactive, ref, watch } from "vue";
import { useCatalogStore } from "@/stores/catalog";
import { useUserStore } from "@/stores/user";
import ToolCard from "@/components/ToolCard.vue";
const catalog = useCatalogStore();
const user = useUserStore();
const newGroupName = ref("");
const groupSelections = reactive({});
const localNames = reactive({});
onMounted(() => {
    catalog.loadMock();
    syncNames();
});
watch(() => user.profile.favorites.map((g) => `${g.id}:${g.name}`).join("|"), () => syncNames());
const favoriteGroups = computed(() => user.profile.favorites);
const pinnedTools = computed(() => user.profile.pinnedToolIds
    .map((id) => catalog.tools.find((t) => t.id === id))
    .filter((tool) => Boolean(tool)));
function syncNames() {
    favoriteGroups.value.forEach((group) => {
        localNames[group.id] = group.name;
        if (!(group.id in groupSelections))
            groupSelections[group.id] = null;
    });
}
function createGroup() {
    const name = newGroupName.value.trim();
    if (!name)
        return;
    const id = user.createFavoriteGroup(name);
    localNames[id] = name;
    groupSelections[id] = null;
    newGroupName.value = "";
}
function renameGroup(id) {
    const name = (localNames[id] || "").trim();
    if (!name) {
        localNames[id] = favoriteGroups.value.find((g) => g.id === id)?.name || "";
        return;
    }
    user.renameFavoriteGroup(id, name);
}
function removeGroup(id) {
    delete groupSelections[id];
    delete localNames[id];
    user.deleteFavoriteGroup(id);
}
function groupOptions(group) {
    const used = new Set(group.toolIds);
    return catalog.tools
        .filter((tool) => !used.has(tool.id))
        .map((tool) => ({
        value: tool.id,
        label: `${tool.name} · ${tool.summary}`,
    }));
}
function groupTools(group) {
    return group.toolIds
        .map((id) => catalog.tools.find((tool) => tool.id === id))
        .filter((tool) => Boolean(tool));
}
function onAddTool(groupId, toolId) {
    if (!toolId)
        return;
    user.addToolToFavorite(groupId, toolId);
    groupSelections[groupId] = null;
}
function removeToolFromGroup(groupId, toolId) {
    user.removeToolFromFavorite(groupId, toolId);
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "favorites container" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "favorites__head" },
});
__VLS_asFunctionalElement(__VLS_elements.h1, __VLS_elements.h1)({});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "favorites__create" },
});
const __VLS_0 = {}.AInput;
/** @type {[typeof __VLS_components.AInput, typeof __VLS_components.aInput, ]} */ ;
// @ts-ignore
AInput;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onPressEnter': {} },
    value: (__VLS_ctx.newGroupName),
    placeholder: "新的分组名称",
    ...{ class: "favorites__nameInput" },
}));
const __VLS_2 = __VLS_1({
    ...{ 'onPressEnter': {} },
    value: (__VLS_ctx.newGroupName),
    placeholder: "新的分组名称",
    ...{ class: "favorites__nameInput" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
const __VLS_6 = ({ pressEnter: {} },
    { onPressEnter: (__VLS_ctx.createGroup) });
// @ts-ignore
[newGroupName, createGroup,];
var __VLS_3;
const __VLS_8 = {}.AButton;
/** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
// @ts-ignore
AButton;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    ...{ 'onClick': {} },
    type: "primary",
}));
const __VLS_10 = __VLS_9({
    ...{ 'onClick': {} },
    type: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_12;
let __VLS_13;
const __VLS_14 = ({ click: {} },
    { onClick: (__VLS_ctx.createGroup) });
const { default: __VLS_15 } = __VLS_11.slots;
// @ts-ignore
[createGroup,];
var __VLS_11;
const __VLS_16 = {}.ACard;
/** @type {[typeof __VLS_components.ACard, typeof __VLS_components.aCard, typeof __VLS_components.ACard, typeof __VLS_components.aCard, ]} */ ;
// @ts-ignore
ACard;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    title: "置顶工具",
    ...{ class: "favorites__section" },
}));
const __VLS_18 = __VLS_17({
    title: "置顶工具",
    ...{ class: "favorites__section" },
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
const { default: __VLS_20 } = __VLS_19.slots;
if (!__VLS_ctx.pinnedTools.length) {
    // @ts-ignore
    [pinnedTools,];
    const __VLS_21 = {}.AEmpty;
    /** @type {[typeof __VLS_components.AEmpty, typeof __VLS_components.aEmpty, ]} */ ;
    // @ts-ignore
    AEmpty;
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
        description: "暂无收藏，去工具页点击“收藏”吧",
    }));
    const __VLS_23 = __VLS_22({
        description: "暂无收藏，去工具页点击“收藏”吧",
    }, ...__VLS_functionalComponentArgsRest(__VLS_22));
}
else {
    const __VLS_26 = {}.ARow;
    /** @type {[typeof __VLS_components.ARow, typeof __VLS_components.aRow, typeof __VLS_components.ARow, typeof __VLS_components.aRow, ]} */ ;
    // @ts-ignore
    ARow;
    // @ts-ignore
    const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({
        gutter: ([16, 16]),
    }));
    const __VLS_28 = __VLS_27({
        gutter: ([16, 16]),
    }, ...__VLS_functionalComponentArgsRest(__VLS_27));
    const { default: __VLS_30 } = __VLS_29.slots;
    for (const [tool] of __VLS_getVForSourceType((__VLS_ctx.pinnedTools))) {
        // @ts-ignore
        [pinnedTools,];
        const __VLS_31 = {}.ACol;
        /** @type {[typeof __VLS_components.ACol, typeof __VLS_components.aCol, typeof __VLS_components.ACol, typeof __VLS_components.aCol, ]} */ ;
        // @ts-ignore
        ACol;
        // @ts-ignore
        const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({
            key: (tool.id),
            xs: (24),
            sm: (12),
            md: (8),
            lg: (8),
        }));
        const __VLS_33 = __VLS_32({
            key: (tool.id),
            xs: (24),
            sm: (12),
            md: (8),
            lg: (8),
        }, ...__VLS_functionalComponentArgsRest(__VLS_32));
        const { default: __VLS_35 } = __VLS_34.slots;
        /** @type {[typeof ToolCard, ]} */ ;
        // @ts-ignore
        const __VLS_36 = __VLS_asFunctionalComponent(ToolCard, new ToolCard({
            tool: (tool),
        }));
        const __VLS_37 = __VLS_36({
            tool: (tool),
        }, ...__VLS_functionalComponentArgsRest(__VLS_36));
        var __VLS_34;
    }
    var __VLS_29;
}
var __VLS_19;
for (const [group] of __VLS_getVForSourceType((__VLS_ctx.favoriteGroups))) {
    // @ts-ignore
    [favoriteGroups,];
    const __VLS_40 = {}.ACard;
    /** @type {[typeof __VLS_components.ACard, typeof __VLS_components.aCard, typeof __VLS_components.ACard, typeof __VLS_components.aCard, ]} */ ;
    // @ts-ignore
    ACard;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
        key: (group.id),
        ...{ class: "favorites__section" },
    }));
    const __VLS_42 = __VLS_41({
        key: (group.id),
        ...{ class: "favorites__section" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_41));
    const { default: __VLS_44 } = __VLS_43.slots;
    {
        const { title: __VLS_45 } = __VLS_43.slots;
        const __VLS_46 = {}.AInput;
        /** @type {[typeof __VLS_components.AInput, typeof __VLS_components.aInput, ]} */ ;
        // @ts-ignore
        AInput;
        // @ts-ignore
        const __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({
            ...{ 'onBlur': {} },
            ...{ 'onPressEnter': {} },
            value: (__VLS_ctx.localNames[group.id]),
            ...{ class: "favorites__groupName" },
        }));
        const __VLS_48 = __VLS_47({
            ...{ 'onBlur': {} },
            ...{ 'onPressEnter': {} },
            value: (__VLS_ctx.localNames[group.id]),
            ...{ class: "favorites__groupName" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_47));
        let __VLS_50;
        let __VLS_51;
        const __VLS_52 = ({ blur: {} },
            { onBlur: (...[$event]) => {
                    __VLS_ctx.renameGroup(group.id);
                    // @ts-ignore
                    [localNames, renameGroup,];
                } });
        const __VLS_53 = ({ pressEnter: {} },
            { onPressEnter: (...[$event]) => {
                    __VLS_ctx.renameGroup(group.id);
                    // @ts-ignore
                    [renameGroup,];
                } });
        var __VLS_49;
    }
    {
        const { extra: __VLS_55 } = __VLS_43.slots;
        const __VLS_56 = {}.ASpace;
        /** @type {[typeof __VLS_components.ASpace, typeof __VLS_components.aSpace, typeof __VLS_components.ASpace, typeof __VLS_components.aSpace, ]} */ ;
        // @ts-ignore
        ASpace;
        // @ts-ignore
        const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({}));
        const __VLS_58 = __VLS_57({}, ...__VLS_functionalComponentArgsRest(__VLS_57));
        const { default: __VLS_60 } = __VLS_59.slots;
        const __VLS_61 = {}.ASelect;
        /** @type {[typeof __VLS_components.ASelect, typeof __VLS_components.aSelect, ]} */ ;
        // @ts-ignore
        ASelect;
        // @ts-ignore
        const __VLS_62 = __VLS_asFunctionalComponent(__VLS_61, new __VLS_61({
            ...{ 'onChange': {} },
            value: (__VLS_ctx.groupSelections[group.id]),
            placeholder: "添加工具",
            options: (__VLS_ctx.groupOptions(group)),
            showSearch: true,
            allowClear: true,
            ...{ style: {} },
        }));
        const __VLS_63 = __VLS_62({
            ...{ 'onChange': {} },
            value: (__VLS_ctx.groupSelections[group.id]),
            placeholder: "添加工具",
            options: (__VLS_ctx.groupOptions(group)),
            showSearch: true,
            allowClear: true,
            ...{ style: {} },
        }, ...__VLS_functionalComponentArgsRest(__VLS_62));
        let __VLS_65;
        let __VLS_66;
        const __VLS_67 = ({ change: {} },
            { onChange: ((val) => __VLS_ctx.onAddTool(group.id, val)) });
        // @ts-ignore
        [groupSelections, groupOptions, onAddTool,];
        var __VLS_64;
        const __VLS_69 = {}.APopconfirm;
        /** @type {[typeof __VLS_components.APopconfirm, typeof __VLS_components.aPopconfirm, typeof __VLS_components.APopconfirm, typeof __VLS_components.aPopconfirm, ]} */ ;
        // @ts-ignore
        APopconfirm;
        // @ts-ignore
        const __VLS_70 = __VLS_asFunctionalComponent(__VLS_69, new __VLS_69({
            ...{ 'onConfirm': {} },
            title: "删除该分组？",
            okText: "删除",
            cancelText: "取消",
        }));
        const __VLS_71 = __VLS_70({
            ...{ 'onConfirm': {} },
            title: "删除该分组？",
            okText: "删除",
            cancelText: "取消",
        }, ...__VLS_functionalComponentArgsRest(__VLS_70));
        let __VLS_73;
        let __VLS_74;
        const __VLS_75 = ({ confirm: {} },
            { onConfirm: (...[$event]) => {
                    __VLS_ctx.removeGroup(group.id);
                    // @ts-ignore
                    [removeGroup,];
                } });
        const { default: __VLS_76 } = __VLS_72.slots;
        const __VLS_77 = {}.AButton;
        /** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
        // @ts-ignore
        AButton;
        // @ts-ignore
        const __VLS_78 = __VLS_asFunctionalComponent(__VLS_77, new __VLS_77({
            type: "text",
            danger: true,
        }));
        const __VLS_79 = __VLS_78({
            type: "text",
            danger: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_78));
        const { default: __VLS_81 } = __VLS_80.slots;
        var __VLS_80;
        var __VLS_72;
        var __VLS_59;
    }
    if (!__VLS_ctx.groupTools(group).length) {
        // @ts-ignore
        [groupTools,];
        const __VLS_82 = {}.AEmpty;
        /** @type {[typeof __VLS_components.AEmpty, typeof __VLS_components.aEmpty, ]} */ ;
        // @ts-ignore
        AEmpty;
        // @ts-ignore
        const __VLS_83 = __VLS_asFunctionalComponent(__VLS_82, new __VLS_82({
            description: "分组里还没有工具",
        }));
        const __VLS_84 = __VLS_83({
            description: "分组里还没有工具",
        }, ...__VLS_functionalComponentArgsRest(__VLS_83));
    }
    else {
        const __VLS_87 = {}.ARow;
        /** @type {[typeof __VLS_components.ARow, typeof __VLS_components.aRow, typeof __VLS_components.ARow, typeof __VLS_components.aRow, ]} */ ;
        // @ts-ignore
        ARow;
        // @ts-ignore
        const __VLS_88 = __VLS_asFunctionalComponent(__VLS_87, new __VLS_87({
            gutter: ([16, 16]),
        }));
        const __VLS_89 = __VLS_88({
            gutter: ([16, 16]),
        }, ...__VLS_functionalComponentArgsRest(__VLS_88));
        const { default: __VLS_91 } = __VLS_90.slots;
        for (const [tool] of __VLS_getVForSourceType((__VLS_ctx.groupTools(group)))) {
            // @ts-ignore
            [groupTools,];
            const __VLS_92 = {}.ACol;
            /** @type {[typeof __VLS_components.ACol, typeof __VLS_components.aCol, typeof __VLS_components.ACol, typeof __VLS_components.aCol, ]} */ ;
            // @ts-ignore
            ACol;
            // @ts-ignore
            const __VLS_93 = __VLS_asFunctionalComponent(__VLS_92, new __VLS_92({
                key: (tool.id),
                xs: (24),
                sm: (12),
                md: (8),
                lg: (8),
            }));
            const __VLS_94 = __VLS_93({
                key: (tool.id),
                xs: (24),
                sm: (12),
                md: (8),
                lg: (8),
            }, ...__VLS_functionalComponentArgsRest(__VLS_93));
            const { default: __VLS_96 } = __VLS_95.slots;
            /** @type {[typeof ToolCard, ]} */ ;
            // @ts-ignore
            const __VLS_97 = __VLS_asFunctionalComponent(ToolCard, new ToolCard({
                tool: (tool),
            }));
            const __VLS_98 = __VLS_97({
                tool: (tool),
            }, ...__VLS_functionalComponentArgsRest(__VLS_97));
            const __VLS_101 = {}.AButton;
            /** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
            // @ts-ignore
            AButton;
            // @ts-ignore
            const __VLS_102 = __VLS_asFunctionalComponent(__VLS_101, new __VLS_101({
                ...{ 'onClick': {} },
                type: "text",
                danger: true,
                block: true,
            }));
            const __VLS_103 = __VLS_102({
                ...{ 'onClick': {} },
                type: "text",
                danger: true,
                block: true,
            }, ...__VLS_functionalComponentArgsRest(__VLS_102));
            let __VLS_105;
            let __VLS_106;
            const __VLS_107 = ({ click: {} },
                { onClick: (...[$event]) => {
                        if (!!(!__VLS_ctx.groupTools(group).length))
                            return;
                        __VLS_ctx.removeToolFromGroup(group.id, tool.id);
                        // @ts-ignore
                        [removeToolFromGroup,];
                    } });
            const { default: __VLS_108 } = __VLS_104.slots;
            var __VLS_104;
            var __VLS_95;
        }
        var __VLS_90;
    }
    var __VLS_43;
}
/** @type {__VLS_StyleScopedClasses['favorites']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['favorites__head']} */ ;
/** @type {__VLS_StyleScopedClasses['favorites__create']} */ ;
/** @type {__VLS_StyleScopedClasses['favorites__nameInput']} */ ;
/** @type {__VLS_StyleScopedClasses['favorites__section']} */ ;
/** @type {__VLS_StyleScopedClasses['favorites__section']} */ ;
/** @type {__VLS_StyleScopedClasses['favorites__groupName']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
