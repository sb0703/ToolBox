import { defineStore } from "pinia";
const KEY = "toolbox.user.profile";
function defaultProfile() {
    return {
        id: "local",
        theme: localStorage.getItem("theme") || "dark",
        pinnedToolIds: ["json-formatter", "base64"],
        recentToolIds: [],
        favorites: [
            {
                id: "dev",
                name: "开发常用",
                toolIds: ["json-formatter", "timestamp"],
            },
        ],
    };
}
function loadProfile() {
    try {
        const text = localStorage.getItem(KEY);
        if (!text)
            return defaultProfile();
        const parsed = JSON.parse(text);
        return {
            ...defaultProfile(),
            ...parsed,
            pinnedToolIds: parsed.pinnedToolIds || [],
            recentToolIds: parsed.recentToolIds || [],
            favorites: parsed.favorites || [],
        };
    }
    catch {
        return defaultProfile();
    }
}
function saveProfile(profile) {
    localStorage.setItem(KEY, JSON.stringify(profile));
}
export const useUserStore = defineStore("user", {
    state: () => ({
        profile: loadProfile(),
    }),
    getters: {
        pinnedSet: (state) => new Set(state.profile.pinnedToolIds),
    },
    actions: {
        persist() {
            saveProfile(this.profile);
        },
        pinTool(id) {
            if (this.profile.pinnedToolIds.includes(id))
                return;
            this.profile.pinnedToolIds.push(id);
            this.persist();
        },
        unpinTool(id) {
            const idx = this.profile.pinnedToolIds.indexOf(id);
            if (idx === -1)
                return;
            this.profile.pinnedToolIds.splice(idx, 1);
            this.persist();
        },
        togglePin(id) {
            if (this.profile.pinnedToolIds.includes(id))
                this.unpinTool(id);
            else
                this.pinTool(id);
        },
        addRecent(id) {
            const list = this.profile.recentToolIds;
            const i = list.indexOf(id);
            if (i > -1)
                list.splice(i, 1);
            list.unshift(id);
            if (list.length > 20)
                list.pop();
            this.persist();
        },
        createFavoriteGroup(name) {
            const id = `fav_${Date.now().toString(36)}`;
            this.profile.favorites.push({ id, name, toolIds: [] });
            this.persist();
            return id;
        },
        renameFavoriteGroup(id, name) {
            const group = this.profile.favorites.find((g) => g.id === id);
            if (!group)
                return;
            group.name = name;
            this.persist();
        },
        deleteFavoriteGroup(id) {
            this.profile.favorites = this.profile.favorites.filter((g) => g.id !== id);
            this.persist();
        },
        addToolToFavorite(groupId, toolId) {
            const group = this.profile.favorites.find((g) => g.id === groupId);
            if (!group)
                return;
            if (!group.toolIds.includes(toolId)) {
                group.toolIds.push(toolId);
                this.persist();
            }
        },
        removeToolFromFavorite(groupId, toolId) {
            const group = this.profile.favorites.find((g) => g.id === groupId);
            if (!group)
                return;
            group.toolIds = group.toolIds.filter((id) => id !== toolId);
            this.persist();
        },
        resetProfile() {
            this.profile = defaultProfile();
            this.persist();
        },
    },
});
