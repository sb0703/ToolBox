import { computed } from "vue";
const props = defineProps();
const emit = defineEmits(["update:value"]);
const checked = computed({
    get: () => props.value ?? props.field.default ?? false,
    set: (v) => emit("update:value", v),
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
AFormItem;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    label: (__VLS_ctx.field.label),
}));
const __VLS_2 = __VLS_1({
    label: (__VLS_ctx.field.label),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
const { default: __VLS_5 } = __VLS_3.slots;
// @ts-ignore
[field,];
const __VLS_6 = {}.ASwitch;
/** @type {[typeof __VLS_components.ASwitch, typeof __VLS_components.aSwitch, ]} */ ;
// @ts-ignore
ASwitch;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
    checked: (__VLS_ctx.checked),
}));
const __VLS_8 = __VLS_7({
    checked: (__VLS_ctx.checked),
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
// @ts-ignore
[checked,];
var __VLS_3;
const __VLS_export = (await import('vue')).defineComponent({
    emits: {},
    __typeProps: {},
});
export default {};
