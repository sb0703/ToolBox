import { computed } from "vue";
const props = defineProps();
const emit = defineEmits(["update:value"]);
const val = computed({
    get: () => props.value,
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
const __VLS_6 = {}.ASelect;
/** @type {[typeof __VLS_components.ASelect, typeof __VLS_components.aSelect, ]} */ ;
// @ts-ignore
ASelect;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
    value: (__VLS_ctx.val),
    options: (__VLS_ctx.field.options),
    allowClear: true,
}));
const __VLS_8 = __VLS_7({
    value: (__VLS_ctx.val),
    options: (__VLS_ctx.field.options),
    allowClear: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
// @ts-ignore
[field, val,];
var __VLS_3;
const __VLS_export = (await import('vue')).defineComponent({
    emits: {},
    __typeProps: {},
});
export default {};
