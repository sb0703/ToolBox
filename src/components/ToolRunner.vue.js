import { computed, reactive, ref } from "vue";
import { useHistoryStore } from "@/stores/history";
import { copyText } from "@/utils/clipboard";
import { downloadText } from "@/utils/download";
import { message } from "ant-design-vue";
import { useI18nStore } from "@/stores/i18n";
const props = defineProps();
const t = useI18nStore().t;
const hist = useHistoryStore();
// 输出控制
const wrap = ref(true);
const fontSize = ref(13);
const fontSizeOpts = [12, 13, 14, 16, 18].map((v) => ({
    label: String(v),
    value: v,
}));
const error = ref(null);
const form = reactive({});
const outputs = reactive({});
// 运行
function clearOutputs() {
    Object.keys(outputs).forEach((k) => delete outputs[k]);
    error.value = null;
}
function reset() {
    Object.keys(form).forEach((k) => delete form[k]);
    clearOutputs();
}
// 历史
const selectedHistory = ref(null);
const historyOptions = computed(() => props.toolId
    ? hist.list(props.toolId).map((h) => ({
        value: String(h.ts),
        label: new Date(h.ts).toLocaleString(),
        payload: h.payload,
    }))
    : []);
function applyHistory() {
    const item = historyOptions.value.find((o) => o.value === selectedHistory.value);
    if (!item)
        return;
    Object.keys(form).forEach((k) => delete form[k]);
    Object.assign(form, JSON.parse(JSON.stringify(item.payload || {})));
}
function clearHistory() {
    if (props.toolId)
        hist.clear(props.toolId);
    selectedHistory.value = null;
}
function copy(key) {
    copyText(String(outputs[key] ?? ""));
    message.success("复制成功");
}
function download(key) {
    downloadText(`${props.toolId || "output"}-${key}.txt`, String(outputs[key] ?? ""));
}
async function run(actionKey) {
    error.value = null;
    if (props.validator) {
        const msg = props.validator(form, actionKey);
        if (msg) {
            error.value = msg;
            return;
        }
    }
    const res = await props.onRun?.(actionKey, form);
    if (!res)
        return;
    if (!res.ok) {
        error.value = res.error || "执行失败";
        return;
    }
    // 持久化本次输入
    if (props.toolId)
        hist.push(props.toolId, JSON.parse(JSON.stringify(form)));
    Object.assign(outputs, res.outputs);
}
// 表格输出适配：支持 [{...}] 或 {columns,data}
function tableColumns(key) {
    const val = outputs[key];
    if (Array.isArray(val)) {
        const first = val[0] || {};
        return Object.keys(first).map((k) => ({ title: k, dataIndex: k }));
    }
    if (val && val.columns)
        return val.columns;
    return [];
}
function tableData(key) {
    const val = outputs[key];
    if (Array.isArray(val))
        return val;
    if (val && val.data)
        return val.data;
    return [];
}
// 输入控件映射
const inputMap = {
    text: (await import("@/components/runner/FieldText.vue")).default,
    textarea: (await import("@/components/runner/FieldTextarea.vue")).default,
    select: (await import("@/components/runner/FieldSelect.vue")).default,
    switch: (await import("@/components/runner/FieldSwitch.vue")).default,
    file: (await import("@/components/runner/FieldFile.vue")).default,
};
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
/** @type {__VLS_StyleScopedClasses['ant-btn']} */ ;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "runner" },
});
const __VLS_0 = {}.AForm;
/** @type {[typeof __VLS_components.AForm, typeof __VLS_components.aForm, typeof __VLS_components.AForm, typeof __VLS_components.aForm, ]} */ ;
// @ts-ignore
AForm;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onSubmit': {} },
    layout: "vertical",
}));
const __VLS_2 = __VLS_1({
    ...{ 'onSubmit': {} },
    layout: "vertical",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
const __VLS_6 = ({ submit: {} },
    { onSubmit: () => { } });
const { default: __VLS_7 } = __VLS_3.slots;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "runner__bar" },
    'aria-label': "History Bar",
});
const __VLS_8 = {}.ASelect;
/** @type {[typeof __VLS_components.ASelect, typeof __VLS_components.aSelect, typeof __VLS_components.ASelect, typeof __VLS_components.aSelect, ]} */ ;
// @ts-ignore
ASelect;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    ...{ class: "runner__history" },
    value: (__VLS_ctx.selectedHistory),
    options: (__VLS_ctx.historyOptions),
    placeholder: (__VLS_ctx.t('history_input')),
    allowClear: true,
}));
const __VLS_10 = __VLS_9({
    ...{ class: "runner__history" },
    value: (__VLS_ctx.selectedHistory),
    options: (__VLS_ctx.historyOptions),
    placeholder: (__VLS_ctx.t('history_input')),
    allowClear: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
const { default: __VLS_12 } = __VLS_11.slots;
// @ts-ignore
[selectedHistory, historyOptions, t,];
{
    const { option: __VLS_13 } = __VLS_11.slots;
    const [opt] = __VLS_getSlotParameters(__VLS_13);
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
    (opt.label);
}
var __VLS_11;
const __VLS_14 = {}.ASpace;
/** @type {[typeof __VLS_components.ASpace, typeof __VLS_components.aSpace, typeof __VLS_components.ASpace, typeof __VLS_components.aSpace, ]} */ ;
// @ts-ignore
ASpace;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({}));
const __VLS_16 = __VLS_15({}, ...__VLS_functionalComponentArgsRest(__VLS_15));
const { default: __VLS_18 } = __VLS_17.slots;
const __VLS_19 = {}.AButton;
/** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
// @ts-ignore
AButton;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({
    ...{ 'onClick': {} },
    disabled: (!__VLS_ctx.selectedHistory),
}));
const __VLS_21 = __VLS_20({
    ...{ 'onClick': {} },
    disabled: (!__VLS_ctx.selectedHistory),
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
let __VLS_23;
let __VLS_24;
const __VLS_25 = ({ click: {} },
    { onClick: (__VLS_ctx.applyHistory) });
const { default: __VLS_26 } = __VLS_22.slots;
// @ts-ignore
[selectedHistory, applyHistory,];
(__VLS_ctx.t("load"));
// @ts-ignore
[t,];
var __VLS_22;
const __VLS_27 = {}.APopconfirm;
/** @type {[typeof __VLS_components.APopconfirm, typeof __VLS_components.aPopconfirm, typeof __VLS_components.APopconfirm, typeof __VLS_components.aPopconfirm, ]} */ ;
// @ts-ignore
APopconfirm;
// @ts-ignore
const __VLS_28 = __VLS_asFunctionalComponent(__VLS_27, new __VLS_27({
    ...{ 'onConfirm': {} },
    title: (__VLS_ctx.t('confirm_clear_history')),
    okText: (__VLS_ctx.t('clear')),
    cancelText: (__VLS_ctx.t('cancel')),
}));
const __VLS_29 = __VLS_28({
    ...{ 'onConfirm': {} },
    title: (__VLS_ctx.t('confirm_clear_history')),
    okText: (__VLS_ctx.t('clear')),
    cancelText: (__VLS_ctx.t('cancel')),
}, ...__VLS_functionalComponentArgsRest(__VLS_28));
let __VLS_31;
let __VLS_32;
const __VLS_33 = ({ confirm: {} },
    { onConfirm: (__VLS_ctx.clearHistory) });
const { default: __VLS_34 } = __VLS_30.slots;
// @ts-ignore
[t, t, t, clearHistory,];
const __VLS_35 = {}.AButton;
/** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
// @ts-ignore
AButton;
// @ts-ignore
const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({
    danger: true,
}));
const __VLS_37 = __VLS_36({
    danger: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_36));
const { default: __VLS_39 } = __VLS_38.slots;
(__VLS_ctx.t("clear_history"));
// @ts-ignore
[t,];
var __VLS_38;
var __VLS_30;
var __VLS_17;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "runner__inputs" },
    'aria-label': "Inputs",
});
for (const [field, i] of __VLS_getVForSourceType((__VLS_ctx.schema.inputs))) {
    // @ts-ignore
    [schema,];
    const __VLS_40 = ((__VLS_ctx.inputMap[field.type]));
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
        key: (i),
        field: (field),
        value: (__VLS_ctx.form[field.key]),
    }));
    const __VLS_42 = __VLS_41({
        key: (i),
        field: (field),
        value: (__VLS_ctx.form[field.key]),
    }, ...__VLS_functionalComponentArgsRest(__VLS_41));
    // @ts-ignore
    [inputMap, form,];
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "runner__actions" },
    'aria-label': "Actions",
});
for (const [act, i] of __VLS_getVForSourceType((__VLS_ctx.schema.actions))) {
    // @ts-ignore
    [schema,];
    const __VLS_45 = {}.AButton;
    /** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
    // @ts-ignore
    AButton;
    // @ts-ignore
    const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({
        ...{ 'onClick': {} },
        key: (i),
        type: (act.primary ? 'primary' : 'default'),
    }));
    const __VLS_47 = __VLS_46({
        ...{ 'onClick': {} },
        key: (i),
        type: (act.primary ? 'primary' : 'default'),
    }, ...__VLS_functionalComponentArgsRest(__VLS_46));
    let __VLS_49;
    let __VLS_50;
    const __VLS_51 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.run(act.key);
                // @ts-ignore
                [run,];
            } });
    const { default: __VLS_52 } = __VLS_48.slots;
    (act.label || __VLS_ctx.t("run"));
    // @ts-ignore
    [t,];
    var __VLS_48;
}
const __VLS_53 = {}.AButton;
/** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
// @ts-ignore
AButton;
// @ts-ignore
const __VLS_54 = __VLS_asFunctionalComponent(__VLS_53, new __VLS_53({
    ...{ 'onClick': {} },
    ...{ class: "runner__btn" },
}));
const __VLS_55 = __VLS_54({
    ...{ 'onClick': {} },
    ...{ class: "runner__btn" },
}, ...__VLS_functionalComponentArgsRest(__VLS_54));
let __VLS_57;
let __VLS_58;
const __VLS_59 = ({ click: {} },
    { onClick: (__VLS_ctx.reset) });
const { default: __VLS_60 } = __VLS_56.slots;
// @ts-ignore
[reset,];
(__VLS_ctx.t("clear"));
// @ts-ignore
[t,];
var __VLS_56;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "runner__ctrl" },
    'aria-label': "Outputs Controls",
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "runner__ctrlLeft" },
});
const __VLS_61 = {}.ASwitch;
/** @type {[typeof __VLS_components.ASwitch, typeof __VLS_components.aSwitch, ]} */ ;
// @ts-ignore
ASwitch;
// @ts-ignore
const __VLS_62 = __VLS_asFunctionalComponent(__VLS_61, new __VLS_61({
    checked: (__VLS_ctx.wrap),
    checkedChildren: (__VLS_ctx.t('word_wrap')),
    unCheckedChildren: (__VLS_ctx.t('word_wrap')),
    'aria-label': "word-wrap",
}));
const __VLS_63 = __VLS_62({
    checked: (__VLS_ctx.wrap),
    checkedChildren: (__VLS_ctx.t('word_wrap')),
    unCheckedChildren: (__VLS_ctx.t('word_wrap')),
    'aria-label': "word-wrap",
}, ...__VLS_functionalComponentArgsRest(__VLS_62));
// @ts-ignore
[t, t, wrap,];
const __VLS_66 = {}.ASegmented;
/** @type {[typeof __VLS_components.ASegmented, typeof __VLS_components.aSegmented, ]} */ ;
// @ts-ignore
ASegmented;
// @ts-ignore
const __VLS_67 = __VLS_asFunctionalComponent(__VLS_66, new __VLS_66({
    value: (__VLS_ctx.fontSize),
    options: (__VLS_ctx.fontSizeOpts),
    ...{ class: "runner__font" },
    'aria-label': "font-size",
}));
const __VLS_68 = __VLS_67({
    value: (__VLS_ctx.fontSize),
    options: (__VLS_ctx.fontSizeOpts),
    ...{ class: "runner__font" },
    'aria-label': "font-size",
}, ...__VLS_functionalComponentArgsRest(__VLS_67));
// @ts-ignore
[fontSize, fontSizeOpts,];
const __VLS_71 = {}.ASpace;
/** @type {[typeof __VLS_components.ASpace, typeof __VLS_components.aSpace, typeof __VLS_components.ASpace, typeof __VLS_components.aSpace, ]} */ ;
// @ts-ignore
ASpace;
// @ts-ignore
const __VLS_72 = __VLS_asFunctionalComponent(__VLS_71, new __VLS_71({}));
const __VLS_73 = __VLS_72({}, ...__VLS_functionalComponentArgsRest(__VLS_72));
const { default: __VLS_75 } = __VLS_74.slots;
const __VLS_76 = {}.AButton;
/** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
// @ts-ignore
AButton;
// @ts-ignore
const __VLS_77 = __VLS_asFunctionalComponent(__VLS_76, new __VLS_76({
    ...{ 'onClick': {} },
}));
const __VLS_78 = __VLS_77({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_77));
let __VLS_80;
let __VLS_81;
const __VLS_82 = ({ click: {} },
    { onClick: (__VLS_ctx.clearOutputs) });
const { default: __VLS_83 } = __VLS_79.slots;
// @ts-ignore
[clearOutputs,];
(__VLS_ctx.t("reset_outputs"));
// @ts-ignore
[t,];
var __VLS_79;
var __VLS_74;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "runner__outputs" },
    'aria-label': "Outputs",
});
for (const [out, i] of __VLS_getVForSourceType((__VLS_ctx.schema.outputs))) {
    // @ts-ignore
    [schema,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "runner__output" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "runner__outputHead" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "runner__label" },
    });
    (out.label || __VLS_ctx.t("outputs"));
    // @ts-ignore
    [t,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "runner__ops" },
    });
    const __VLS_84 = {}.AButton;
    /** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
    // @ts-ignore
    AButton;
    // @ts-ignore
    const __VLS_85 = __VLS_asFunctionalComponent(__VLS_84, new __VLS_84({
        ...{ 'onClick': {} },
        size: "small",
        'aria-label': "copy",
    }));
    const __VLS_86 = __VLS_85({
        ...{ 'onClick': {} },
        size: "small",
        'aria-label': "copy",
    }, ...__VLS_functionalComponentArgsRest(__VLS_85));
    let __VLS_88;
    let __VLS_89;
    const __VLS_90 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.copy(out.key);
                // @ts-ignore
                [copy,];
            } });
    const { default: __VLS_91 } = __VLS_87.slots;
    (__VLS_ctx.t("copy"));
    // @ts-ignore
    [t,];
    var __VLS_87;
    const __VLS_92 = {}.AButton;
    /** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
    // @ts-ignore
    AButton;
    // @ts-ignore
    const __VLS_93 = __VLS_asFunctionalComponent(__VLS_92, new __VLS_92({
        ...{ 'onClick': {} },
        size: "small",
        'aria-label': "download",
    }));
    const __VLS_94 = __VLS_93({
        ...{ 'onClick': {} },
        size: "small",
        'aria-label': "download",
    }, ...__VLS_functionalComponentArgsRest(__VLS_93));
    let __VLS_96;
    let __VLS_97;
    const __VLS_98 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.download(out.key);
                // @ts-ignore
                [download,];
            } });
    const { default: __VLS_99 } = __VLS_95.slots;
    (__VLS_ctx.t("download"));
    // @ts-ignore
    [t,];
    var __VLS_95;
    if (__VLS_ctx.error && i === 0) {
        // @ts-ignore
        [error,];
        const __VLS_100 = {}.AAlert;
        /** @type {[typeof __VLS_components.AAlert, typeof __VLS_components.aAlert, ]} */ ;
        // @ts-ignore
        AAlert;
        // @ts-ignore
        const __VLS_101 = __VLS_asFunctionalComponent(__VLS_100, new __VLS_100({
            type: "error",
            message: (__VLS_ctx.t('error') + ': ' + __VLS_ctx.error),
            showIcon: true,
        }));
        const __VLS_102 = __VLS_101({
            type: "error",
            message: (__VLS_ctx.t('error') + ': ' + __VLS_ctx.error),
            showIcon: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_101));
        // @ts-ignore
        [t, error,];
    }
    if (out.type === 'text' || out.type === 'code') {
        const __VLS_105 = {}.ATextarea;
        /** @type {[typeof __VLS_components.ATextarea, typeof __VLS_components.aTextarea, ]} */ ;
        // @ts-ignore
        ATextarea;
        // @ts-ignore
        const __VLS_106 = __VLS_asFunctionalComponent(__VLS_105, new __VLS_105({
            value: (__VLS_ctx.outputs[out.key]),
            rows: (out.type === 'code' ? 12 : 6),
            ...{ class: (['runner__text', __VLS_ctx.wrap ? 'runner__text--wrap' : '']) },
            ...{ style: ({ fontSize: __VLS_ctx.fontSize + 'px' }) },
            readonly: true,
        }));
        const __VLS_107 = __VLS_106({
            value: (__VLS_ctx.outputs[out.key]),
            rows: (out.type === 'code' ? 12 : 6),
            ...{ class: (['runner__text', __VLS_ctx.wrap ? 'runner__text--wrap' : '']) },
            ...{ style: ({ fontSize: __VLS_ctx.fontSize + 'px' }) },
            readonly: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_106));
        // @ts-ignore
        [wrap, fontSize, outputs,];
    }
    else if (out.type === 'table') {
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "runner__table" },
        });
        const __VLS_110 = {}.ATable;
        /** @type {[typeof __VLS_components.ATable, typeof __VLS_components.aTable, ]} */ ;
        // @ts-ignore
        ATable;
        // @ts-ignore
        const __VLS_111 = __VLS_asFunctionalComponent(__VLS_110, new __VLS_110({
            columns: (__VLS_ctx.tableColumns(out.key)),
            dataSource: (__VLS_ctx.tableData(out.key)),
            size: "small",
            pagination: (false),
            scroll: ({ x: true }),
        }));
        const __VLS_112 = __VLS_111({
            columns: (__VLS_ctx.tableColumns(out.key)),
            dataSource: (__VLS_ctx.tableData(out.key)),
            size: "small",
            pagination: (false),
            scroll: ({ x: true }),
        }, ...__VLS_functionalComponentArgsRest(__VLS_111));
        // @ts-ignore
        [tableColumns, tableData,];
    }
    else if (out.type === 'image') {
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "runner__image" },
        });
        if (__VLS_ctx.outputs[out.key]) {
            // @ts-ignore
            [outputs,];
            __VLS_asFunctionalElement(__VLS_elements.img)({
                src: (String(__VLS_ctx.outputs[out.key] || '')),
                alt: (__VLS_ctx.t('image_preview')),
            });
            // @ts-ignore
            [t, outputs,];
        }
        else {
            const __VLS_115 = {}.AEmpty;
            /** @type {[typeof __VLS_components.AEmpty, typeof __VLS_components.aEmpty, ]} */ ;
            // @ts-ignore
            AEmpty;
            // @ts-ignore
            const __VLS_116 = __VLS_asFunctionalComponent(__VLS_115, new __VLS_115({
                description: "暂无图片",
            }));
            const __VLS_117 = __VLS_116({
                description: "暂无图片",
            }, ...__VLS_functionalComponentArgsRest(__VLS_116));
        }
    }
}
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['runner']} */ ;
/** @type {__VLS_StyleScopedClasses['runner__bar']} */ ;
/** @type {__VLS_StyleScopedClasses['runner__history']} */ ;
/** @type {__VLS_StyleScopedClasses['runner__inputs']} */ ;
/** @type {__VLS_StyleScopedClasses['runner__actions']} */ ;
/** @type {__VLS_StyleScopedClasses['runner__btn']} */ ;
/** @type {__VLS_StyleScopedClasses['runner__ctrl']} */ ;
/** @type {__VLS_StyleScopedClasses['runner__ctrlLeft']} */ ;
/** @type {__VLS_StyleScopedClasses['runner__font']} */ ;
/** @type {__VLS_StyleScopedClasses['runner__outputs']} */ ;
/** @type {__VLS_StyleScopedClasses['runner__output']} */ ;
/** @type {__VLS_StyleScopedClasses['runner__outputHead']} */ ;
/** @type {__VLS_StyleScopedClasses['runner__label']} */ ;
/** @type {__VLS_StyleScopedClasses['runner__ops']} */ ;
/** @type {__VLS_StyleScopedClasses['runner__text']} */ ;
/** @type {__VLS_StyleScopedClasses['runner__table']} */ ;
/** @type {__VLS_StyleScopedClasses['runner__image']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
