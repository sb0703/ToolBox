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
        { id: "dev", name: "开发者工具", slug: "dev-tools" },
        { id: "design", name: "设计与图片", slug: "design-tools" },
        { id: "office", name: "办公与文档", slug: "office-kit" },
        { id: "life", name: "生活与实用", slug: "life-tools" },
      ];
      this.tools = [
        {
          id: "json-formatter",
          name: "JSON 格式化/校验",
          slug: "json-formatter",
          categoryId: "dev",
          tags: ["json", "format"],
          summary: "格式化或压缩 JSON 文本并校验合法性",
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
          name: "Base64 加密/解密",
          slug: "base64",
          categoryId: "dev",
          tags: ["encode", "decode"],
          summary: "对文本进行 Base64 编码或解码",
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
          categoryId: "dev",
          tags: ["time", "date"],
          summary: "Unix 时间戳与日期互转，支持 UTC",
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
          id: "regex-tester",
          name: "正则表达式测试",
          slug: "regex",
          categoryId: "dev",
          tags: ["regex", "text"],
          summary: "在线测试 JS 正则并查看分组结果",
          type: "native",
          schema: {
            inputs: [
              { type: "text", key: "pattern", label: "表达式 /pattern/" },
              {
                type: "text",
                key: "flags",
                label: "标志",
                placeholder: "gimuy",
              },
              { type: "textarea", key: "text", label: "测试文本", rows: 8 },
            ],
            actions: [{ label: "测试", key: "run", primary: true }],
            outputs: [
              { type: "text", key: "result", label: "摘要" },
              { type: "table", key: "table", label: "匹配明细" },
            ],
          },
        },
        {
          id: "hash-generator",
          name: "MD5/Hash 生成",
          slug: "hash",
          categoryId: "dev",
          tags: ["hash", "md5"],
          summary: "快速计算 MD5 或 SHA-256 哈希值",
          type: "native",
          schema: {
            inputs: [
              { type: "textarea", key: "text", label: "输入内容", rows: 6 },
              {
                type: "select",
                key: "algorithm",
                label: "算法",
                options: [
                  { label: "MD5", value: "md5" },
                  { label: "SHA-256", value: "sha256" },
                ],
              },
            ],
            actions: [{ label: "生成", key: "run", primary: true }],
            outputs: [{ type: "text", key: "result", label: "Hash" }],
          },
        },
        {
          id: "image-compress",
          name: "图片压缩 (TinyPNG 类)",
          slug: "image-compress",
          categoryId: "design",
          tags: ["image", "compress"],
          summary: "浏览器端压缩图片并查看体积变化",
          type: "native",
          schema: {
            inputs: [
              { type: "file", key: "file", label: "上传图片", accept: "image/*" },
              {
                type: "text",
                key: "quality",
                label: "质量(0-1)",
                placeholder: "0.7",
              },
              {
                type: "select",
                key: "format",
                label: "输出格式",
                options: [
                  { label: "JPEG", value: "image/jpeg" },
                  { label: "PNG", value: "image/png" },
                ],
              },
            ],
            actions: [{ label: "压缩", key: "run", primary: true }],
            outputs: [
              { type: "image", key: "img", label: "预览" },
              { type: "text", key: "result", label: "信息" },
            ],
          },
        },
        {
          id: "image-format",
          name: "图片格式转换 (WebP/JPG/PNG)",
          slug: "image-format",
          categoryId: "design",
          tags: ["image", "convert"],
          summary: "一键转换图片格式",
          type: "native",
          schema: {
            inputs: [
              { type: "file", key: "file", label: "上传图片", accept: "image/*" },
              {
                type: "select",
                key: "format",
                label: "目标格式",
                options: [
                  { label: "PNG", value: "image/png" },
                  { label: "JPEG", value: "image/jpeg" },
                  { label: "WebP", value: "image/webp" },
                ],
              },
            ],
            actions: [{ label: "转换", key: "run", primary: true }],
            outputs: [
              { type: "image", key: "img", label: "预览" },
              { type: "text", key: "result", label: "信息" },
            ],
          },
        },
        {
          id: "color-picker",
          name: "在线配色/取色器",
          slug: "color-picker",
          categoryId: "design",
          tags: ["color"],
          summary: "输入 HEX 颜色自动生成一组配色方案",
          type: "native",
          schema: {
            inputs: [
              {
                type: "text",
                key: "color",
                label: "基准颜色",
                placeholder: "#1677ff",
              },
            ],
            actions: [{ label: "生成配色", key: "run", primary: true }],
            outputs: [{ type: "code", key: "result", label: "Palette" }],
          },
        },
        {
          id: "svg-editor",
          name: "SVG 编辑器",
          slug: "svg-editor",
          categoryId: "design",
          tags: ["svg"],
          summary: "粘贴 SVG 代码即可实时预览",
          type: "native",
          schema: {
            inputs: [
              { type: "textarea", key: "svg", label: "SVG 内容", rows: 10 },
            ],
            actions: [{ label: "预览", key: "run", primary: true }],
            outputs: [
              { type: "image", key: "img", label: "预览" },
              { type: "code", key: "result", label: "代码" },
            ],
          },
        },
        {
          id: "pdf-toolkit",
          name: "PDF 合并/分割/转 Word",
          slug: "pdf-toolkit",
          categoryId: "office",
          tags: ["pdf"],
          summary: "跳转专业 PDF 工具站点，快速完成处理",
          type: "link",
          route: "https://www.ilovepdf.com/zh-cn",
        },
        {
          id: "word-count",
          name: "字数统计",
          slug: "word-count",
          categoryId: "office",
          tags: ["text"],
          summary: "统计字符、单词与行数",
          type: "native",
          schema: {
            inputs: [
              { type: "textarea", key: "text", label: "文本内容", rows: 10 },
            ],
            actions: [{ label: "统计", key: "run", primary: true }],
            outputs: [{ type: "text", key: "result", label: "结果" }],
          },
        },
        {
          id: "markdown-editor",
          name: "Markdown 在线编辑器",
          slug: "markdown",
          categoryId: "office",
          tags: ["markdown"],
          summary: "输入 Markdown 自动生成 HTML 预览",
          type: "native",
          schema: {
            inputs: [
              { type: "textarea", key: "text", label: "Markdown 内容", rows: 12 },
            ],
            actions: [{ label: "预览", key: "run", primary: true }],
            outputs: [{ type: "code", key: "result", label: "HTML" }],
          },
        },
        {
          id: "table-converter",
          name: "表格转换 (Excel → JSON)",
          slug: "table-converter",
          categoryId: "office",
          tags: ["table", "json"],
          summary: "粘贴表格/CSV 文本并导出 JSON",
          type: "native",
          schema: {
            inputs: [
              { type: "textarea", key: "csv", label: "CSV 文本", rows: 10 },
            ],
            actions: [{ label: "转换", key: "run", primary: true }],
            outputs: [
              { type: "table", key: "table", label: "表格" },
              { type: "code", key: "result", label: "JSON" },
            ],
          },
        },
        {
          id: "qr-tool",
          name: "二维码生成/解码",
          slug: "qr",
          categoryId: "life",
          tags: ["qr"],
          summary: "生成二维码或解码上传图像",
          type: "native",
          schema: {
            inputs: [
              { type: "text", key: "text", label: "内容" },
              { type: "text", key: "size", label: "尺寸(px)", placeholder: "320" },
              { type: "file", key: "file", label: "二维码图片", accept: "image/*" },
            ],
            actions: [
              { label: "生成二维码", key: "generate", primary: true },
              { label: "解码二维码", key: "decode" },
            ],
            outputs: [
              { type: "image", key: "img", label: "二维码" },
              { type: "text", key: "result", label: "结果文本" },
            ],
          },
        },
        {
          id: "unit-converter",
          name: "单位换算 (汇率/重量/长度)",
          slug: "unit",
          categoryId: "life",
          tags: ["unit"],
          summary: "常用单位一键换算",
          type: "native",
          schema: {
            inputs: [
              { type: "text", key: "value", label: "数值" },
              { type: "text", key: "from", label: "从（m、kg、USD）" },
              { type: "text", key: "to", label: "到（km、g、CNY）" },
            ],
            actions: [{ label: "换算", key: "run", primary: true }],
            outputs: [{ type: "text", key: "result", label: "结果" }],
          },
        },
        {
          id: "random-generator",
          name: "随机数/密码生成器",
          slug: "random",
          categoryId: "life",
          tags: ["random"],
          summary: "自定义规则生成随机字符串",
          type: "native",
          schema: {
            inputs: [
              { type: "text", key: "length", label: "长度", placeholder: "12" },
              {
                type: "switch",
                key: "includeNumbers",
                label: "包含数字",
                default: true,
              },
              {
                type: "switch",
                key: "includeSymbols",
                label: "包含符号",
                default: false,
              },
              {
                type: "switch",
                key: "includeLowercase",
                label: "包含小写字母",
                default: true,
              },
              {
                type: "switch",
                key: "includeUppercase",
                label: "包含大写字母",
                default: true,
              },
            ],
            actions: [{ label: "生成", key: "run", primary: true }],
            outputs: [{ type: "text", key: "result", label: "结果" }],
          },
        },
        {
          id: "holiday-countdown",
          name: "节日倒计时",
          slug: "holiday",
          categoryId: "life",
          tags: ["time"],
          summary: "常见节日及自定义日期倒计时提醒",
          type: "native",
          schema: {
            inputs: [
              {
                type: "select",
                key: "holiday",
                label: "节日",
                options: [
                  { label: "春节", value: "spring" },
                  { label: "端午节", value: "dragon" },
                  { label: "国庆节", value: "national" },
                  { label: "自定义", value: "custom" },
                ],
              },
              {
                type: "text",
                key: "customDate",
                label: "自定义日期 (YYYY-MM-DD)",
              },
            ],
            actions: [{ label: "计算", key: "run", primary: true }],
            outputs: [{ type: "text", key: "result", label: "结果" }],
          },
        },
      ];
      this.tags = Array.from(new Set(this.tools.flatMap((t) => t.tags)));
    },
  },
});
