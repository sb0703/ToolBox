<template>
  <a-layout class="shell">
    <a-layout-header class="shell__header">
      <div class="shell__brand">
        <RouterLink to="/home" class="shell__logo">Super Toolbox</RouterLink>
        <p class="shell__tagline">一站式效率工具 · 设计 & 开发 · AI 助力</p>
      </div>
      <div class="shell__navWrap">
        <nav class="shell__nav">
          <RouterLink
            v-for="item in navs"
            :key="item.key"
            :to="item.to"
            class="shell__navItem"
            :class="{ 'is-active': route.name === item.key }"
          >
            {{ item.label }}
          </RouterLink>
        </nav>
      </div>
      <div class="shell__actions">
        <a-button class="shell__ghost" @click="toggleHistory">
          <template #icon><HistoryOutlined /></template>
          历史
        </a-button>
        <a-segmented
          class="shell__themeSwitch"
          :value="i18n.locale"
          :options="[
            { label: '中文', value: 'zh-CN' },
            { label: 'EN', value: 'en-US' }
          ]"
          @change="(val) => i18n.setLocale(val as 'zh-CN' | 'en-US')"
        />
        <a-segmented
          class="shell__themeSwitch"
          :value="ui.theme"
          :options="[
            { label: 'Light', value: 'light' },
            { label: 'Dark', value: 'dark' }
          ]"
          @change="handleThemeChange"
        />
      </div>
    </a-layout-header>

    <section v-if="showHero" class="shell__hero">
      <div class="shell__heroText">
        <p class="shell__heroEyebrow">Toolbox 2.0</p>
        <h2>用设计感与智能交互打造属于你的工作台</h2>
        <p>
          收录开发、设计、办公、生活四大类热门工具，刷新即用。智能解析、历史同步与 UTC
          模式，让流程自然而高效。
        </p>
      </div>
      <div class="shell__heroStats">
        <div class="shell__stat">
          <h3>40+</h3>
          <p>预置工具</p>
        </div>
        <div class="shell__stat">
          <h3>AI</h3>
          <p>语义解析</p>
        </div>
        <div class="shell__stat">
          <h3>4</h3>
          <p>分类导航</p>
        </div>
      </div>
    </section>

    <a-layout-content class="shell__content">
      <RouterView />
    </a-layout-content>

    <a-drawer
      title="历史 / 收藏"
      placement="right"
      width="360"
      :open="showHistory"
      @close="showHistory = false"
    >
      <a-tabs size="small">
        <a-tab-pane key="history" tab="历史记录">
          <a-empty v-if="!historyItems.length" description="暂无历史" />
          <div v-else class="shell__drawerList">
            <div v-for="item in historyItems" :key="item.key" class="shell__drawerItem">
              <div>
                <p class="shell__drawerTitle"
                  >{{ item.name }} <span class="shell__muted">{{ item.tsText }}</span></p
                >
                <p class="shell__drawerMeta">{{ item.summary }}</p>
              </div>
              <a-button type="link" size="small" @click="openTool(item.id)">查看</a-button>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="favorites" tab="收藏">
          <a-empty v-if="!favoriteTools.length" description="暂无收藏" />
          <div v-else class="shell__drawerList">
            <div v-for="tool in favoriteTools" :key="tool.id" class="shell__drawerItem">
              <div>
                <p class="shell__drawerTitle">{{ tool.name }}</p>
                <p class="shell__drawerMeta">{{ tool.summary }}</p>
              </div>
              <a-button type="link" size="small" @click="openTool(tool.id)">查看</a-button>
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
    </a-drawer>
  </a-layout>
</template>

<script setup lang="ts">
  import { RouterLink, RouterView, useRoute } from 'vue-router'
  import { useUiStore } from '@/stores/ui'
  import { computed, onMounted, ref } from 'vue'
  import { HistoryOutlined } from '@ant-design/icons-vue'
  import { useHistoryStore } from '@/stores/history'
  import { useCatalogStore } from '@/stores/catalog'
  import { useUserStore } from '@/stores/user'
  import { useRouter } from 'vue-router'
  import { useI18nStore } from '@/stores/i18n'

  const ui = useUiStore()
  const route = useRoute()
  const showHero = computed(() => route.name === 'home')
  const showHistory = ref(false)
  const hist = useHistoryStore()
  const catalog = useCatalogStore()
  const user = useUserStore()
  const router = useRouter()
  const i18n = useI18nStore()

  const navs = [
    { key: 'home', label: '首页', to: '/home' },
    { key: 'tools', label: '工具', to: '/tools' },
    { key: 'favorites', label: '收藏', to: '/favorites' },
    { key: 'settings', label: '设置', to: '/settings' }
  ]

  onMounted(() => {
    ui.init()
    i18n.setLocale(i18n.locale)
    catalog.init()
  })

  function handleThemeChange(val: 'light' | 'dark') {
    ui.toggleTheme(val)
  }

  function toggleHistory() {
    showHistory.value = true
  }

  const historyItems = computed(() => {
    const flat: { id: string; ts: number; payload: Record<string, any> }[] = []
    Object.entries(hist.map || {}).forEach(([toolId, items]) => {
      items.forEach((item) => flat.push({ id: toolId, ts: item.ts, payload: item.payload }))
    })
    return flat
      .sort((a, b) => b.ts - a.ts)
      .slice(0, 20)
      .map((entry) => {
        const meta = catalog.tools.find((t) => t.id === entry.id)
        return {
          key: `${entry.id}-${entry.ts}`,
          id: entry.id,
          name: meta?.name || entry.id,
          summary: meta?.summary || '历史输入已保存',
          tsText: new Date(entry.ts).toLocaleString()
        }
      })
  })

  const favoriteTools = computed(() => {
    const ids = user.profile.pinnedToolIds
    return ids
      .map((id) => catalog.tools.find((t) => t.id === id))
      .filter((t): t is NonNullable<typeof t> => !!t)
  })

  function openTool(id: string) {
    showHistory.value = false
    router.push(`/tools/${id}`)
  }
</script>

<style lang="less" scoped>
  .shell {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 20px 24px 32px;
    background: transparent;

    &__header {
      display: flex;
      align-items: center;
      gap: 24px;
      padding: 18px 24px;
      border-radius: 32px;
      border: 1px solid var(--border);
      background: rgba(255, 255, 255, 0.92);
      box-shadow: var(--shadow);
      backdrop-filter: blur(18px);
    }
    &__brand {
      min-width: 220px;
      line-height: normal;
    }
    &__logo {
      font-weight: 800;
      font-size: 20px;
      color: var(--text);
      text-decoration: none;
    }
    &__tagline {
      margin: 0;
      font-size: 12px;
      color: var(--muted);
    }
    &__navWrap {
      flex: 1;
      display: flex;
      justify-content: center;
      padding: 0 24px;
    }
    &__nav {
      background: linear-gradient(90deg, rgba(255, 255, 255, 0.92), rgba(241, 242, 255, 0.95));
      padding: 0 24px;
      border-radius: 999px;
      border: 1px solid rgba(99, 102, 241, 0.2);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.6),
        0 10px 20px rgba(15, 23, 42, 0.08);
    }
    &__navItem {
      padding: 6px 18px;
      border-radius: 999px;
      border: 1px solid transparent;
      color: var(--muted);
      text-decoration: none;
      font-weight: 500;
      transition: all 0.2s;
    }
    &__navItem:hover {
      color: var(--text);
      background: var(--accent-soft);
    }
    &__navItem.is-active {
      color: var(--text);
      border-color: var(--accent);
      background: var(--accent-soft);
      box-shadow: 0 8px 18px rgba(99, 102, 241, 0.28);
    }
    &__actions {
      display: inline-flex;
      gap: 10px;
      align-items: center;
    }
    &__ghost {
      border: 1px solid var(--border);
      color: var(--text);
      border-radius: 12px;
    }
    &__themeSwitch {
      background: var(--surface-muted);
      border-radius: 999px;
    }

    &__hero {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      padding: 24px;
      border-radius: 28px;
      border: 1px solid var(--border);
      background:
        radial-gradient(circle at top right, rgba(99, 102, 241, 0.12), transparent), var(--surface);
      box-shadow: var(--shadow);
    }
    &__heroText h2 {
      margin: 6px 0;
    }
    &__heroText p {
      margin: 0;
      color: var(--muted);
    }
    &__heroEyebrow {
      font-size: 12px;
      letter-spacing: 0.4em;
      text-transform: uppercase;
      color: var(--muted);
    }
    &__heroStats {
      display: flex;
      gap: 12px;
      justify-content: center;
    }
    &__stat {
      background: var(--surface-muted);
      border-radius: 18px;
      padding: 16px;
      min-width: 120px;
      text-align: center;
      border: 1px solid var(--border);
    }
    &__stat h3 {
      margin: 0;
      font-size: 26px;
      color: var(--accent);
    }
    &__stat p {
      margin: 4px 0 0;
      color: var(--muted);
    }

    &__content {
      flex: 1;
    }

    &__drawerList {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    &__drawerItem {
      padding: 8px 0;
      border-bottom: 1px solid var(--border);
      display: flex;
      justify-content: space-between;
      gap: 8px;
    }
    &__drawerTitle {
      margin: 0;
      font-weight: 600;
    }
    &__drawerMeta {
      margin: 2px 0 0;
      color: var(--muted);
      font-size: 12px;
    }
    &__muted {
      color: var(--muted);
      font-weight: 400;
      font-size: 12px;
    }
  }

  @media (max-width: 768px) {
    .shell {
      padding: 12px;
      &__header {
        flex-direction: column;
        align-items: flex-start;
      }
      &__navWrap {
        width: 100%;
        padding: 0;
        justify-content: flex-start;
      }
      &__nav {
        width: 100%;
        justify-content: flex-start;
      }
      &__heroStats {
        flex-direction: column;
      }
    }
  }
</style>
