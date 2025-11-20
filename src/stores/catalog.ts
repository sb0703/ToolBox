import { defineStore } from "pinia";
import type { Tool, Category } from "@/types/domain";

export const useCatalogStore = defineStore("catalog", {
  state: () => ({
    tools: [] as Tool[],
    categories: [] as Category[],
    tags: [] as string[],
  }),
  getters: {
    byId: (s) => (id: string) => s.tools.find((t) => t.id === id),
  },
  actions: {
    loadMock() {
      if (this.tools.length) return;
      this.categories = [
        { id: "dev", name: "开发工具", slug: "dev-tools" },
        { id: "design", name: "设计工具", slug: "design-tools" },
        { id: "productivity", name: "效率工具", slug: "productivity" },
      ];
      this.tools = [
        {
          id: "json-formatter",
          name: "JSON 格式化",
          slug: "json-formatter",
          categoryId: "dev",
          tags: ["json", "format"],
          summary: "格式化或压缩 JSON 文本",
          type: "native",
          schema: {
            inputs: [
              { type: "textarea", key: "text", label: "JSON 文本", rows: 12 },
              {
                type: "switch",
                key: "compress",
                label: "压缩输出",
                default: false,
              },
            ],
            actions: [{ label: "运行", key: "run", primary: true }],
            outputs: [{ type: "code", key: "result", label: "结果" }],
          },
        },
        {
          id: "base64",
          name: "Base64 编解码",
          slug: "base64",
          categoryId: "dev",
          tags: ["encode", "decode"],
          summary: "对文本执行 Base64 编码或解码",
          type: "native",
          schema: {
            inputs: [
              { type: "textarea", key: "text", label: "文本", rows: 8 },
              {
                type: "select",
                key: "mode",
                label: "模式",
                options: [
                  { label: "编码", value: "encode" },
                  { label: "解码", value: "decode" },
                ],
              },
            ],
            actions: [{ label: "执行", key: "run", primary: true }],
            outputs: [{ type: "text", key: "result", label: "输出" }],
          },
        },
        {
          id: "timestamp",
          name: "时间戳转换",
          slug: "timestamp",
          categoryId: "productivity",
          tags: ["time", "date"],
          summary: "Unix 时间戳与日期互转",
          type: "native",
          schema: {
            inputs: [
              { type: "text", key: "ts", label: "时间戳（秒或毫秒）" },
              {
                type: "text",
                key: "date",
                label: "日期（YYYY-MM-DD HH:mm:ss）",
              },
              { type: "switch", key: "utc", label: "使用 UTC", default: false },
            ],
            actions: [
              { label: "时间戳→日期", key: "ts_to_date", primary: true },
              { label: "日期→时间戳", key: "date_to_ts" },
            ],
            outputs: [{ type: "text", key: "result", label: "结果" }],
          },
        },
        {
          id: "csv-preview",
          name: "CSV 预览",
          slug: "csv-preview",
          categoryId: "dev",
          tags: ["csv", "table"],
          summary: "将 CSV 文本解析成表格",
          type: "native",
          schema: {
            inputs: [
              { type: "textarea", key: "csv", label: "CSV 文本", rows: 10 },
            ],
            actions: [{ label: "预览", key: "run", primary: true }],
            outputs: [{ type: "table", key: "table", label: "表格" }],
          },
        },
        {
          id: "image-viewer",
          name: "图片预览（Base64/URL）",
          slug: "image-viewer",
          categoryId: "design",
          tags: ["image"],
          summary: "输入 Base64 或 URL 即可预览图片",
          type: "native",
          schema: {
            inputs: [{ type: "text", key: "src", label: "图片地址或 Base64" }],
            actions: [{ label: "显示", key: "show", primary: true }],
            outputs: [{ type: "image", key: "img", label: "预览" }],
          },
        },
        {
          id: "regex-tester",
          name: "正则测试",
          slug: "regex",
          categoryId: "dev",
          tags: ["regex", "text"],
          summary: "在线测试 JavaScript 正则表达式",
          type: "native",
        },
        {
          id: "uuid",
          name: "UUID 生成",
          slug: "uuid",
          categoryId: "productivity",
          tags: ["id"],
          summary: "随机 UUID / NanoID 生成",
          type: "native",
        },
      ];
      this.tags = Array.from(new Set(this.tools.flatMap((t) => t.tags)));
    },
  },
});
