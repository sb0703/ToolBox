import { defineStore } from "pinia";

interface HistoryItem {
  ts: number;
  payload: Record<string, any>;
}
interface HistoryState {
  map: Record<string, HistoryItem[]>;
}

const KEY = "toolbox.history";

function load(): HistoryState {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{"map":{}}');
  } catch {
    return { map: {} };
  }
}
function save(state: HistoryState) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export const useHistoryStore = defineStore("history", {
  state: (): HistoryState => load(),
  actions: {
    push(toolId: string, payload: Record<string, any>, limit = 10) {
      const list = this.map[toolId] || [];
      list.unshift({ ts: Date.now(), payload });
      this.map[toolId] = list.slice(0, limit);
      save(this.$state);
    },
    list(toolId: string) {
      return this.map[toolId] || [];
    },
    clear(toolId: string) {
      delete this.map[toolId];
      save(this.$state);
    },
  },
});
