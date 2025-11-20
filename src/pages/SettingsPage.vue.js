import { useUiStore } from "@/stores/ui";
import { useI18nStore } from "@/stores/i18n";
import { useUserStore } from "@/stores/user";
const ui = useUiStore();
const i18n = useI18nStore();
const user = useUserStore();
function onThemeChange(val) {
    ui.toggleTheme(val);
    user.profile.theme = val;
    user.persist();
}
function onLocaleChange(val) {
    i18n.setLocale(val);
    user.profile.locale = val;
    user.persist();
}
function resetProfile() {
    user.resetProfile();
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
    ...{ class: "settings container" },
});
const __VLS_0 = {}.ARow;
/** @type {[typeof __VLS_components.ARow, typeof __VLS_components.aRow, typeof __VLS_components.ARow, typeof __VLS_components.aRow, ]} */ ;
// @ts-ignore
ARow;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    gutter: ([16, 16]),
}));
const __VLS_2 = __VLS_1({
    gutter: ([16, 16]),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_4 } = __VLS_3.slots;
const __VLS_5 = {}.ACol;
/** @type {[typeof __VLS_components.ACol, typeof __VLS_components.aCol, typeof __VLS_components.ACol, typeof __VLS_components.aCol, ]} */ ;
// @ts-ignore
ACol;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    xs: (24),
    md: (12),
}));
const __VLS_7 = __VLS_6({
    xs: (24),
    md: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
const { default: __VLS_9 } = __VLS_8.slots;
const __VLS_10 = {}.ACard;
/** @type {[typeof __VLS_components.ACard, typeof __VLS_components.aCard, typeof __VLS_components.ACard, typeof __VLS_components.aCard, ]} */ ;
// @ts-ignore
ACard;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
    title: "主题设置",
}));
const __VLS_12 = __VLS_11({
    title: "主题设置",
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
const { default: __VLS_14 } = __VLS_13.slots;
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
    ...{ class: "settings__desc" },
});
const __VLS_15 = {}.ASegmented;
/** @type {[typeof __VLS_components.ASegmented, typeof __VLS_components.aSegmented, ]} */ ;
// @ts-ignore
ASegmented;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
    ...{ 'onChange': {} },
    value: (__VLS_ctx.ui.theme),
    options: ([
        { label: '浅色', value: 'light' },
        { label: '深色', value: 'dark' },
    ]),
}));
const __VLS_17 = __VLS_16({
    ...{ 'onChange': {} },
    value: (__VLS_ctx.ui.theme),
    options: ([
        { label: '浅色', value: 'light' },
        { label: '深色', value: 'dark' },
    ]),
}, ...__VLS_functionalComponentArgsRest(__VLS_16));
let __VLS_19;
let __VLS_20;
const __VLS_21 = ({ change: {} },
    { onChange: (__VLS_ctx.onThemeChange) });
// @ts-ignore
[ui, onThemeChange,];
var __VLS_18;
var __VLS_13;
var __VLS_8;
const __VLS_23 = {}.ACol;
/** @type {[typeof __VLS_components.ACol, typeof __VLS_components.aCol, typeof __VLS_components.ACol, typeof __VLS_components.aCol, ]} */ ;
// @ts-ignore
ACol;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23({
    xs: (24),
    md: (12),
}));
const __VLS_25 = __VLS_24({
    xs: (24),
    md: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_24));
const { default: __VLS_27 } = __VLS_26.slots;
const __VLS_28 = {}.ACard;
/** @type {[typeof __VLS_components.ACard, typeof __VLS_components.aCard, typeof __VLS_components.ACard, typeof __VLS_components.aCard, ]} */ ;
// @ts-ignore
ACard;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    title: "语言",
}));
const __VLS_30 = __VLS_29({
    title: "语言",
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
const { default: __VLS_32 } = __VLS_31.slots;
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
    ...{ class: "settings__desc" },
});
const __VLS_33 = {}.ASegmented;
/** @type {[typeof __VLS_components.ASegmented, typeof __VLS_components.aSegmented, ]} */ ;
// @ts-ignore
ASegmented;
// @ts-ignore
const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
    ...{ 'onChange': {} },
    value: (__VLS_ctx.i18n.locale),
    options: ([
        { label: '中文', value: 'zh-CN' },
        { label: 'English', value: 'en-US' },
    ]),
}));
const __VLS_35 = __VLS_34({
    ...{ 'onChange': {} },
    value: (__VLS_ctx.i18n.locale),
    options: ([
        { label: '中文', value: 'zh-CN' },
        { label: 'English', value: 'en-US' },
    ]),
}, ...__VLS_functionalComponentArgsRest(__VLS_34));
let __VLS_37;
let __VLS_38;
const __VLS_39 = ({ change: {} },
    { onChange: (__VLS_ctx.onLocaleChange) });
// @ts-ignore
[i18n, onLocaleChange,];
var __VLS_36;
var __VLS_31;
var __VLS_26;
var __VLS_3;
const __VLS_41 = {}.ACard;
/** @type {[typeof __VLS_components.ACard, typeof __VLS_components.aCard, typeof __VLS_components.ACard, typeof __VLS_components.aCard, ]} */ ;
// @ts-ignore
ACard;
// @ts-ignore
const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({
    title: "数据管理",
    ...{ class: "settings__section" },
}));
const __VLS_43 = __VLS_42({
    title: "数据管理",
    ...{ class: "settings__section" },
}, ...__VLS_functionalComponentArgsRest(__VLS_42));
const { default: __VLS_45 } = __VLS_44.slots;
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
    ...{ class: "settings__desc" },
});
const __VLS_46 = {}.APopconfirm;
/** @type {[typeof __VLS_components.APopconfirm, typeof __VLS_components.aPopconfirm, typeof __VLS_components.APopconfirm, typeof __VLS_components.aPopconfirm, ]} */ ;
// @ts-ignore
APopconfirm;
// @ts-ignore
const __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({
    ...{ 'onConfirm': {} },
    title: "清空本地数据？",
    okText: "清空",
    cancelText: "取消",
}));
const __VLS_48 = __VLS_47({
    ...{ 'onConfirm': {} },
    title: "清空本地数据？",
    okText: "清空",
    cancelText: "取消",
}, ...__VLS_functionalComponentArgsRest(__VLS_47));
let __VLS_50;
let __VLS_51;
const __VLS_52 = ({ confirm: {} },
    { onConfirm: (__VLS_ctx.resetProfile) });
const { default: __VLS_53 } = __VLS_49.slots;
// @ts-ignore
[resetProfile,];
const __VLS_54 = {}.AButton;
/** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
// @ts-ignore
AButton;
// @ts-ignore
const __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54({
    danger: true,
}));
const __VLS_56 = __VLS_55({
    danger: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_55));
const { default: __VLS_58 } = __VLS_57.slots;
var __VLS_57;
var __VLS_49;
var __VLS_44;
/** @type {__VLS_StyleScopedClasses['settings']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['settings__desc']} */ ;
/** @type {__VLS_StyleScopedClasses['settings__desc']} */ ;
/** @type {__VLS_StyleScopedClasses['settings__section']} */ ;
/** @type {__VLS_StyleScopedClasses['settings__desc']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
