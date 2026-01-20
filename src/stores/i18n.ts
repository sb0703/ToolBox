import { defineStore } from 'pinia'

type Dict = Record<string, string>

const zhCN: Dict = {
  run: '运行',
  clear: '清空',
  copy: '复制',
  download: '下载',
  history_input: '历史记录',
  load: '载入',
  clear_history: '清空历史',
  confirm_clear_history: '清空该工具的历史记录？',
  outputs: '输出',
  word_wrap: '自动换行',
  font_size: '字号',
  reset_outputs: '清空输出',
  table_preview: '表格预览',
  image_preview: '图片预览',
  error: '错误',
  cancel: '取消'
}

const enUS: Dict = {
  run: 'Run',
  clear: 'Clear',
  copy: 'Copy',
  download: 'Download',
  history_input: 'History',
  load: 'Load',
  clear_history: 'Clear History',
  confirm_clear_history: 'Clear history for this tool?',
  outputs: 'Outputs',
  word_wrap: 'Wrap',
  font_size: 'Font Size',
  reset_outputs: 'Clear Outputs',
  table_preview: 'Table Preview',
  image_preview: 'Image Preview',
  error: 'Error',
  cancel: 'Cancel'
}

export const useI18nStore = defineStore('i18n', {
  state: () => ({
    locale:
      (localStorage.getItem('toolbox.locale') as 'zh-CN' | 'en-US') ||
      ((navigator.language || 'zh-CN').startsWith('zh') ? 'zh-CN' : 'en-US')
  }),
  getters: {
    t: (s) => (key: string) => {
      const dict = s.locale === 'zh-CN' ? zhCN : enUS
      return dict[key] || key
    }
  },
  actions: {
    setLocale(loc: 'zh-CN' | 'en-US') {
      this.locale = loc
      localStorage.setItem('toolbox.locale', loc)
      document.documentElement.setAttribute('lang', loc)
    }
  }
})
