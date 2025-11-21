# Toolbox

一个基于 Vue 3 + TypeScript + Vite 的多功能工具箱应用。

提供常用的小工具（文本、颜色、二维码、CSV、Base64、哈希、随机数、时间单位转换等），支持搜索、分类和收藏，开箱即用的现代化前端工程化配置。

## 技术栈

- Vue 3（`<script setup>`）
- TypeScript
- Vite 7
- Pinia（状态管理）
- Vue Router 4（路由）
- Ant Design Vue（UI 组件）
- Less（样式预处理）
- Lodash / QRCode / jsqr（工具依赖）

## 环境要求

- Node.js ≥ 18（建议 18 LTS 或 20 LTS）
- 推荐包管理器：pnpm（仓库包含 `pnpm-lock.yaml`）
- 推荐 IDE：VS Code + Volar（Vue） + TypeScript 插件

## 快速开始

使用 pnpm：

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产包
pnpm build

# 本地预览构建产物
pnpm preview
```

如果你使用 npm 或 yarn，对应命令分别为 `npm run dev` / `yarn dev` 等。

## NPM Scripts

- `dev`：启动 Vite 开发服务器（默认 `http://localhost:5173/`，见 `vite.config.ts`）。
- `build`：使用 `vue-tsc` 进行类型检查（`tsconfig.app.json`），然后执行 `vite build` 输出到 `dist/`。
- `preview`：本地预览构建产物（默认 `http://localhost:4173/`）。

## 目录结构

```
toolbox/
├─ index.html
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
├─ src/
│  ├─ main.ts
│  ├─ App.vue
│  ├─ router/
│  │  └─ index.ts
│  ├─ stores/
│  │  ├─ ui.ts
│  │  ├─ user.ts
│  │  └─ catalog.ts
│  ├─ layouts/
│  │  └─ AppShell.vue
│  ├─ components/
│  │  ├─ AppHeader.vue
│  │  ├─ SideNav.vue
│  │  ├─ GlobalSearch.vue
│  │  └─ ToolCard.vue
│  ├─ pages/
│  │  ├─ HomePage.vue
│  │  ├─ ToolsPage.vue
│  │  ├─ ToolDetailPage.vue
│  │  ├─ FavoritesPage.vue
│  │  ├─ CategoryPage.vue
│  │  ├─ SearchPage.vue
│  │  ├─ SettingsPage.vue
│  │  └─ NotFound.vue
│  ├─ types/
│  │  └─ domain.ts
│  └─ styles/
│     └─ globals.css
└─ README.md
```

- `src/pages/`：页面级组件（`HomePage.vue`、`ToolsPage.vue`、`SearchPage.vue`、`FavoritesPage.vue`、`CategoryPage.vue`、`ToolDetailPage.vue`、`SettingsPage.vue`、`NotFound.vue`）。
- `src/components/`：通用组件（`AppHeader.vue`、`GlobalSearch.vue`、`SideNav.vue`、`ToolCard.vue`、`ToolRunner.vue` 等）。
- `src/layouts/`：应用壳（`AppShell.vue`）。
- `src/router/`：路由配置（`index.ts`）。
- `src/stores/`：Pinia 状态（`catalog.ts`、`search.ts`、`ui.ts`、`i18n.ts`、`user.ts`、`history.ts`）。
- `src/styles/`：全局样式（`globals.css`、`globals.less`）。
- `src/utils/`：工具函数（`base64.ts`、`csv.ts`、`qrcode.ts`、`image.ts`、`text.ts` 等）。
- `src/types/`：类型定义与全局声明。

## 常用配置（`vite.config.ts`）

- 路径别名：`@` 指向 `src/`。
- Less：`javascriptEnabled: true`，可通过 `modifyVars` 自定义主题（例如 `primary-color`）。
- Dev Server：
  - `host: 0.0.0.0`（允许局域网访问）
  - `port: 5173`（端口可自定义，`strictPort: true` 表示端口占用时报错）
  - `open: true`（启动自动打开浏览器）
  - `hmr.overlay: true`（编译错误显示遮罩）
  - `watch.usePolling: true`（WSL2/Docker/虚拟机环境建议开启）

## 开发约定

- 组件使用 Vue SFC + `<script setup>` + TypeScript。
- 状态统一使用 Pinia 管理，避免跨组件深层传递。
- 路由使用 Vue Router 4，路由文件位于 `src/router/index.ts`。
- UI 组件优先使用 Ant Design Vue，样式采用 Less 并集中在 `src/styles/`。
- 通用逻辑抽离到 `src/utils/`，便于复用与测试。

## 业务说明

Toolbox 是一个“前端本地运行”的工具箱系统，核心围绕以下业务能力构建：

- 分类与目录：
  - 四大分类：`dev`（开发者工具）、`design`（设计与图片）、`office`（办公与文档）、`life`（生活与实用）。
  - 工具清单由 `stores/catalog.ts` 提供（当前为 `loadMock()` 模拟数据），每个工具包含 `id`、`name`、`summary`、`tags`、`type`、`schema` 等元数据。

- 页面与路由：
  - `Home` 首页：最近使用、常用收藏、推荐工具概览。
  - `Tools` 工具页：全量工具列表，支持分类/标签/排序筛选与全局搜索入口。
  - `ToolDetail` 工具详情：按 `schema` 动态渲染表单与输出，通过 `validator/onRun` 执行逻辑。
  - `Category` 分类页：按分类浏览工具。
  - `Search` 高级搜索页：可组合关键词、标签、分类与排序。
  - `Favorites` 收藏夹：置顶工具与自定义分组管理（新增/重命名/删除/添加/移除）。
  - `Settings` 设置：主题切换、语言切换、本地数据重置。

- Schema 驱动的工具运行：
  - `types/domain.ts` 定义 `ToolSchema`（`inputs/actions/outputs` 三段式），`ToolRunner.vue` 根据 schema 动态渲染 UI。
  - `ToolDetailPage.vue` 承载具体运行逻辑：
    - `validator(form, actionKey)` 做轻校验（示例：时间戳、正则 flags、文件选择等）。
    - `onRun(actionKey, form)` 调用 `src/utils/` 里的工具函数，并将结果映射到 `outputs`。
  - 输出支持 `text`、`code`、`image`、`table` 等类型，内置复制与下载。

- 搜索与筛选：
  - `GlobalSearch.vue` 支持工具与标签的联想选择；
  - `stores/search.ts` 统一管理关键词、标签、分类与排序；
  - `utils/query.ts` 负责将搜索条件读写到 URL Query，便于分享与回溯。

- 收藏与最近使用：
  - `stores/user.ts` 中维护用户配置：主题、置顶工具 `pinnedToolIds`、最近使用 `recentToolIds`、收藏分组 `favorites`；
  - 在详情页与卡片上可一键收藏；运行工具会自动写入最近使用。

- 历史记录：
  - `stores/history.ts` 按工具维度保存最近的输入快照，支持载入与清空；
  - UI 在 `ToolRunner.vue` 的历史抽屉中展示。

- 国际化与主题：
  - `stores/i18n.ts` 提供基础字典（中文/英文），`Settings` 可切换；
  - `stores/ui.ts` 管理全局浅色/深色主题，通过 `data-theme` 应用到文档。

- 数据存储：
  - 所有个性化数据保存在浏览器 `localStorage`，键值包括：
    - `toolbox.user.profile`：用户档案（主题、置顶、最近、分组等）
    - `toolbox.history`：工具输入历史快照
    - `theme`：当前主题（便于页面加载前生效）
  - 本项目不依赖后端，图片/二维码/表格等处理均在浏览器端完成。

### 预置工具示例

- 开发类：JSON 格式化、Base64 编解码、时间戳转换、正则测试、MD5/SHA-256 Hash。
- 设计类：图片压缩/格式转换、在线配色、SVG 编辑预览。
- 办公类：CSV → JSON 表格转换、Markdown → HTML。
- 生活类：随机字符串生成、单位换算（长度/重量/汇率）、节日倒计时、二维码生成/解码。

以上工具均通过 `schema` 声明输入/动作/输出，并在 `ToolDetailPage.vue` 中调用 `src/utils/` 的纯函数实现。

## 新增一个工具的流程建议

1. 设计数据与交互：确定该工具的输入/输出与界面形式。
2. 编写工具逻辑：在 `src/utils/` 新增对应方法或复用已有工具。
3. 创建 UI：
   - 简单工具：新增一个 `ToolCard` 并在列表页展示。
   - 复杂工具：创建独立页面或复用 `ToolRunner`。
4. 注册与路由：如需路由跳转，在 `src/router/index.ts` 中添加路由；如需在目录或分类里展示，更新工具目录数据（通常在 `stores/catalog.ts`）。
5. 文案与国际化：若有多语言需求，更新 `stores/i18n.ts`（或项目中的文案字典）。

## 部署

1. 运行 `pnpm build`，构建产物会生成在 `dist/` 目录。
2. 使用任意静态服务器托管（Nginx、Apache、Netlify、Vercel、静态对象存储等）。
3. 如部署到子路径，注意 Vite `base` 配置（参考官方文档）。

## 常见问题

- 端口占用：修改 `vite.config.ts` 的 `server.port` 或释放占用端口；`strictPort: true` 会在端口占用时直接报错。
- HMR 遮罩：开发时出现编译错误会弹出遮罩，修复后自动恢复。
- 局域网访问：确保本机防火墙允许对应端口入站，`host: 0.0.0.0` 已开启绑定。
- Less 构建：已安装 `less@^4`，若主题自定义失败，检查 `modifyVars` 与变量名是否正确。

## 许可

当前仓库未设置开源许可证。若需开源或内部分发，请根据实际情况添加 LICENSE 文件并在此处注明。

## 致谢

- [Vue.js](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Ant Design Vue](https://www.antdv.com/)
- [Pinia](https://pinia.vuejs.org/)
