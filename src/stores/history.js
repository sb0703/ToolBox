import { defineStore } from "pinia";
const KEY = "toolbox.history";
function load() {
    try {
        return JSON.parse(localStorage.getItem(KEY) || '{"map":{}}');
    }
    catch {
        return { map: {} };
    }
}
function save(state) {
    localStorage.setItem(KEY, JSON.stringify(state));
}
export const useHistoryStore = defineStore("history", {
    state: () => load(),
    actions: {
        push(toolId, payload, limit = 10) {
            const list = this.map[toolId] || [];
            list.unshift({ ts: Date.now(), payload });
            this.map[toolId] = list.slice(0, limit);
            save(this.$state);
        },
        list(toolId) {
            return this.map[toolId] || [];
        },
        clear(toolId) {
            delete this.map[toolId];
            save(this.$state);
        },
    },
});
