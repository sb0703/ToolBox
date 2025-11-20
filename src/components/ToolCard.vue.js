import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import { computed } from "vue";
const router = useRouter();
const props = defineProps();
const user = useUserStore();
const isPinned = computed(() => user.profile.pinnedToolIds.includes(props.tool.id));
const togglePin = () => user.togglePin(props.tool.id);
function goDetail() {
    router.push({ name: "tool-detail", params: { toolId: props.tool.id } });
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.ACard;
/** @type {[typeof __VLS_components.ACard, typeof __VLS_components.aCard, typeof __VLS_components.ACard, typeof __VLS_components.aCard, ]} */ ;
// @ts-ignore
ACard;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    title: (__VLS_ctx.tool.name),
    hoverable: (true),
    bordered: (true),
    ...{ class: "tcard" },
}));
const __VLS_2 = __VLS_1({
    title: (__VLS_ctx.tool.name),
    hoverable: (true),
    bordered: (true),
    ...{ class: "tcard" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
const { default: __VLS_5 } = __VLS_3.slots;
// @ts-ignore
[tool,];
{
    const { extra: __VLS_6 } = __VLS_3.slots;
    for (const [tg] of __VLS_getVForSourceType((__VLS_ctx.tool.tags))) {
        // @ts-ignore
        [tool,];
        const __VLS_7 = {}.ATag;
        /** @type {[typeof __VLS_components.ATag, typeof __VLS_components.aTag, typeof __VLS_components.ATag, typeof __VLS_components.aTag, ]} */ ;
        // @ts-ignore
        ATag;
        // @ts-ignore
        const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({
            key: (tg),
            ...{ class: "tcard__tag" },
        }));
        const __VLS_9 = __VLS_8({
            key: (tg),
            ...{ class: "tcard__tag" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_8));
        const { default: __VLS_11 } = __VLS_10.slots;
        (tg);
        var __VLS_10;
    }
}
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
    ...{ class: "tcard__desc" },
});
(__VLS_ctx.tool.summary);
// @ts-ignore
[tool,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "tcard__actions" },
});
const __VLS_12 = {}.AButton;
/** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
// @ts-ignore
AButton;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    ...{ 'onClick': {} },
    type: "primary",
}));
const __VLS_14 = __VLS_13({
    ...{ 'onClick': {} },
    type: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
let __VLS_16;
let __VLS_17;
const __VLS_18 = ({ click: {} },
    { onClick: (__VLS_ctx.goDetail) });
const { default: __VLS_19 } = __VLS_15.slots;
// @ts-ignore
[goDetail,];
var __VLS_15;
const __VLS_20 = {}.AButton;
/** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
// @ts-ignore
AButton;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    ...{ 'onClick': {} },
}));
const __VLS_22 = __VLS_21({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
let __VLS_24;
let __VLS_25;
const __VLS_26 = ({ click: {} },
    { onClick: (__VLS_ctx.togglePin) });
const { default: __VLS_27 } = __VLS_23.slots;
// @ts-ignore
[togglePin,];
(__VLS_ctx.isPinned ? "取消收藏" : "收藏");
// @ts-ignore
[isPinned,];
var __VLS_23;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['tcard']} */ ;
/** @type {__VLS_StyleScopedClasses['tcard__tag']} */ ;
/** @type {__VLS_StyleScopedClasses['tcard__desc']} */ ;
/** @type {__VLS_StyleScopedClasses['tcard__actions']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
