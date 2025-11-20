import { computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useCatalogStore } from "@/stores/catalog";
import ToolRunner from "@/components/ToolRunner.vue";
import { formatJson } from "@/utils/json";
import { encodeBase64, decodeBase64 } from "@/utils/base64";
import { tsToDate, dateToTs } from "@/utils/time";
import { useI18nStore } from "@/stores/i18n";
import { parseCsv } from "@/utils/csv";
import { useUserStore } from "@/stores/user";
const route = useRoute();
const catalog = useCatalogStore();
const i18n = useI18nStore();
const user = useUserStore();
const t = i18n.t;
onMounted(() => catalog.loadMock());
const tool = computed(() => catalog.tools.find((t) => t.id === String(route.params.toolId)));
watch(() => tool.value?.id, (id) => {
    if (id)
        user.addRecent(id);
}, { immediate: true });
const isPinned = computed(() => tool.value ? user.profile.pinnedToolIds.includes(tool.value.id) : false);
function togglePin() {
    if (!tool.value)
        return;
    user.togglePin(tool.value.id);
}
function validator(form, actionKey) {
    if (!tool.value)
        return "工具不存在";
    if (tool.value.id === "timestamp") {
        if (actionKey === "ts_to_date") {
            if (!form.ts || !/^\d{10,13}$/.test(String(form.ts)))
                return "时间戳应为 10 或 13 位数字";
        }
        if (actionKey === "date_to_ts") {
            if (!form.date)
                return "请输入日期";
            if (isNaN(new Date(form.date).getTime()))
                return "日期格式不正确";
        }
    }
    if (tool.value.id === "json-formatter") {
        if (!form.text || typeof form.text !== "string")
            return "请输入 JSON 文本";
    }
    if (tool.value.id === "base64") {
        if (!form.text || typeof form.text !== "string")
            return "请输入文本";
    }
    if (tool.value.id === "csv-preview") {
        if (!form.csv)
            return "请输入 CSV 文本";
    }
    if (tool.value.id === "image-viewer") {
        if (!form.src)
            return "请输入图片地址或 Base64";
    }
    return null;
}
async function onRun(actionKey, form) {
    if (!tool.value)
        return { ok: false, outputs: {}, error: "工具不存在" };
    switch (tool.value.id) {
        case "json-formatter": {
            const { text = "", compress = false } = form;
            const res = formatJson(text, compress);
            return res.ok
                ? { ok: true, outputs: { result: res.output } }
                : { ok: false, outputs: {}, error: res.error };
        }
        case "base64": {
            const { text = "", mode = "encode" } = form;
            if (mode === "encode")
                return { ok: true, outputs: { result: encodeBase64(text) } };
            const r = decodeBase64(text);
            return r.ok
                ? { ok: true, outputs: { result: r.output } }
                : { ok: false, outputs: {}, error: r.error };
        }
        case "timestamp": {
            const { ts = "", date = "", utc = false } = form;
            if (actionKey === "ts_to_date")
                return { ok: true, outputs: { result: tsToDate(ts, utc) } };
            if (actionKey === "date_to_ts")
                return { ok: true, outputs: { result: String(dateToTs(date, utc)) } };
            return { ok: false, outputs: {}, error: "未知操作" };
        }
        case "csv-preview": {
            const { csv = "" } = form;
            const table = parseCsv(csv);
            return { ok: true, outputs: { table } };
        }
        case "image-viewer": {
            const { src = "" } = form;
            return { ok: true, outputs: { img: String(src) } };
        }
    }
    return { ok: false, outputs: {}, error: "暂未实现" };
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
    ...{ class: "detail container" },
});
const __VLS_0 = {}.ABreadcrumb;
/** @type {[typeof __VLS_components.ABreadcrumb, typeof __VLS_components.aBreadcrumb, typeof __VLS_components.ABreadcrumb, typeof __VLS_components.aBreadcrumb, ]} */ ;
// @ts-ignore
ABreadcrumb;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "detail__crumb" },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "detail__crumb" },
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
(__VLS_ctx.tool?.name || "...");
// @ts-ignore
[tool,];
var __VLS_18;
var __VLS_3;
const __VLS_20 = {}.ASkeleton;
/** @type {[typeof __VLS_components.ASkeleton, typeof __VLS_components.aSkeleton, typeof __VLS_components.ASkeleton, typeof __VLS_components.aSkeleton, ]} */ ;
// @ts-ignore
ASkeleton;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    loading: (!__VLS_ctx.tool),
    active: true,
}));
const __VLS_22 = __VLS_21({
    loading: (!__VLS_ctx.tool),
    active: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
const { default: __VLS_24 } = __VLS_23.slots;
// @ts-ignore
[tool,];
if (__VLS_ctx.tool) {
    // @ts-ignore
    [tool,];
    const __VLS_25 = {}.ACard;
    /** @type {[typeof __VLS_components.ACard, typeof __VLS_components.aCard, typeof __VLS_components.ACard, typeof __VLS_components.aCard, ]} */ ;
    // @ts-ignore
    ACard;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
        title: (__VLS_ctx.tool.name),
        ...{ class: "detail__card" },
    }));
    const __VLS_27 = __VLS_26({
        title: (__VLS_ctx.tool.name),
        ...{ class: "detail__card" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_26));
    const { default: __VLS_29 } = __VLS_28.slots;
    // @ts-ignore
    [tool,];
    {
        const { extra: __VLS_30 } = __VLS_28.slots;
        const __VLS_31 = {}.AButton;
        /** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
        // @ts-ignore
        AButton;
        // @ts-ignore
        const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({
            ...{ 'onClick': {} },
            type: "text",
        }));
        const __VLS_33 = __VLS_32({
            ...{ 'onClick': {} },
            type: "text",
        }, ...__VLS_functionalComponentArgsRest(__VLS_32));
        let __VLS_35;
        let __VLS_36;
        const __VLS_37 = ({ click: {} },
            { onClick: (__VLS_ctx.togglePin) });
        const { default: __VLS_38 } = __VLS_34.slots;
        // @ts-ignore
        [togglePin,];
        (__VLS_ctx.isPinned ? "取消收藏" : "收藏");
        // @ts-ignore
        [isPinned,];
        var __VLS_34;
    }
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "detail__summary" },
    });
    (__VLS_ctx.tool.summary);
    // @ts-ignore
    [tool,];
    for (const [tg] of __VLS_getVForSourceType((__VLS_ctx.tool.tags))) {
        // @ts-ignore
        [tool,];
        const __VLS_39 = {}.ATag;
        /** @type {[typeof __VLS_components.ATag, typeof __VLS_components.aTag, typeof __VLS_components.ATag, typeof __VLS_components.aTag, ]} */ ;
        // @ts-ignore
        ATag;
        // @ts-ignore
        const __VLS_40 = __VLS_asFunctionalComponent(__VLS_39, new __VLS_39({
            key: (tg),
            ...{ class: "detail__tag" },
        }));
        const __VLS_41 = __VLS_40({
            key: (tg),
            ...{ class: "detail__tag" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_40));
        const { default: __VLS_43 } = __VLS_42.slots;
        (tg);
        var __VLS_42;
    }
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "detail__i18n" },
    });
    const __VLS_44 = {}.ASegmented;
    /** @type {[typeof __VLS_components.ASegmented, typeof __VLS_components.aSegmented, ]} */ ;
    // @ts-ignore
    ASegmented;
    // @ts-ignore
    const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
        value: (__VLS_ctx.i18n.locale),
        options: ([
            { label: '中文', value: 'zh-CN' },
            { label: 'English', value: 'en-US' },
        ]),
    }));
    const __VLS_46 = __VLS_45({
        value: (__VLS_ctx.i18n.locale),
        options: ([
            { label: '中文', value: 'zh-CN' },
            { label: 'English', value: 'en-US' },
        ]),
    }, ...__VLS_functionalComponentArgsRest(__VLS_45));
    // @ts-ignore
    [i18n,];
    var __VLS_28;
}
if (__VLS_ctx.tool?.schema) {
    // @ts-ignore
    [tool,];
    const __VLS_49 = {}.ACard;
    /** @type {[typeof __VLS_components.ACard, typeof __VLS_components.aCard, typeof __VLS_components.ACard, typeof __VLS_components.aCard, ]} */ ;
    // @ts-ignore
    ACard;
    // @ts-ignore
    const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({
        title: "运行",
    }));
    const __VLS_51 = __VLS_50({
        title: "运行",
    }, ...__VLS_functionalComponentArgsRest(__VLS_50));
    const { default: __VLS_53 } = __VLS_52.slots;
    const __VLS_54 = {}.Suspense;
    /** @type {[typeof __VLS_components.Suspense, typeof __VLS_components.Suspense, ]} */ ;
    // @ts-ignore
    Suspense;
    // @ts-ignore
    const __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54({}));
    const __VLS_56 = __VLS_55({}, ...__VLS_functionalComponentArgsRest(__VLS_55));
    const { default: __VLS_58 } = __VLS_57.slots;
    /** @type {[typeof ToolRunner, ]} */ ;
    // @ts-ignore
    const __VLS_59 = __VLS_asFunctionalComponent(ToolRunner, new ToolRunner({
        schema: (__VLS_ctx.tool.schema),
        toolId: (__VLS_ctx.tool.id),
        validator: (__VLS_ctx.validator),
        onRun: (__VLS_ctx.onRun),
    }));
    const __VLS_60 = __VLS_59({
        schema: (__VLS_ctx.tool.schema),
        toolId: (__VLS_ctx.tool.id),
        validator: (__VLS_ctx.validator),
        onRun: (__VLS_ctx.onRun),
    }, ...__VLS_functionalComponentArgsRest(__VLS_59));
    // @ts-ignore
    [tool, tool, validator, onRun,];
    var __VLS_57;
    var __VLS_52;
}
var __VLS_23;
/** @type {__VLS_StyleScopedClasses['detail']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['detail__crumb']} */ ;
/** @type {__VLS_StyleScopedClasses['detail__card']} */ ;
/** @type {__VLS_StyleScopedClasses['detail__summary']} */ ;
/** @type {__VLS_StyleScopedClasses['detail__tag']} */ ;
/** @type {__VLS_StyleScopedClasses['detail__i18n']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
