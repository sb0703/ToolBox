import { useRoute, RouterLink, RouterView } from "vue-router";
import { useUiStore } from "@/stores/ui";
import { onMounted } from "vue";
const ui = useUiStore();
const route = useRoute();
onMounted(() => ui.init());
function handleThemeChange(val) {
    ui.toggleTheme(val);
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.ALayout;
/** @type {[typeof __VLS_components.ALayout, typeof __VLS_components.aLayout, typeof __VLS_components.ALayout, typeof __VLS_components.aLayout, ]} */ ;
// @ts-ignore
ALayout;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "shell" },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "shell" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
const { default: __VLS_5 } = __VLS_3.slots;
const __VLS_6 = {}.ALayoutHeader;
/** @type {[typeof __VLS_components.ALayoutHeader, typeof __VLS_components.aLayoutHeader, typeof __VLS_components.ALayoutHeader, typeof __VLS_components.aLayoutHeader, ]} */ ;
// @ts-ignore
ALayoutHeader;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
    ...{ class: "shell__header" },
}));
const __VLS_8 = __VLS_7({
    ...{ class: "shell__header" },
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
const { default: __VLS_10 } = __VLS_9.slots;
const __VLS_11 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
// @ts-ignore
RouterLink;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({
    to: "/home",
    ...{ class: "shell__logo" },
}));
const __VLS_13 = __VLS_12({
    to: "/home",
    ...{ class: "shell__logo" },
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
const { default: __VLS_15 } = __VLS_14.slots;
var __VLS_14;
const __VLS_16 = {}.AMenu;
/** @type {[typeof __VLS_components.AMenu, typeof __VLS_components.aMenu, typeof __VLS_components.AMenu, typeof __VLS_components.aMenu, ]} */ ;
// @ts-ignore
AMenu;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    mode: "horizontal",
    selectedKeys: ([__VLS_ctx.route.name]),
    ...{ class: "shell__nav" },
}));
const __VLS_18 = __VLS_17({
    mode: "horizontal",
    selectedKeys: ([__VLS_ctx.route.name]),
    ...{ class: "shell__nav" },
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
const { default: __VLS_20 } = __VLS_19.slots;
// @ts-ignore
[route,];
const __VLS_21 = {}.AMenuItem;
/** @type {[typeof __VLS_components.AMenuItem, typeof __VLS_components.aMenuItem, typeof __VLS_components.AMenuItem, typeof __VLS_components.aMenuItem, ]} */ ;
// @ts-ignore
AMenuItem;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
    key: "tools",
}));
const __VLS_23 = __VLS_22({
    key: "tools",
}, ...__VLS_functionalComponentArgsRest(__VLS_22));
const { default: __VLS_25 } = __VLS_24.slots;
const __VLS_26 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
// @ts-ignore
RouterLink;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({
    to: "/tools",
}));
const __VLS_28 = __VLS_27({
    to: "/tools",
}, ...__VLS_functionalComponentArgsRest(__VLS_27));
const { default: __VLS_30 } = __VLS_29.slots;
var __VLS_29;
var __VLS_24;
const __VLS_31 = {}.AMenuItem;
/** @type {[typeof __VLS_components.AMenuItem, typeof __VLS_components.aMenuItem, typeof __VLS_components.AMenuItem, typeof __VLS_components.aMenuItem, ]} */ ;
// @ts-ignore
AMenuItem;
// @ts-ignore
const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({
    key: "favorites",
}));
const __VLS_33 = __VLS_32({
    key: "favorites",
}, ...__VLS_functionalComponentArgsRest(__VLS_32));
const { default: __VLS_35 } = __VLS_34.slots;
const __VLS_36 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
// @ts-ignore
RouterLink;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
    to: "/favorites",
}));
const __VLS_38 = __VLS_37({
    to: "/favorites",
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
const { default: __VLS_40 } = __VLS_39.slots;
var __VLS_39;
var __VLS_34;
const __VLS_41 = {}.AMenuItem;
/** @type {[typeof __VLS_components.AMenuItem, typeof __VLS_components.aMenuItem, typeof __VLS_components.AMenuItem, typeof __VLS_components.aMenuItem, ]} */ ;
// @ts-ignore
AMenuItem;
// @ts-ignore
const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({
    key: "settings",
}));
const __VLS_43 = __VLS_42({
    key: "settings",
}, ...__VLS_functionalComponentArgsRest(__VLS_42));
const { default: __VLS_45 } = __VLS_44.slots;
const __VLS_46 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
// @ts-ignore
RouterLink;
// @ts-ignore
const __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({
    to: "/settings",
}));
const __VLS_48 = __VLS_47({
    to: "/settings",
}, ...__VLS_functionalComponentArgsRest(__VLS_47));
const { default: __VLS_50 } = __VLS_49.slots;
var __VLS_49;
var __VLS_44;
var __VLS_19;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "shell__theme" },
});
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "shell__themeLabel" },
});
const __VLS_51 = {}.ASegmented;
/** @type {[typeof __VLS_components.ASegmented, typeof __VLS_components.aSegmented, ]} */ ;
// @ts-ignore
ASegmented;
// @ts-ignore
const __VLS_52 = __VLS_asFunctionalComponent(__VLS_51, new __VLS_51({
    ...{ 'onChange': {} },
    value: (__VLS_ctx.ui.theme),
    options: ([
        { label: '浅色', value: 'light' },
        { label: '深色', value: 'dark' },
    ]),
}));
const __VLS_53 = __VLS_52({
    ...{ 'onChange': {} },
    value: (__VLS_ctx.ui.theme),
    options: ([
        { label: '浅色', value: 'light' },
        { label: '深色', value: 'dark' },
    ]),
}, ...__VLS_functionalComponentArgsRest(__VLS_52));
let __VLS_55;
let __VLS_56;
const __VLS_57 = ({ change: {} },
    { onChange: (__VLS_ctx.handleThemeChange) });
// @ts-ignore
[ui, handleThemeChange,];
var __VLS_54;
var __VLS_9;
const __VLS_59 = {}.ALayoutContent;
/** @type {[typeof __VLS_components.ALayoutContent, typeof __VLS_components.aLayoutContent, typeof __VLS_components.ALayoutContent, typeof __VLS_components.aLayoutContent, ]} */ ;
// @ts-ignore
ALayoutContent;
// @ts-ignore
const __VLS_60 = __VLS_asFunctionalComponent(__VLS_59, new __VLS_59({
    ...{ class: "shell__content" },
}));
const __VLS_61 = __VLS_60({
    ...{ class: "shell__content" },
}, ...__VLS_functionalComponentArgsRest(__VLS_60));
const { default: __VLS_63 } = __VLS_62.slots;
const __VLS_64 = {}.RouterView;
/** @type {[typeof __VLS_components.RouterView, ]} */ ;
// @ts-ignore
RouterView;
// @ts-ignore
const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({}));
const __VLS_66 = __VLS_65({}, ...__VLS_functionalComponentArgsRest(__VLS_65));
var __VLS_62;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['shell']} */ ;
/** @type {__VLS_StyleScopedClasses['shell__header']} */ ;
/** @type {__VLS_StyleScopedClasses['shell__logo']} */ ;
/** @type {__VLS_StyleScopedClasses['shell__nav']} */ ;
/** @type {__VLS_StyleScopedClasses['shell__theme']} */ ;
/** @type {__VLS_StyleScopedClasses['shell__themeLabel']} */ ;
/** @type {__VLS_StyleScopedClasses['shell__content']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
