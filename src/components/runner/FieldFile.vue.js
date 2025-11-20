const props = defineProps();
const emit = defineEmits(["update:value"]);
function onChange(e) {
    const file = e.target.files?.[0] ?? null;
    emit("update:value", file);
}
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
__VLS_asFunctionalElement(__VLS_elements.input)({
    ...{ onChange: (__VLS_ctx.onChange) },
    ...{ class: "file" },
    type: "file",
    accept: (__VLS_ctx.field.accept),
});
// @ts-ignore
[field, onChange,];
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['file']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    emits: {},
    __typeProps: {},
});
export default {};
